"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shell_command_exec_context_1 = require("./shell-command-exec-context");
const shell_settings_resolver_1 = require("./shell-settings-resolver");
class ShellCommandService {
    constructor(processRunner, workspace, process, childProcess) {
        this.childProcess = childProcess;
        this.processRunner = processRunner;
        this.shellCommandExecContext = new shell_command_exec_context_1.default(workspace, { env: process.env });
        this.shellSettingsResolver = new shell_settings_resolver_1.default(workspace, process.platform);
    }
    runCommand(params) {
        const options = this.getOptions(params.filePath);
        const shell = this.shellSettingsResolver.shellProgramme();
        const shellArgs = this.shellSettingsResolver.shellArgs();
        const command = this.childProcess.spawn(shell, [...shellArgs, params.command], options);
        return this.processRunner.run(command, params.input);
    }
    getOptions(filePath) {
        return {
            cwd: this.shellCommandExecContext.getCwd(filePath),
            env: this.shellCommandExecContext.env
        };
    }
}
exports.default = ShellCommandService;
//# sourceMappingURL=shell-command-service.js.map