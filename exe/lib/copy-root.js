"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util_1 = require("util");
const fs = require("fs");
const fsExtra = require("fs-extra");
class CopyRoot {
    static async execute(src, dest, files) {
        let absoluteSrc = path.resolve(src);
        let absoluteDest = path.resolve(dest);
        if (!await this.exists(absoluteDest)) {
            await this.mkdir(absoluteDest);
        }
        absoluteSrc += path.sep;
        absoluteDest += path.sep;
        const copyPromises = files.map((f) => {
            f = path.resolve(f);
            if (!f.startsWith(absoluteSrc)) {
                throw new Error('invalid root copy args');
            }
            const relPath = f.substr(absoluteSrc.length);
            const destFileName = path.join(absoluteDest, relPath);
            const destFolder = path.dirname(destFileName);
            return fsExtra.ensureDir(destFolder).then(() => this.copyFile(f, destFileName));
        });
        return Promise.all(copyPromises).then(() => {
            return;
        });
    }
}
CopyRoot.exists = util_1.promisify(fs.exists);
CopyRoot.mkdir = util_1.promisify(fs.mkdir);
CopyRoot.copyFile = util_1.promisify(fs.copyFile);
exports.CopyRoot = CopyRoot;
//# sourceMappingURL=copy-root.js.map