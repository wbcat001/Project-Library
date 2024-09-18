

export interface Book {
    id: number;
    title: string;
    author: string;
    modelPath: string,
    createdAt: Date;
    updatedAt: Date;
}

export interface BookRequest{
    title: string,
    author: string,
    modelURL: string,
}