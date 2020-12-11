"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./errors/command");
class ProcessRunner {
    run(command, inputString) {
        let stdoutString = '';
        let stderrString = '';
        command.stdin.write(inputString);
        command.stdin.end();
        command.stdout.on('data', data => {
            stdoutString += data.toString();
        });
        command.stderr.on('data', data => {
            stderrString += data.toString();
        });
        return new Promise((resolve, reject) => {
            command.on('error', err => {
                reject(err);
            });
            command.on('close', code => {
                if (code !== 0) {
                    // @ts-ignore `spawnargs` is not declared on ChildProcess class. Private property?
                    const commandString = command.spawnargs.slice(-1)[0];
                    reject(new command_1.default(`Command failed: ${commandString}\n${stderrString}`, code, commandString, stderrString.trim()));
                }
                else {
                    resolve(stdoutString);
                }
            });
        });
    }
}
exports.default = ProcessRunner;
//# sourceMappingURL=process-runner.js.map