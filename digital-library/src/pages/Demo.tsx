
import {Box, Grid, TextField, Button} from "@mui/material";
import React ,{useState, useEffect} from "react";
import {BookResponse} from "../models/Book";
import LibraryView from "./LibraryView";
import BookSelectionPage from "./BookSelector";

import {getBooks, getBookText} from "../api/api";
import { TextReader } from "./TextReader";
import {SideBar} from "./SideBar";


export enum MainViewType{
    Library = "Library",
    Add = "Add"
}

interface MainViewProps{
    selectedView: MainViewType,
    books: BookResponse[],
    handleSelectedBook: (book: BookResponse|null) => void
}


const MainView : React.FC<MainViewProps> = ({selectedView, books, handleSelectedBook}) => {
    switch (selectedView){
        case "Library":
            return <LibraryView books={books} onClickBook={handleSelectedBook}/>
        
        case "Add":
            return <BookSelectionPage/>

        default:
            return <LibraryView books={books} onClickBook={handleSelectedBook}/>
    }
}

const Demo: React.FC = () => {
    
    
    const [books, setBooks] = useState<BookResponse[]>( [
            {id: 1, title: "a", author: "a", modelURL: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf", contentURL: "dummy",createdAt: new Date(), updatedAt: new Date()}
        ])
    
    const [books2, setBooks2] = useState<BookResponse[]>( [
        {id: 1, title: "a", author: "a", modelURL: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf", contentURL: "dummy",createdAt: new Date(), updatedAt: new Date()}
    ])

    const [SelectedBook, setSelectedBook] = useState<BookResponse|null>(null);
    const [BookText, setBookText] = useState<string>("");
    const [selectedView, setSelectedView] = useState<MainViewType>(MainViewType.Library);

    const mainViewArray = Object.values(MainViewType);
    

    useEffect(() => {
        const fetchBooks = async () => {
            const booksdata = await getBooks();
            setBooks(booksdata as BookResponse[]);
        };
                   
        fetchBooks();

    }, []);

    const handleSelectedBook = async (book: BookResponse|null) => {
        setSelectedBook(book);
        if(book){
            setBookText(await getBookText(book.contentURL))
        }else{
            setBookText("");
        }
    }

    const handleSelectedView = (mainView: MainViewType) => {
        setSelectedView(mainView);
    }


    
    return(
    <div>
    <Grid container spacing={2} height={1000}>
        <Grid item xs={2}>        
          <SideBar mainViewArray={mainViewArray} onSelectView={handleSelectedView} />
        </Grid>
        <Grid item xs={10}>        
           <MainView selectedView={selectedView} books={books} handleSelectedBook={handleSelectedBook}/>
        </Grid>
    </Grid>
    <Grid container spacing={2}>
        <TextReader text={BookText}/>
        
    </Grid>
    </div>

    )
};


export default Demo;