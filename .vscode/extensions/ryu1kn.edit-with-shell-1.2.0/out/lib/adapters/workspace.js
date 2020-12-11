"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONFIG_PATH_DELIMITER = '.';
class Workspace {
    constructor(vsWorkspace) {
        this.vsWorkspace = vsWorkspace;
    }
    getConfig(configPath) {
        const { basePath, leafName } = this.parseConfigPath(configPath);
        return this.vsWorkspace.getConfiguration(basePath).get(leafName);
    }
    parseConfigPath(configPath) {
        const configPathParts = configPath.split(CONFIG_PATH_DELIMITER);
        return {
            basePath: configPathParts.slice(0, -1).join(CONFIG_PATH_DELIMITER),
            leafName: configPathParts.slice(-1)[0]
        };
    }
    get rootPath() {
        return this.vsWorkspace.rootPath;
    }
}
exports.default = Workspace;
//# sourceMappingURL=workspace.js.map