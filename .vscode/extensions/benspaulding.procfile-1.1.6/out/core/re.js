"use strict";
/**
 * Re(gexp) module - provides regular expressions and related other bits as constants.
 * @module re
 * @see module:core
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMENT = exports.IGNORED = exports.PDEF = exports.INTRO = exports.NAME = exports.comment = exports.sep = void 0;
/** Unanchored name pattern. */
const name = /[\w-]+/;
/** Unanchored sep(arator) pattern. */
exports.sep = /:/;
/** Unanchored blank pattern. */
const blank = /[\t ]+/;
/** Unanchored cmd pattern. */
const cmd = /.+/;
/**
 * Unanchored comment pattern.
 * Note that technically the only thing that exists in a Procfile are process
 * definitions -- everything else is just ignored. But some people prefer to mark those
 * lines with a comment character, so we have some logic for that.
 */
exports.comment = /#/;
/** Anchored name pattern. */
exports.NAME = new RegExp(re `^(?<name>${name})(?=${exports.sep})`);
// NOTE: No-worky because of a quantifier in look-behind. :\
//
// /** Anchored sep(arator) pattern. */
// export const SEP: RegExp = new RegExp(`^(?<=${name})(?<sep>${sep})`);
//
// /** Anchored cmd pattern. */
// export const CMD: RegExp = new RegExp(`^(?<=${name}${sep}(${blank})?)(?<cmd>${cmd})$`);
/** Anchored intro pattern. */
exports.INTRO = new RegExp(re `^(?<name>${name})(?<sep>${exports.sep})(?<blank>${blank})?`);
/** Anchored process definition pattern. */
exports.PDEF = new RegExp(re `^(?<name>${name})(?<sep>${exports.sep})(?<blank>${blank})?(?<cmd>${cmd})?$`);
/**
 * Anchored ignore pattern.
 * Anything that is not a process definition is ignored.
 */
exports.IGNORED = new RegExp(re `^(?!${name}${exports.sep}).*$`);
/**
 * Anchored comment pattern.
 * See note about the unachored pattern as to why this exists.
 */
exports.COMMENT = new RegExp(re `^(?<comment>${exports.comment})$`);
/**
 * Use RegExp.source if a RegExp appears as value in tagged a template literal.
 * @param {TemplateStringsArray} strings - Static string bits within the template literal.
 * @param {...any} [values] - Dynamic values within the template literal.
 * @returns {string} - Fully processed template literal.
 * @access package
 * @example
 * const mine = /^my /;
 * const regexp = new RegExp(re`${mine}.*$`)
 * const match = 'my text'.match(regexp)
 */
function re(strings, ...values) {
    /**
     * A reduce callback for working with tagged template literals.
     * @param thusFar - Accumulator containing the string thus far.
     * @param str - Current value being reduced.
     * @param i - Index of the current value being reduced.
     * @access private
     */
    function fmt(thusFar, str, i) {
        const val = values[i - 1];
        return `${thusFar}${val instanceof RegExp ? val.source : val}${str}`;
    }
    // Do not pass an initialValue to reduce -- strings is always one longer than values
    // and our callback uses that to its advantage.
    return strings.reduce(fmt);
}
//# sourceMappingURL=re.js.map