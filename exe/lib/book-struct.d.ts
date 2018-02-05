export interface StructItem {
    name?: string;
    items: BookItem[];
}
export declare type BookItem = StructItem | SimpleItem;
export declare type SimpleItem = string | FileRefItem;
export interface FileRefItem {
    relativePath: string;
    fileType: string;
}
export declare function isStructItem(i: BookItem): i is StructItem;
