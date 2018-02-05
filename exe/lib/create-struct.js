"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./scanner");
const book_struct_1 = require("./book-struct");
const path = require("path");
class CreateStruct {
    constructor(options) {
        this.options = options;
    }
    async scan() {
        const scannerOptions = {
            include: this.options.include,
            exclude: this.options.exclude,
            globOptions: {
                root: this.options.root,
            },
        };
        const scanner = new scanner_1.Scanner(scannerOptions);
        let files = await scanner.scan();
        const r = path.resolve(this.options.root) + path.sep;
        files = files.map((f) => (f.substr(r.length)));
        const result = {
            name: '*',
            items: [],
        };
        for (const f of files) {
            const itemPath = f.split(path.sep);
            const fileName = itemPath.pop();
            const parentItem = this.navigate(result, itemPath);
            const fileItem = {
                relativePath: path.join('.', f),
                fileType: path.extname(f),
            };
            parentItem.items.push(fileItem);
        }
        return result;
    }
    navigate(root, itemPath) {
        if (!itemPath) {
            return root;
        }
        const name = itemPath.splice(0, 1)[0];
        let si = root.items.find((i) => book_struct_1.isStructItem(i) && (i.name === name));
        if (!si) {
            si = {
                name,
                items: [],
            };
            root.items.push(si);
        }
        return this.navigate(si, itemPath);
    }
}
exports.CreateStruct = CreateStruct;
//# sourceMappingURL=create-struct.js.map