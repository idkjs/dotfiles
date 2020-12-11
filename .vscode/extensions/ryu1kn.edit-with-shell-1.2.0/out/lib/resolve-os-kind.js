"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OS_KIND = {
    darwin: 'osx',
    linux: 'linux',
    win32: 'windows'
};
const DEFAULT_OS_KIND = OS_KIND.linux;
exports.default = (platform) => OS_KIND[platform] || DEFAULT_OS_KIND;
//# sourceMappingURL=resolve-os-kind.js.map