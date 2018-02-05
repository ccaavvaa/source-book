export interface StructItem {
    name?: string;
    items: BookItem[];
}

export type BookItem = StructItem | SimpleItem;
export type SimpleItem = string | FileRefItem;

export interface FileRefItem {
    relativePath: string;
    fileType: string;
}

export function isStructItem(i: BookItem): i is StructItem {
    return typeof (i) === 'object' && Array.isArray((i as any).items);
}
