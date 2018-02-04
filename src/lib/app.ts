import * as program from 'commander';

program
    .command('scan')
    .arguments('<sourceFilesGlog> <out>')
    .action((...args) => {
        // tslint:disable-next-line:no-console
        console.log(args);
    })
    .command('gen');
const c = program.parse(process.argv);
// tslint:disable-next-line:no-console
console.log('x');
