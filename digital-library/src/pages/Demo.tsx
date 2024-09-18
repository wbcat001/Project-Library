
import {Box, Grid, TextField, Button} from "@mui/material";
import React ,{useState, useEffect} from "react";
import {BookResponse} from "../models/Book";
import LibraryView from "./LibraryView";
import BookSelectionPage from "./BookSelector";

import {getBooks} from "../api/api";
const Demo: React.FC = () => {
    
    
    const [books, setBooks] = useState<BookResponse[]>( [
            {id: 1, title: "a", author: "a", modelURL: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf", createdAt: new Date(), updatedAt: new Date()}
        ])
    
    const [books2, setBooks2] = useState<BookResponse[]>( [
        {id: 1, title: "a", author: "a", modelURL: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf", createdAt: new Date(), updatedAt: new Date()}
    ])
    

    useEffect(() => {
        const fetchBooks = async () => {
            const booksdata = await getBooks();
            setBooks(booksdata as BookResponse[]);
            // console.log("books2: " , books2);
            // console.log("books1", books);

    
        };
            
        
        fetchBooks();

    }, []);


    
    return(
    <Grid container spacing={2} height={800}>
        <Grid item xs={4}>        
          <BookSelectionPage/>
        </Grid>
        <Grid item xs={8}>        
           <LibraryView books={books}/>
        </Grid>
    </Grid>

    )
};


export default Demo;