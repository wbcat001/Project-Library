import React, { ChangeEvent, useState, useEffect } from 'react';
import {Book, BookRequest, BookResponse} from "../models/Book";
import {getGutenbergBooks, registBook} from "../api/api";

import {Box, Divider} from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface BookSelectorProps {
    books: Book[];
    onBookSelect: (selectedBook: Book) => void;
}


interface SubmitButtonProps{
  onSubmit: () => void;
}


interface BookCardProps{
  book: Book;
  onSelect: (book:Book) => void;
}
const BookCard: React.FC<BookCardProps> = ({book, onSelect}) => {


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {book.author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onSelect(book)}>Add</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};



export const BookSelector: React.FC<BookSelectorProps> = ({books, onBookSelect}) => {
    const [selectedBook, setSelectedBook] = useState<Book>({title: "sample book", author:"tester", contentURL: "dummy"});

    const handleSelect = (book:Book) => { 
        setSelectedBook(book); 
        onBookSelect(book);
        console.log("book select")
    }

    return (
        <Box component="ul"
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
      
      {books.map((book, index) => (
        <BookCard key={index} book={book} onSelect={() => handleSelect(book)}/>
      ))}
    </Box>
    )
}






const BookSelectionPage: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book>({title: "sample book", author: "tester", contentURL: "dummy"});
    const [books, setBooks] = useState<Book[]>([
        {title: "Book A", author: "A2", contentURL: "dummy"},
        {title: "Book B", author: "Bob", contentURL: "dummy"},
        {title: "Book C", author: "CC", contentURL: "dummy"},
        
    ]);

    useEffect(() =>{
        const fetchGutenbergBooks = async () =>{
          const gutenbergBooks = await getGutenbergBooks();
          setBooks(gutenbergBooks);
        }

        fetchGutenbergBooks();
    }, []);

    const handleBookSelect = async (book: Book) => {
        setSelectedBook(book);
        
        const response = await registBook(book);
        console.log("regist book data", response);
        console.log("Submit books:", selectedBook);
    }

    // Send selected book.
    const handleSubmit = async () =>{
       
        const response = await registBook(selectedBook);
        console.log("regist book data", response);
        console.log("Submit books:", selectedBook);
    }

    return (
        <Box sx={{m:2}}>
          <Box sx={{m:2}}>
          <Typography variant="h4" component="div">Select and Add Book</Typography>
          </Box>
          <Divider/>
          <BookSelector books={books} onBookSelect={handleBookSelect} />
     
        </Box>
      );
};


export default BookSelectionPage;