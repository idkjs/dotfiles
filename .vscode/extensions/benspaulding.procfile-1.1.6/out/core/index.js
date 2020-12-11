"use strict";
/**
 * @summary Procfile module
 * @module procfile
 * @see module:re
 * @description
 * # Anatomy of a Procfile
 *
 * A Procfile has only two kinds of lines:
 *
 * - Process Definitions
 * - Comments (everything that is *not* a Process Definition)
 *
 * ## Anatomy of a Process Definition:
 *
 * ```
 *        web: django-admin runserver
 *        ^ ^^^^                    ^
 *        |_||||____________________|
 *       / | \\______       |       \
 *     /|  |  \\_    \      |        \
 *   /  | name | \ blank?  cmd?       \
 *  |   |     sep \                   |
 *  |   |_________|                   |
 *  |        |                        |
 *  |      intro                      |
 *  |_________________________________|
 *                   |
 *              process def
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDef = exports.Comment = exports.Procfile = void 0;
const re = require("./re");
/**
 * A Procfile, in the abstract (think of buffer instead of a file on disk.)
 */
class Procfile {
    /**
     * Create a Procfile.
     * @param lines - The lines of text within the Procfile.
     */
    constructor(...lines) {
        this.lines = lines;
    }
    /**
     * Create a Procfile from a block of text.
     * @param text - Text to parse.
     */
    static fromString(text) {
        return new Procfile(...text.split(/\r?\n/).map((line, i) => new Line(i, line)));
    }
    /** Return the Procfile as a string. */
    toString() {
        return this.lines.map(line => line.val.toString()).join("");
    }
    /**
     * Get all of the process definitions within the Procfile.
     * @todo Somehow annotate return value to be Lines whose val is a ProcessDef.
     */
    get processDefLines() {
        return this.lines.filter(line => line.val instanceof ProcessDef);
    }
    /** An array containing tuples of [def, [defWithSameName, ...]]. */
    get conflicts() {
        // Save this property because we are going to iterate over it twice.
        const lines = this.processDefLines;
        // Turn the array of lines into an array containg a tuple with ...
        const paired = lines.map((a) => [
            a,
            lines // ... and an array of other lines with the same name.
                .filter(b => b !== a)
                .filter(b => b.val.name === a.val.name),
        ]);
        // Filter down to only lines that actually have conflicts.
        return paired.filter(([, twins]) => twins.length);
    }
}
exports.Procfile = Procfile;
/** A line that is part of a Procfile. */
class Line {
    /**
     * Create a Line.
     * @param num - Location of the line.
     * @param val - Object representing the contents of the line.
     */
    constructor(num, val) {
        this.num = num;
        this.val = ProcessDef.fromString(val);
    }
}
/** A comment line. */
class Comment {
    constructor(text = "") {
        this.text = text;
    }
}
exports.Comment = Comment;
/** A process definition line. */
class ProcessDef {
    /**
     * Create a ProcessDef.
     * @param text - Exact text used to create the ProcesDef.
     * @param name - Name portion of the process definition.
     * @param sep  - Sep(arator) in the process definition.
     * @param blank - Separating whitespace (blank) in the process definition.
     * @param cmd - Command portion of the process definition.
     */
    constructor(text, name, sep = re.sep.source, blank, cmd) {
        this.text = text;
        this.name = name;
        this.sep = sep;
        this.blank = blank;
        this.cmd = cmd;
    }
    /**
     * Create a ProcessDef or a Comment from a bit of text.
     * @param text - Text to parse.
     */
    static fromString(text) {
        const match = text.match(re.PDEF);
        if (match && match.groups) {
            const { name, sep, blank, cmd } = match.groups;
            return new ProcessDef(match[0], name, sep, blank, cmd);
        }
        // NOTE: This match/if dance is not necessary, but it feels thorough.
        // It would be nice if just to validate that everything is either a ProcessDef
        // or Comment, and error if not.
        // const comment = text.match(re.IGNORED);
        // if (comment) {
        return new Comment(text);
        // }
    }
    /** Return the ProcessDef as a string. */
    toString() {
        return ProcessDef.fmtString(this.text);
    }
    /**
     * Format a string of text as a process definition, if possible.
     * @param text - The text to format.
     * @param insertSpaces - Use a space instead of a tab.
     * @returns - The formatted string or `text` unchanged.
     */
    static fmtString(text, insertSpace = true) {
        const match = text.match(re.PDEF);
        if (match && match.groups) {
            const { name, sep, cmd } = match.groups;
            return `${name}${sep}${insertSpace ? " " : ""}${cmd}`;
        }
        return text;
    }
}
exports.ProcessDef = ProcessDef;
//# sourceMappingURL=index.js.map