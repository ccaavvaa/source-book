export declare class CopyRoot {
    static execute(src: string, dest: string, files: string[]): Promise<void>;
    private static exists;
    private static mkdir;
    private static copyFile;
}
