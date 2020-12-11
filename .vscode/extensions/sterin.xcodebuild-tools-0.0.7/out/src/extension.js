'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const util = require("./util");
const expander = require("./expand");
const diagnostics = require("./diagnostics");
const status = require("./status");
const DefaultConfiguration = {
    sdk: null,
    workspace: null,
    scheme: null,
    variables: new Map(),
    args: [],
    env: new Map(),
    preBuildTasks: [],
    postBuildTasks: [],
    debugConfigurations: []
};
const BuildConfigurations = [
    "Debug",
    "Profile",
    "Release"
];
var BuildState;
(function (BuildState) {
    BuildState[BuildState["IDLE"] = 0] = "IDLE";
    BuildState[BuildState["STARTED"] = 1] = "STARTED";
    BuildState[BuildState["KILLED"] = 2] = "KILLED";
})(BuildState || (BuildState = {}));
function expand(e, opts) {
    return {
        program: e.expand(opts.program),
        args: e.expand(opts.args),
        cwd: e.expand(opts.cwd),
        env: e.expand(opts.env),
        channel: opts.channel,
        initChannel: opts.initChannel,
        message: e.expand(opts.message),
        parseOutput: opts.parseOutput
    };
}
class Extension {
    constructor(context) {
        this.context = context;
        this.schemaPath = path.join(this.context.extensionPath, "schemas", "xcodebuild-tools-schema.json");
        this.configFilePath = path.join(vscode.workspace.rootPath, ".vscode", "xcodebuild-tools.json");
        this.statusBar = new status.StatusBar();
        this.diag = vscode.languages.createDiagnosticCollection('xcodebuild-tools');
        this.buildOutputChannel = vscode.window.createOutputChannel("xcodebuild-tools build");
        this.runOutputChannel = vscode.window.createOutputChannel("xcodebuild-tools run");
        this.config = null;
        this.buildState = BuildState.IDLE;
        this.buildProcess = null;
        const commandNames = [
            'build',
            'clean',
            'debug',
            'profile',
            'run',
            'kill',
            'selectBuildConfiguration',
            'selectDebugConfiguration',
            "openXcode"
        ];
        for (let name of commandNames) {
            context.subscriptions.push(vscode.commands.registerCommand(`xcodebuild-tools.${name}`, () => {
                if (!vscode.workspace.registerTextDocumentContentProvider) {
                    vscode.window.showErrorMessage('Extension [xcodebuild-tools] requires an open folder');
                    return;
                }
                else if (!this.config) {
                    vscode.window.showErrorMessage('Extension [xcodebuild-tools] requires a correctly formatted .vscode/xcodebuild-tools.json');
                    return;
                }
                else {
                    this[name]();
                }
            }));
        }
        const configWatcher = vscode.workspace.createFileSystemWatcher(this.configFilePath);
        this.addDisposable(configWatcher);
        this.addDisposable(configWatcher.onDidCreate((uri) => this.reloadConfig(uri.fsPath)));
        this.addDisposable(configWatcher.onDidChange((uri) => this.reloadConfig(uri.fsPath)));
        this.addDisposable(configWatcher.onDidDelete((uri) => this.reloadConfig(uri.fsPath)));
        this.addDisposable(this.statusBar);
        this.addDisposable(this.diag);
        this.addDisposable(this.buildOutputChannel);
        this.addDisposable(this.runOutputChannel);
    }
    addDisposable(d) {
        this.context.subscriptions.push(d);
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateConfig = yield util.readSchema(this.schemaPath);
            yield this.reloadConfig(this.configFilePath);
        });
    }
    reloadConfig(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let config = yield util.readJSON(fileName, this.validateConfig);
                if (config.variables) {
                    config.variables = new Map(util.entries(config.variables));
                }
                if (config.env) {
                    config.env = new Map(util.entries(config.env));
                }
                this.config = util.merge(DefaultConfiguration, config);
            }
            catch (e) {
                this.config = null;
                vscode.window.showErrorMessage(`[xcodebuild-tools]: ${e.message}`);
            }
            this.updateStatus();
        });
    }
    getState(key, legal, otherwise) {
        let val = this.context.workspaceState.get(key);
        if (!val || !legal(val)) {
            val = otherwise(key);
            this.context.workspaceState.update(key, val);
        }
        return val;
    }
    get buildConfig() {
        return this.getState("buildConfig", (val) => BuildConfigurations.indexOf(val) !== -1, (key) => BuildConfigurations[0]);
    }
    set buildConfig(config) {
        this.context.workspaceState.update("buildConfig", config);
        this.updateStatus();
    }
    get debugConfigName() {
        return this.getState("debugConfig", (val) => true, (key) => this.config.debugConfigurations.length > 0 ? this.config.debugConfigurations[0].name : null);
    }
    set debugConfigName(config) {
        this.context.workspaceState.update("debugConfig", config);
        this.updateStatus();
    }
    get debugConfig() {
        let name = this.debugConfigName;
        return this.config.debugConfigurations.find(dc => dc.name === name);
    }
    updateStatus() {
        if (this.config) {
            this.statusBar.update(this.buildConfig, this.debugConfigName);
        }
        else {
            this.statusBar.hide();
        }
    }
    expander() {
        const M = new Map();
        M.set('workspaceRoot', vscode.workspace.rootPath);
        M.set('buildRoot', '${workspaceRoot}/build');
        M.set('buildConfig', this.buildConfig);
        M.set('buildPath', '${buildRoot}/${buildConfig}');
        for (let [v, val] of this.config.variables) {
            M.set(v, val);
        }
        return new expander.Expander(M);
    }
    spawn(args) {
        let proc = util.spawn(args.program, args.args, args.cwd, args.env);
        this.buildProcess = proc;
        util.redirectToChannel(proc, args.channel, args.initChannel);
        if (args.parseOutput) {
            diagnostics.parseOutput(this.diag, proc.stdout);
        }
        if (args.message) {
            args.channel.appendLine(`[xcodebuild-tools]: ${args.message}`);
        }
        args.channel.appendLine(`[xcodebuild-tools]: Running: ${args.program} ${args.args.join(" ")}`);
        if (args.cwd) {
            args.channel.appendLine(`[xcodebuild-tools]: Working Directory: ${args.cwd}`);
        }
        proc.on('terminated', (message) => {
            this.buildProcess = null;
            args.channel.appendLine(`[xcodebuild-tools]: ${message}`);
        });
        return proc;
    }
    asyncSpawn(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let proc = this.spawn(args);
                proc.on('fail', (message) => {
                    if (this.buildState === BuildState.STARTED) {
                        reject(new Error(message));
                    }
                    else {
                        resolve(proc);
                    }
                });
                proc.on('success', (message) => {
                    resolve(proc);
                });
            });
        });
    }
    asyncSpawnXcodebuild(e, extraArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = [
                "-workspace", this.config.workspace,
                "-scheme", this.config.scheme,
                "-configuration", this.buildConfig,
                ...this.config.args
            ];
            if (this.config.sdk) {
                args.push("-sdk", this.config.sdk);
            }
            args.push("CONFIGURATION_BUILD_DIR=${buildPath}");
            let opts = {
                program: "xcodebuild",
                args: args.concat(extraArgs),
                env: this.config.env,
                channel: this.buildOutputChannel,
                initChannel: false,
                parseOutput: true
            };
            return yield this.asyncSpawn(expand(e, opts));
        });
    }
    asyncSpawnTask(e, task) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = {
                program: task.program,
                args: task.args,
                cwd: task.cwd,
                env: this.config.env,
                channel: this.buildOutputChannel,
                initChannel: false,
                message: `Runnning Task: ${task.name}`
            };
            return yield this.asyncSpawn(expand(e, args));
        });
    }
    wrapBuild(f) {
        return __awaiter(this, void 0, void 0, function* () {
            vscode.workspace.saveAll();
            if (this.buildState !== BuildState.IDLE) {
                return null;
            }
            this.buildState = BuildState.STARTED;
            try {
                return yield f();
            }
            catch (e) {
            }
            finally {
                this.buildState = BuildState.IDLE;
            }
        });
    }
    asyncBuild(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildOutputChannel.clear();
            this.buildOutputChannel.show();
            for (let task of this.config.preBuildTasks) {
                yield this.asyncSpawnTask(e, task);
            }
            yield this.asyncSpawnXcodebuild(e, []);
            for (let task of this.config.postBuildTasks) {
                yield this.asyncSpawnTask(e, task);
            }
        });
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            const e = this.expander();
            yield this.wrapBuild(() => __awaiter(this, void 0, void 0, function* () {
                yield this.asyncBuild(e);
            }));
        });
    }
    clean() {
        return __awaiter(this, void 0, void 0, function* () {
            const e = this.expander();
            yield this.wrapBuild(() => __awaiter(this, void 0, void 0, function* () {
                yield this.asyncSpawnXcodebuild(e, ['clean']);
            }));
        });
    }
    debug() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.wrapBuild(() => __awaiter(this, void 0, void 0, function* () {
                const e = this.expander();
                yield this.asyncBuild(e);
                const dc = this.debugConfig;
                const config = {
                    name: e.expand(dc.name),
                    program: e.expand(dc.program),
                    args: e.expand(dc.args),
                    cwd: e.expand(dc.cwd),
                    type: "cppdbg",
                    request: "launch",
                    stopAtEntry: false,
                    environment: [],
                    externalConsole: false,
                    MIMode: "lldb"
                };
                yield vscode.debug.startDebugging(vscode.workspace.workspaceFolders[0], config);
            }));
        });
    }
    profile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.wrapBuild(() => __awaiter(this, void 0, void 0, function* () {
                const e = this.expander();
                yield this.asyncBuild(e);
                const dc = this.debugConfig;
                let proc = util.spawn("instruments", [
                    "-t", "Time Profiler",
                    e.expand(dc.program)
                ].concat(e.expand(dc.args)), e.expand(dc.cwd));
                util.redirectToChannel(proc, this.runOutputChannel, true);
                this.runOutputChannel.appendLine(`[xcodebuild-tools] Running: instruments -t "Time Profiler" ${e.expand(dc.program)} ${e.expand(dc.args)}`);
                proc.on('terminated', (message) => {
                    this.runOutputChannel.append(`[xcodebuild-tools] ${message}`);
                });
            }));
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.wrapBuild(() => __awaiter(this, void 0, void 0, function* () {
                const e = this.expander();
                yield this.asyncBuild(e);
                const dc = this.debugConfig;
                let proc = util.spawn(e.expand(dc.program), e.expand(dc.args), e.expand(dc.cwd));
                util.redirectToChannel(proc, this.runOutputChannel, true);
                proc.on('terminated', (message) => {
                    this.runOutputChannel.append(`[xcodebuild-tools] ${message}`);
                });
            }));
        });
    }
    kill() {
        if (this.buildState === BuildState.STARTED && this.buildProcess !== null) {
            this.buildState = BuildState.KILLED;
            this.buildProcess.kill("SIGTERM");
        }
    }
    selectBuildConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            let choice = yield vscode.window.showQuickPick(BuildConfigurations);
            if (choice) {
                this.buildConfig = choice;
            }
        });
    }
    selectDebugConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            let items = this.config.debugConfigurations.map(dc => dc.name);
            if (items.length > 0) {
                let choice = yield vscode.window.showQuickPick(items);
                if (choice) {
                    this.debugConfigName = choice;
                }
            }
        });
    }
    openXcode() {
        const e = this.expander();
        util.spawn('open', [e.expand(this.config.workspace)], null);
    }
}
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let ext = new Extension(context);
        yield ext.setup();
    });
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map