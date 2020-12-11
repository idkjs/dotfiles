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
const request = require("request-promise");
const vscode = require("vscode");
var Ord;
(function (Ord) {
    Ord[Ord["GT"] = 1] = "GT";
    Ord[Ord["LT"] = -1] = "LT";
    Ord[Ord["EQ"] = 0] = "EQ";
})(Ord || (Ord = {}));
;
;
;
let cache;
const cacheKey = 'typesearch.types';
const placeHolder = 'Search for Types Packages';
const typesURL = 'https://typespublisher.blob.core.windows.net/typespublisher/data/search-index-min.json';
function onCommandSelected(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cmd)
            return;
        switch (cmd.name) {
            case 'NPM':
                return vscode.window.showInformationMessage(`npm install @types/${cmd.type} --save-dev`);
            case 'Yarn':
                return vscode.window.showInformationMessage(`yarn add @types/${cmd.type} --dev`);
            default:
                return 'No command was selected';
        }
    });
}
function onTypeSelected(selected) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!selected)
            return;
        const selection = yield vscode.window.showInformationMessage(`Type ${selected.label} was selected. Select an installation command for your preferred package manager`, ...['NPM', 'Yarn']);
        const cmd = {
            name: selection,
            type: selected.label
        };
        return cmd;
    });
}
function fetchTypes(from) {
    return __awaiter(this, void 0, void 0, function* () {
        const types = cache.get(cacheKey);
        if (types)
            return types;
        try {
            const response = yield request({ url: from, gzip: true });
            const fetchedTypes = JSON.parse(response);
            yield cache.update(cacheKey, fetchedTypes);
            return fetchedTypes;
        }
        catch (error) {
            return Promise.reject('Could not fetch types. Make sure you are connected to the internet');
        }
    });
}
function typeToQuickItem(types) {
    const fromRawType = (type) => ({ description: type.l, label: type.t, detail: type.p });
    const sortQuickItems = (a, b) => a.label < b.label ? Ord.LT : a.label > b.label ? Ord.GT : Ord.EQ;
    return types.map(fromRawType).sort(sortQuickItems);
}
function onCommandActivation() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const types = yield fetchTypes(typesURL);
            const selected = yield vscode.window.showQuickPick(typeToQuickItem(types), { placeHolder });
            const copyCmd = yield onTypeSelected(selected);
            yield onCommandSelected(copyCmd);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
function activate(context) {
    cache = context.globalState;
    const searchTypeSearch = vscode.commands.registerCommand('extension.typesearch', onCommandActivation);
    context.subscriptions.push(searchTypeSearch);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map