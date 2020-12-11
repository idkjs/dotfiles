"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const resolve_os_kind_1 = require("./resolve-os-kind");
class ShellSettingsResolver {
    constructor(workspaceAdapter, platform) {
        this.workspaceAdapter = workspaceAdapter;
        this.platform = platform;
    }
    shellProgramme() {
        return this.workspaceAdapter.getConfig(`${const_1.EXTENSION_NAME}.shell.${this.osKind}`);
    }
    shellArgs() {
        return this.workspaceAdapter.getConfig(`${const_1.EXTENSION_NAME}.shellArgs.${this.osKind}`);
    }
    get osKind() {
        return resolve_os_kind_1.default(this.platform);
    }
}
exports.default = ShellSettingsResolver;
//# sourceMappingURL=shell-settings-resolver.js.map