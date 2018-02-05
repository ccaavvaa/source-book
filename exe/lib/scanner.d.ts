/// <reference types="glob" />
import * as glob from 'glob';
export interface ScannerOptions {
    include: string[];
    exclude?: string[];
    globOptions?: glob.IOptions;
}
export declare class Scanner {
    private readonly options;
    private readonly asyncGlob;
    constructor(options: ScannerOptions);
    scan(): Promise<string[]>;
}
