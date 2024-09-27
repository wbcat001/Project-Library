
export interface Book {
    id: number;
    title: string;
    author: string;
    modelPath: string,
    contentURL: number,
    createdAt: Date;
    updatedAt: Date;
}

export interface BookRequest{
    contentURL: any;
    title: string,
    author: string,
    modelURL: string,
    gutenbergId: number,
}