"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const _ = require("lodash");
const util_1 = require("util");
class Scanner {
    constructor(options) {
        this.options = options;
        this.asyncGlob = util_1.promisify(glob);
    }
    async scan() {
        let includeFiles = [];
        let excludeFiles = [];
        let promises = this.options.include.map((pattern) => this.asyncGlob(pattern, this.options.globOptions)
            .then((v) => { includeFiles.push(...v); }));
        if (this.options.exclude) {
            promises.push(...this.options.exclude.map((pattern) => this.asyncGlob(pattern, this.options.globOptions)
                .then((v) => { includeFiles.push(...v); })));
        }
        await Promise.all(promises);
        includeFiles = _.uniq(includeFiles);
        excludeFiles = _.uniq(excludeFiles);
        includeFiles = includeFiles.filter((f) => excludeFiles.indexOf(f) < 0);
        return includeFiles;
    }
}
exports.Scanner = Scanner;
//# sourceMappingURL=scanner.js.map