export interface Book{
    title: string,
    author: string,
    contentURL: string
}

export interface BookResponse {
    id: number;
    title: string;
    author: string;
    modelURL: string,
    contentURL: string,
    createdAt: Date;
    updatedAt: Date;
}

export interface BookRequest{
    title: string,
    author: string,
    modelURL: string,
    contentURL: string,
}
