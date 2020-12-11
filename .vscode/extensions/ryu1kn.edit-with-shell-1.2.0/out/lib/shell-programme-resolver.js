"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const resolve_os_kind_1 = require("./resolve-os-kind");
class ShellProgrammeResolver {
    constructor(workspaceAdapter, platform) {
        this.workspaceAdapter = workspaceAdapter;
        this.platform = platform;
    }
    resolve() {
        const osKind = resolve_os_kind_1.default(this.platform);
        return this.workspaceAdapter.getConfig(`${const_1.EXTENSION_NAME}.shell.${osKind}`);
    }
}
exports.default = ShellProgrammeResolver;
//# sourceMappingURL=shell-programme-resolver.js.map