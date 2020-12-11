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
const fs = require("fs");
const child_process = require("child_process");
const ajv = require("ajv");
function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
function readJSON(fileName, validate) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield readFile(fileName);
        let json = JSON.parse(data);
        if (validate && !(yield validate(json))) {
            throw Error(`${fileName} has invalid format: ` + validate.errors);
        }
        return json;
    });
}
exports.readJSON = readJSON;
function readSchema(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        let schema = yield readJSON(fileName);
        return (new ajv()).compile(schema);
    });
}
exports.readSchema = readSchema;
function splitLines(s) {
    let buf = '';
    s.setEncoding('utf8');
    function emit(line) {
        s.emit('line', line);
    }
    function emitAll() {
        let lines = buf.split('\n');
        if (buf.length > 0 && !buf.endsWith('\n')) {
            buf = lines.pop();
        }
        else {
            buf = '';
        }
        for (let l of lines) {
            emit(l);
        }
    }
    s.on('data', (chunk) => {
        buf += chunk;
        emitAll();
    });
    s.on('end', () => {
        if (buf.length > 0) {
            emit(buf);
        }
    });
}
exports.splitLines = splitLines;
function translateTermination(proc) {
    proc.on('error', (e) => {
        proc.emit('terminated', `failed: ${e.message}`);
        proc.emit('fail', `failed: ${e.message}.`);
    });
    proc.on('exit', (code, signal) => {
        var message;
        var event;
        if (signal) {
            message = `killed with signal ${signal}.`;
            event = 'fail';
        }
        else if (code !== 0) {
            message = `exited with return code: ${code}.`;
            event = 'fail';
        }
        else {
            message = `exited normally.`;
            event = 'success';
        }
        proc.emit('terminated', message);
        proc.emit(event, message);
    });
}
exports.translateTermination = translateTermination;
function displayOutput(c, s) {
    s.setEncoding('utf8');
    s.on('data', (chunk) => {
        c.append(chunk);
    });
}
exports.displayOutput = displayOutput;
function spawn(program, args, cwd, env) {
    let options = {};
    if (cwd) {
        options['cwd'] = cwd;
    }
    if (env) {
        let e = Object.assign({}, process.env);
        for (let [v, val] of env) {
            e[v] = val;
        }
        options["env"] = e;
    }
    let proc = child_process.spawn(program, args, options);
    translateTermination(proc);
    return proc;
}
exports.spawn = spawn;
function redirectToChannel(proc, channel, init = false) {
    if (init) {
        channel.clear();
        channel.show();
    }
    displayOutput(channel, proc.stdout);
    displayOutput(channel, proc.stderr);
}
exports.redirectToChannel = redirectToChannel;
function merge(...ts) {
    return Object.assign({}, ...ts);
}
exports.merge = merge;
function* entries(o) {
    for (let k of Object.keys(o)) {
        yield [k, o[k]];
    }
}
exports.entries = entries;
function to_object(M) {
    const o = new Object();
    for (let [k, v] of M) {
        o[k] = v;
    }
    return o;
}
exports.to_object = to_object;
//# sourceMappingURL=util.js.map