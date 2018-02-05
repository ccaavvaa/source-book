import * as glob from 'glob';
import * as _ from 'lodash';
import { promisify } from 'util';
export interface ScannerOptions {
    include: string[];
    exclude?: string[];

    globOptions?: glob.IOptions;
}
export class Scanner {
    private readonly options: ScannerOptions;
    private readonly asyncGlob: (pattern: string, options: glob.IOptions) => Promise<string[]>;
    constructor(options: ScannerOptions) {
        this.options = options;
        this.asyncGlob = promisify(glob);
    }

    public async scan(): Promise<string[]> {
        let includeFiles: string[] = [];
        let excludeFiles: string[] = [];
        let promises: Array<Promise<void>> =
            this.options.include.map(
                (pattern) => this.asyncGlob(pattern, this.options.globOptions)
                    .then(
                    (v) => { includeFiles.push(...v); }
                    )
            );
        if (this.options.exclude) {
            promises.push(...this.options.exclude.map(
                (pattern) => this.asyncGlob(pattern, this.options.globOptions)
                    .then(
                    (v) => { includeFiles.push(...v); }
                    )
            ));
        }
        await Promise.all(promises);
        includeFiles = _.uniq(includeFiles);
        excludeFiles = _.uniq(excludeFiles);
        includeFiles = includeFiles.filter((f) => excludeFiles.indexOf(f) < 0);
        return includeFiles;
    }
}
