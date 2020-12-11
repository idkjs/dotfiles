"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoping = require("./scoping");
function colorSML(root, visibleRanges) {
    let colors = [];
    let errors = [];
    function isUpper(id) {
        return id.charAt(0) >= 'A' && id.charAt(0) <= 'Z';
    }
    function visit(node) {
        if (!isVisible(node, visibleRanges)) {
            return;
        }
        else {
            if (node.type === 'ERROR' && node.children.find(function (node) { return node.hasError(); }) === undefined) {
                errors.push(node);
            }
            if (node.childCount > 0) {
                for (let child of node.children) {
                    visit(child);
                }
            }
            else {
                switch (node.type) {
                    case 'structure':
                    case 'signature':
                    case 'functor':
                    case 'funsig':
                        colors.push([node, scoping.Scope.KEYWORD_MODULE]);
                        break;
                    case 'struct':
                    case 'sig':
                        colors.push([node, scoping.Scope.KEYWORD_STRUCT]);
                        break;
                    case 'datatype':
                    case 'type':
                    case 'eqtype':
                    case 'abstype':
                    case 'exception':
                        colors.push([node, scoping.Scope.KEYWORD_TYPE]);
                        break;
                    case 'val':
                    case 'fun':
                        colors.push([node, scoping.Scope.KEYWORD_VAL]);
                        break;
                    case 'let':
                    case 'in':
                    case 'local':
                        colors.push([node, scoping.Scope.KEYWORD_LET]);
                        break;
                    case 'end':
                        if (node.parent.type === 'base_struct' || node.parent.type === 'base_sign') {
                            colors.push([node, scoping.Scope.KEYWORD_STRUCT]);
                        }
                        else {
                            colors.push([node, scoping.Scope.KEYWORD_LET]);
                        }
                        break;
                    case 'if':
                    case 'then':
                    case 'else':
                    case 'case':
                    case 'handle':
                    case 'while':
                    case 'do':
                    case 'raise':
                        colors.push([node, scoping.Scope.KEYWORD_CTRL]);
                        break;
                    case 'of':
                        if (node.parent.type === 'case_exp') {
                            colors.push([node, scoping.Scope.KEYWORD_CTRL]);
                        }
                        break;
                    case 'fn':
                        colors.push([node, scoping.Scope.KEYWORD_FN]);
                        break;
                    case 'and':
                    case 'where':
                    case 'withtype':
                    case 'with':
                    case 'sharing':
                        colors.push([node, scoping.Scope.KEYWORD_AND]);
                        break;
                    case 'op':
                    case 'include':
                    case 'open':
                    case 'rec':
                    case 'overload':
                    case 'infix':
                    case 'infixr':
                    case 'nonfix':
                    case 'as':
                    case 'orelse':
                    case 'andalso':
                        colors.push([node, scoping.Scope.KEYWORD_MISC]);
                        break;
                    case '_':
                        colors.push([node, scoping.Scope.NAME_WILD]);
                        break;
                    case '.':
                        colors.push([node, scoping.Scope.PUNCT_DOT]);
                        break;
                    case ':':
                        colors.push([node, scoping.Scope.PUNCT_COLON]);
                        break;
                    case ':>':
                    case '->':
                        colors.push([node, scoping.Scope.PUNCT_TYPEOP]);
                        break;
                    case '=':
                        colors.push([node, scoping.Scope.PUNCT_EQUALS]);
                        break;
                    case '=>':
                    case '|':
                        colors.push([node, scoping.Scope.PUNCT_BAR]);
                        break;
                    case '[':
                    case ']':
                    case '{':
                    case '}':
                        colors.push([node, scoping.Scope.NAME_CONSTR]);
                        break;
                    case ',':
                        if (node.parent.type === 'tyvar_seq' || node.parent.type === 'rec_ty' || node.parent.type === 'mark_ty' || node.parent.type === 'tuple_pat' || node.parent.type === 'plabels') {
                            colors.push([node, scoping.Scope.PUNCT_COMMA]);
                        }
                        else {
                            colors.push([node, scoping.Scope.PUNCT_MISC]);
                        }
                        break;
                    case '*':
                        if (node.parent.type === 'tuple_ty') {
                            colors.push([node, scoping.Scope.PUNCT_TYPEOP]);
                        }
                        else {
                            colors.push([node, scoping.Scope.PUNCT_MISC]);
                        }
                        break;
                    case '...':
                    case ';':
                    case 'symbolic':
                        colors.push([node, scoping.Scope.PUNCT_MISC]);
                        break;
                    case 'tuple_unit_pat':
                    case 'tuple_unit_exp':
                        colors.push([node, scoping.Scope.NAME_CONSTR]);
                        break;
                    case 'int_constant':
                    case 'word_constant':
                    case 'float_constant':
                        colors.push([node, scoping.Scope.LITERAL_NUMBER]);
                        break;
                    case 'comment':
                        colors.push([node, scoping.Scope.COMMENT]);
                        break;
                    case 'tyvar':
                        colors.push([node, scoping.Scope.NAME_TYVAR]);
                        break;
                    case 'ident':
                        if (node.text === 'true' || node.text === 'false') {
                            colors.push([node, scoping.Scope.LITERAL_NUMBER]);
                        }
                        else {
                            let parent = node.parent;
                            switch (parent.type) {
                                case 'strb':
                                case 'strspec':
                                case 'fctspec':
                                case 'valspec':
                                case 'fctb':
                                case 'overload_ldec':
                                    colors.push([node, scoping.Scope.NAME_FUNCTION]);
                                    break;
                                case 'sigb':
                                case 'var_sign':
                                case 'include_spec':
                                case 'fsigb':
                                case 'var_fsig':
                                case 'transparent_fsigconstraint_op':
                                case 'opaque_fsigconstraint_op':
                                case 'access_pat':
                                case 'access_exp':
                                    colors.push([node, scoping.Scope.NAME_MODULE]);
                                    break;
                                case 'dtrepl':
                                case 'tyspec':
                                case 'tb':
                                case 'db':
                                    colors.push([node, scoping.Scope.NAME_TYPE]);
                                    break;
                                case 'fparam':
                                case 'plabel':
                                    colors.push([node, scoping.Scope.NAME_PAT]);
                                    break;
                                case 'selector':
                                    if (parent.parent.type !== 'selector_exp') {
                                        colors.push([node, scoping.Scope.NAME_FIELD]);
                                    }
                                    break;
                                case 'var_pat':
                                    if (isUpper(node.text)) {
                                        colors.push([node, scoping.Scope.NAME_CONSTR]);
                                    }
                                    else if (parent.parent.type === 'clause' && !parent.previousSibling) {
                                        colors.push([node, scoping.Scope.NAME_FUNCTION]);
                                    }
                                    else if (parent.parent.type === 'app_pat' && parent.parent.childCount === 1 && parent.parent.parent.type === 'vb') {
                                        colors.push([node, scoping.Scope.NAME_FUNCTION]);
                                    }
                                    else {
                                        colors.push([node, scoping.Scope.NAME_PAT]);
                                    }
                                    break;
                                case 'var_exp':
                                    if (isUpper(node.text)) {
                                        colors.push([node, scoping.Scope.NAME_CONSTR]);
                                    }
                                    break;
                                case 'exnspec':
                                case 'constr':
                                case 'eb':
                                    colors.push([node, scoping.Scope.NAME_CONSTR]);
                                    break;
                                case 'qident':
                                    if (node.nextSibling) {
                                        colors.push([node, scoping.Scope.NAME_MODULE]);
                                    }
                                    else {
                                        let gparent = parent.parent;
                                        switch (gparent.type) {
                                            case 'var_struct':
                                            case 'strspec':
                                            case 'struct_whspec':
                                            case 'var_fct_exp':
                                            case 'open_ldec':
                                                colors.push([node, scoping.Scope.NAME_MODULE]);
                                                break;
                                            case 'app_struct':
                                            // case 'sharespec':
                                            // case 'con_ty':
                                            case 'type_whspec':
                                            case 'app_fct_exp':
                                                colors.push([node, scoping.Scope.NAME_TYPE]);
                                                break;
                                            case 'exn_def':
                                                colors.push([node, scoping.Scope.NAME_CONSTR]);
                                                break;
                                            case 'access_pat':
                                                if (isUpper(node.text)) {
                                                    colors.push([node, scoping.Scope.NAME_CONSTR]);
                                                }
                                                else {
                                                    colors.push([node, scoping.Scope.NAME_PAT]);
                                                }
                                                break;
                                            case 'access_exp':
                                                if (isUpper(node.text)) {
                                                    colors.push([node, scoping.Scope.NAME_CONSTR]);
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    visit(root);
    return [colors, errors];
}
exports.colorSML = colorSML;
function isVisible(node, visibleRanges) {
    for (let { start, end } of visibleRanges) {
        let overlap = node.startPosition.row <= end + 1 && start - 1 <= node.endPosition.row;
        if (overlap) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=coloring.js.map