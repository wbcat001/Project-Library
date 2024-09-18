
import {useState, useEffect} from 'react';
import React from 'react';

interface Book{
    id: number,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    modelURL: string,
}


const fetchBooks = async (): Promise<Book[]> => {
    const response = await fetch('/users');
    const data: Book[] = await response.json();
    return data;;
};


const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(()=> {
        fetchBooks().then(setBooks);
    },[]);

    return(
        <div>
        <ul>
      {books.map(user => (
        <li key={user.id}>{user.title}</li>
      ))}
    </ul>
    </div>
    )
}
