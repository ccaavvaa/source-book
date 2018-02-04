"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
program
    .command('scan')
    .arguments('<sourceFilesGlog> <out>')
    .action((...args) => {
    console.log(args);
})
    .command('gen');
const c = program.parse(process.argv);
console.log('x');
//# sourceMappingURL=app.js.map