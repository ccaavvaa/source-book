// tslint:disable:only-arrow-functions
// tslint:disable-next-line:no-implicit-dependencies
import * as chai from 'chai';
import './debug-test';
import * as sb from '../lib/index';
// tslint:disable-next-line:no-implicit-dependencies
import 'mocha';

const expect = chai.expect;
// const assert = chai.assert;
describe('Scanner', function () {

    it('simple', async function () {
        const options: sb.ScannerOptions = {
            include: [
                '/lib/scan/**/*.ts',
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
