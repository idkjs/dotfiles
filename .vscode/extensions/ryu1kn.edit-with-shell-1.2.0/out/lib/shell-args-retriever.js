"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const resolve_os_kind_1 = require("./resolve-os-kind");
class ShellArgsRetriever {
    constructor(workspaceAdapter, platform) {
        this.workspaceAdapter = workspaceAdapter;
        this.platform = platform;
    }
    retrieve() {
        const osKind = resolve_os_kind_1.default(this.platform);
        return this.workspaceAdapter.getConfig(`${const_1.EXTENSION_NAME}.shellArgs.${osKind}`);
    }
}
exports.default = ShellArgsRetriever;
//# sourceMappingURL=shell-args-retriever.js.map