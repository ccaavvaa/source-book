export interface CreateStructOptions {
    root: string;
    structFileName: string;
    include: string[];
    exclude?: string[];
}
export declare class CreateStruct {
    private readonly options;
    constructor(options: CreateStructOptions);
    private scan();
    private navigate(root, itemPath);
}
