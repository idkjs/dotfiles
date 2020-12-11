'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function replaceAll(s, substr, newSubstr) {
    while (s.indexOf(substr) !== -1) {
        s = s.replace(substr, newSubstr);
    }
    return s;
}
function* reversed(a) {
    for (let i = a.length - 1; i >= 0; i--) {
        yield a[i];
    }
}
class Expander {
    constructor(M) {
        this.definitions = new Map();
        this.topologicalOrder = [];
        for (let [k, v] of M) {
            this.definitions.set(`\${${k}}`, v);
        }
        const visiting = new Set();
        const visited = new Set();
        const visit = (s) => {
            if (visiting.has(s)) {
                throw Error("cyclic variable definition");
            }
            if (visited.has(s)) {
                return;
            }
            visiting.add(s);
            visited.add(s);
            const val = this.definitions.get(s);
            for (let k of this.definitions.keys()) {
                if (val.indexOf(k) !== -1) {
                    visit(k);
                }
            }
            visiting.delete(s);
            this.topologicalOrder.push(s);
        };
        for (let k of this.definitions.keys()) {
            visit(k);
        }
    }
    expandString(s) {
        for (let v of reversed(this.topologicalOrder)) {
            s = replaceAll(s, v, this.definitions.get(v));
        }
        return s;
    }
    expandArray(a) {
        return a.map(s => this.expandString(s));
    }
    expandMap(a) {
        let M = new Map();
        for (let [v, val] of a) {
            M.set(v, this.expandString(val));
        }
        return M;
    }
    expand(x) {
        if (x === null) {
            return null;
        }
        else if (x === undefined) {
            return undefined;
        }
        else if (typeof x === 'string') {
            return this.expandString(x);
        }
        else if (x instanceof Array) {
            return this.expandArray(x);
        }
        else {
            return this.expandMap(x);
        }
    }
}
exports.Expander = Expander;
//# sourceMappingURL=expand.js.map