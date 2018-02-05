import { ScannerOptions, Scanner } from './scanner';
import { StructItem, FileRefItem, isStructItem } from './book-struct';
import * as path from 'path';

export interface CreateStructOptions {
    root: string;
    structFileName: string;
    include: string[];
    exclude?: string[];
}
export class CreateStruct {
    private readonly options: CreateStructOptions;
    constructor(options: CreateStructOptions) {
        this.options = options;
    }

    private async scan(): Promise<StructItem> {
        const scannerOptions: ScannerOptions = {
            include: this.options.include,
            exclude: this.options.exclude,
            globOptions: {
                root: this.options.root,
            },
        };
        const scanner = new Scanner(scannerOptions);
        let files = await scanner.scan();
        const r = path.resolve(this.options.root) + path.sep;
        files = files.map((f) => (f.substr(r.length)));
        const result: StructItem = {
            name: '*',
            items: [],
        };

        for (const f of files) {
            const itemPath = f.split(path.sep);
            const fileName = itemPath.pop();
            const parentItem: StructItem = this.navigate(result, itemPath);
            const fileItem: FileRefItem = {
                relativePath: path.join('.', f),
                fileType: path.extname(f),
            };
            parentItem.items.push(fileItem);
        }
        return result;
    }
    private navigate(root: StructItem, itemPath: string[]): StructItem {
        if (!itemPath) {
            return root;
        }
        const name = itemPath.splice(0, 1)[0];
        let si: StructItem = root.items.find((i) => isStructItem(i) && (i.name === name)) as StructItem;
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
