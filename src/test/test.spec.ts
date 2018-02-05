// tslint:disable:only-arrow-functions
// tslint:disable-next-line:no-implicit-dependencies
import * as chai from 'chai';
import './debug-test';
// tslint:disable-next-line:no-implicit-dependencies
import 'mocha';
import * as sb from '../lib/index';

const expect = chai.expect;
// const assert = chai.assert;
describe('test', function () {

    it('test', function () {
        // ok
    });
});
describe('Scanner', function () {

    it('t1', async function () {
        const options: sb.ScannerOptions = {
            include: [
                '/lib/**/*.ts',
            ],
            globOptions: {
                root: './src',
            },
        };
        const s = new sb.Scanner(options);
        const files = await s.scan();
        expect(files.length > 0).to.be.true;
    });
});

describe('RootCopy', function () {
    it('t2', async function () {
        await sb.CopyRoot.execute('./src', './out', ['./src/lib/copy-root.ts']);
    });
});
