import {Book, BookRequest, BookResponse} from "../models/Book";


export const registBook = async (book: Book) => {
    const responseGenerate = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({book})
    });

    if(responseGenerate.ok){
        const responseJson = await responseGenerate.json()
        console.log("new book url is created:", responseJson.modelURL);

        const bookRequest: BookRequest = {
            title: book.title,
            author: book.author,
            modelURL: responseJson.modelURL,
        }
        console.log("BookRequest:", bookRequest);

        const response = await fetch("http://localhost:3001/books",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({bookRequest}),
        })

        if(response.ok){
            const newBook = await response.json();
            console.log("new book:" , newBook)
        }else{
            console.error("Failed to create new book")
        }
    }else{
        console.error("Failed to create new model");
    }
}


export const getBooks = async (): Promise<BookResponse[]> =>{
    const response = await fetch("http://localhost:3001/books",{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
    
    if(response.ok){
        const books = await response.json();
        
        return books;
    }else{
        console.error("Failed to get books.")
        return [];
    }
}