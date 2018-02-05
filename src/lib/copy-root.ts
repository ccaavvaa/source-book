import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
export class CopyRoot {
    public static async execute(src: string, dest: string, files: string[]): Promise<void> {
        let absoluteSrc = path.resolve(src);
        let absoluteDest = path.resolve(dest);
        if (! await this.exists(absoluteDest)) {
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
    private static exists = promisify(fs.exists);
    private static mkdir = promisify(fs.mkdir);
    private static copyFile = promisify(fs.copyFile);
}
