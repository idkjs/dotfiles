"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
var Scope;
(function (Scope) {
    Scope[Scope["KEYWORD_MODULE"] = 0] = "KEYWORD_MODULE";
    Scope[Scope["KEYWORD_STRUCT"] = 1] = "KEYWORD_STRUCT";
    Scope[Scope["KEYWORD_TYPE"] = 2] = "KEYWORD_TYPE";
    Scope[Scope["KEYWORD_VAL"] = 3] = "KEYWORD_VAL";
    Scope[Scope["KEYWORD_FN"] = 4] = "KEYWORD_FN";
    Scope[Scope["KEYWORD_CTRL"] = 5] = "KEYWORD_CTRL";
    Scope[Scope["KEYWORD_AND"] = 6] = "KEYWORD_AND";
    Scope[Scope["KEYWORD_LET"] = 7] = "KEYWORD_LET";
    Scope[Scope["KEYWORD_MISC"] = 8] = "KEYWORD_MISC";
    Scope[Scope["NAME_MODULE"] = 9] = "NAME_MODULE";
    Scope[Scope["NAME_FUNCTION"] = 10] = "NAME_FUNCTION";
    Scope[Scope["NAME_TYPE"] = 11] = "NAME_TYPE";
    Scope[Scope["NAME_PAT"] = 12] = "NAME_PAT";
    Scope[Scope["NAME_FIELD"] = 13] = "NAME_FIELD";
    Scope[Scope["NAME_CONSTR"] = 14] = "NAME_CONSTR";
    Scope[Scope["NAME_TYVAR"] = 15] = "NAME_TYVAR";
    Scope[Scope["NAME_WILD"] = 16] = "NAME_WILD";
    Scope[Scope["PUNCT_EQUALS"] = 17] = "PUNCT_EQUALS";
    Scope[Scope["PUNCT_DOT"] = 18] = "PUNCT_DOT";
    Scope[Scope["PUNCT_COMMA"] = 19] = "PUNCT_COMMA";
    Scope[Scope["PUNCT_COLON"] = 20] = "PUNCT_COLON";
    Scope[Scope["PUNCT_BAR"] = 21] = "PUNCT_BAR";
    Scope[Scope["PUNCT_TYPEOP"] = 22] = "PUNCT_TYPEOP";
    Scope[Scope["PUNCT_MISC"] = 23] = "PUNCT_MISC";
    Scope[Scope["LITERAL_STRING"] = 24] = "LITERAL_STRING";
    Scope[Scope["LITERAL_NUMBER"] = 25] = "LITERAL_NUMBER";
    Scope[Scope["COMMENT"] = 26] = "COMMENT";
})(Scope = exports.Scope || (exports.Scope = {}));
let colors = new Map();
function find(scope) {
    return colors.get(scope);
}
exports.find = find;
function setColors(cfg) {
    let defaultRule = {
        foreground: undefined,
        background: undefined,
        fontStyle: undefined,
    };
    // Keywords
    colors.set(Scope.KEYWORD_MODULE, Object.assign({}, defaultRule, { foreground: cfg.orange, fontStyle: 'underline' }));
    colors.set(Scope.KEYWORD_STRUCT, Object.assign({}, defaultRule, { fontStyle: 'bold italic' }));
    colors.set(Scope.KEYWORD_TYPE, Object.assign({}, defaultRule, { foreground: cfg.blue, fontStyle: 'underline' }));
    colors.set(Scope.KEYWORD_VAL, Object.assign({}, defaultRule, { foreground: cfg.purple, fontStyle: 'underline' }));
    colors.set(Scope.KEYWORD_FN, Object.assign({}, defaultRule, { foreground: cfg.purple }));
    colors.set(Scope.KEYWORD_CTRL, Object.assign({}, defaultRule, { foreground: cfg.purple, fontStyle: 'bold italic' }));
    colors.set(Scope.KEYWORD_AND, Object.assign({}, defaultRule, { foreground: cfg.red, fontStyle: 'underline' }));
    colors.set(Scope.KEYWORD_LET, Object.assign({}, defaultRule, { foreground: cfg.yellow, fontStyle: 'underline' }));
    colors.set(Scope.KEYWORD_MISC, Object.assign({}, defaultRule, { foreground: cfg.red }));
    // Names
    colors.set(Scope.NAME_MODULE, Object.assign({}, defaultRule, { foreground: cfg.orange }));
    colors.set(Scope.NAME_FUNCTION, Object.assign({}, defaultRule, { foreground: cfg.blue, fontStyle: 'bold italic' }));
    colors.set(Scope.NAME_TYPE, Object.assign({}, defaultRule, { foreground: cfg.blue, fontStyle: 'bold' }));
    colors.set(Scope.NAME_PAT, Object.assign({}, defaultRule, { foreground: cfg.orange, fontStyle: 'italic' }));
    colors.set(Scope.NAME_FIELD, Object.assign({}, defaultRule, { foreground: cfg.red, fontStyle: 'bold' }));
    colors.set(Scope.NAME_CONSTR, Object.assign({}, defaultRule, { foreground: cfg.red, fontStyle: 'bold' }));
    colors.set(Scope.NAME_TYVAR, Object.assign({}, defaultRule, { foreground: cfg.purple, fontStyle: 'italic' }));
    colors.set(Scope.NAME_WILD, Object.assign({}, defaultRule, { foreground: cfg.comment }));
    // Punctuations
    colors.set(Scope.PUNCT_EQUALS, Object.assign({}, defaultRule, { foreground: cfg.yellow, fontStyle: 'bold' }));
    colors.set(Scope.PUNCT_DOT, Object.assign({}, defaultRule, { foreground: cfg.comment, fontStyle: 'bold' }));
    colors.set(Scope.PUNCT_COMMA, Object.assign({}, defaultRule, { foreground: cfg.red, fontStyle: 'bold' }));
    colors.set(Scope.PUNCT_COLON, Object.assign({}, defaultRule, { foreground: cfg.red, fontStyle: 'bold' }));
    colors.set(Scope.PUNCT_BAR, Object.assign({}, defaultRule, { foreground: cfg.yellow, fontStyle: 'bold' }));
    colors.set(Scope.PUNCT_TYPEOP, Object.assign({}, defaultRule, { foreground: cfg.red, fontStyle: 'bold' }));
    colors.set(Scope.PUNCT_MISC, Object.assign({}, defaultRule, { foreground: cfg.red }));
    // Literals
    colors.set(Scope.LITERAL_STRING, Object.assign({}, defaultRule, { foreground: cfg.green }));
    colors.set(Scope.LITERAL_NUMBER, Object.assign({}, defaultRule, { foreground: cfg.orange }));
    // Comments
    colors.set(Scope.COMMENT, Object.assign({}, defaultRule, { foreground: cfg.comment, fontStyle: 'italic' }));
}
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        colors.clear();
        let themeName = vscode.workspace.getConfiguration('workbench').get('colorTheme');
        if (typeof themeName !== 'string') {
            console.warn('workbench.colorTheme is', themeName);
        }
        else {
            switch (themeName) {
                case 'Tomorrow Night':
                case 'Tomorrow Night Operator Mono':
                    setColors({
                        comment: '#CED2CF',
                        red: '#CC6666',
                        orange: '#DE935F',
                        yellow: '#F0C674',
                        green: '#B5BD68',
                        aqua: '#8ABEB7',
                        blue: '#81A2BE',
                        purple: '#B294BB',
                    });
                    break;
                case 'Tomorrow':
                case 'Tomorrow Operator Mono':
                    setColors({
                        comment: '#373B41',
                        red: '#C82829',
                        orange: '#F5871F',
                        yellow: '#EAB700',
                        green: '#718C00',
                        aqua: '#3E999F',
                        blue: '#4271AE',
                        purple: '#8959A8',
                    });
                    break;
                case 'Tomorrow Night Eighties':
                case 'Tomorrow Night Eighties Operator Mono':
                    setColors({
                        comment: '#CDCDCD',
                        red: '#F2777A',
                        orange: '#F99157',
                        yellow: '#FFCC66',
                        green: '#99CC99',
                        aqua: '#66CCCC',
                        blue: '#6699CC',
                        purple: '#CC99CC',
                    });
                    break;
                case 'Tomorrow Night Bright':
                case 'Tomorrow Night Bright Operator Mono':
                    setColors({
                        comment: '#CED2CF',
                        red: '#D54E53',
                        orange: '#E78C45',
                        yellow: '#E7C547',
                        green: '#B9CA4A',
                        aqua: '#70C0B1',
                        blue: '#7AA6DA',
                        purple: '#C397D8',
                    });
                    break;
                case 'Tomorrow Night Blue':
                    setColors({
                        comment: '#7285B7',
                        red: '#FF9DA4',
                        orange: '#FFC58F',
                        yellow: '#FFEEAD',
                        green: '#D1F1A9',
                        aqua: '#99FFFF',
                        blue: '#BBDAFF',
                        purple: '#EBBBFF',
                    });
                    break;
                case 'Solarized Dark':
                    setColors({
                        comment: '#EEE8D5',
                        red: '#DC322F',
                        orange: '#CB4B16',
                        yellow: '#B58900',
                        green: '#859900',
                        aqua: '#2AA198',
                        blue: '#268BD2',
                        purple: '#6C71C4',
                    });
                    break;
                case 'Solarized Light':
                    setColors({
                        comment: '#073642',
                        red: '#DC322F',
                        orange: '#CB4B16',
                        yellow: '#B58900',
                        green: '#859900',
                        aqua: '#2AA198',
                        blue: '#268BD2',
                        purple: '#6C71C4',
                    });
                    break;
                case 'Gruvbox Dark Hard':
                case 'Gruvbox Dark Medium':
                case 'Gruvbox Dark Soft':
                case 'Gruvbox Dark (Hard)':
                case 'Gruvbox Dark (Medium)':
                case 'Gruvbox Dark (Soft)':
                    setColors({
                        comment: '#EBDBB2',
                        red: '#FB4934',
                        orange: '#FE8019',
                        yellow: '#FABD2F',
                        green: '#B8BB26',
                        aqua: '#8EC07C',
                        blue: '#83A598',
                        purple: '#D3869B',
                    });
                    break;
                case 'Gruvbox Light Hard':
                case 'Gruvbox Light Medium':
                case 'Gruvbox Light Soft':
                case 'Gruvbox Light (Hard)':
                case 'Gruvbox Light (Medium)':
                case 'Gruvbox Light (Soft)':
                    setColors({
                        comment: '#3C3836',
                        red: '#9D0006',
                        orange: '#AF3A03',
                        yellow: '#B57614',
                        green: '#79740E',
                        aqua: '#427B58',
                        blue: '#076678',
                        purple: '#8F3F71',
                    });
                    break;
                case 'Oceanic Plus':
                case 'Oceanic Next':
                case 'Oceanic Next Italic':
                case 'Oceanic Next Italic - White':
                    setColors({
                        comment: '#CDD3DE',
                        red: '#EC5F67',
                        orange: '#F99157',
                        yellow: '#FAC863',
                        green: '#99C794',
                        aqua: '#5FB3B3',
                        blue: '#6699CC',
                        purple: '#C594C5',
                    });
                    break;
                default:
                    console.warn('workbench.colorTheme', themeName, 'not supported yet');
                    break;
            }
        }
    });
}
exports.load = load;
//# sourceMappingURL=scoping.js.map