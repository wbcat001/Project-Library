export interface Book{
    title: string,
    author: string,
}

export interface BookResponse {
    id: number;
    title: string;
    author: string;
    modelURL: string,
    createdAt: Date;
    updatedAt: Date;
}

export interface BookRequest{
    title: string,
    author: string,
    modelURL: string,
}
