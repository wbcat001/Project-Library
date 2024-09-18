import React, { ChangeEvent, useState } from 'react';
import {Book, BookRequest, BookResponse} from "../models/Book";
import {registBook} from "../api/api";

interface BookSelectorProps {
    books: Book[];
    onBookSelect: (selectedBook: Book) => void;
  }



export const BookSelector: React.FC<BookSelectorProps> = ({books, onBookSelect}) => {
    const [selectedBook, setSelectedBook] = useState<Book>({title: "sample book", author:"tester"});

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const tmpSelectedBook = books.find(book => book.title === event.target.value);
        setSelectedBook(tmpSelectedBook!); 
        onBookSelect(tmpSelectedBook!);
    }

    return (
        <div>
      <label htmlFor="book-select">Select a Book: </label>
      <select id="book-select" value={selectedBook.title} onChange={handleSelect}>
        <option value="" disabled>Select...</option>
        {books.map((book, index) => (
          <option key={index} value={book.title}>{book.title}</option>
        ))}
      </select>
    </div>
    )
}


interface BookListProps {
    selectedBook: Book;
  }
  
export const BookList: React.FC<BookListProps> = ({ selectedBook }) => {
return (
    <div>
    <h2>Selected Books:</h2>
    <ul>
        
        <li >{selectedBook.title}</li>
        
    </ul>
    </div>
);
};


interface SubmitButtonProps{
    onSubmit: () => void;
}


const SubmitButton: React.FC<SubmitButtonProps> = ({onSubmit}) => {
    return (
        <button onClick={onSubmit}>Submit</button>
      );
}


const BookSelectionPage: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book>({title: "sample book", author: "tester"});
    const books: Book[] = [
        {title: "Book A", author: "A2"},
        {title: "Book B", author: "Bob"},
        {title: "Book C", author: "CC"},
        
    ]

    const handleBookSelect = (book: Book) => {
        setSelectedBook(book);
    }

    // Send selected book.
    const handleSubmit = async () =>{

        const response = await registBook(selectedBook);
        console.log("regist book data", response);
        console.log("Submit books:", selectedBook);
    }

    return (
        <div>
          <h1>Select and Submit Books</h1>
          <BookSelector books={books} onBookSelect={handleBookSelect} />
          <BookList selectedBook={selectedBook} />
          <SubmitButton onSubmit={handleSubmit} />
        </div>
      );
};


export default BookSelectionPage;