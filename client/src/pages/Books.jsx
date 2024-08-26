import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Books = () => {
    const [books, setBooks] = useState([]);
    const [isError, setIsError] = useState(true);
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books");
                setBooks(res.data);
                if (res.data.length > 0) {
                    setIsError(false);
                } else {
                    setIsError(true);
                }
            } catch (err) {
                console.log(err);
                return;
            }
        }
        fetchAllBooks();
        
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8000/books/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);

        }
    }
    function DataRender({isError}) {
        if (isError) {
            return <div><h1>Server Error!!</h1></div>
        } else {
            return <div className='books'>
                {books.map(book => (
                    <div className='book' key={book.id}>
                        {<img className='cover' src={book.cover} alt='cover' />}
                        <h2 className='price'>Rs. {book.price}</h2>
                        <h2 className='title'>{book.title}</h2>
                        <h2 className='author'>{book.author}</h2>
                        <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className='update'><Link className='link' to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
        }
    }

    return (
        <div>
            <h1>My Books</h1>
            <button>
                <Link className='link' to="/add" >Add New Book</Link>
            </button><br /><br />
            <DataRender isError={isError} />
        </div>
    )
}

export default Books;