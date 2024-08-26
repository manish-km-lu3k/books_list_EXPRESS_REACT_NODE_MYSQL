import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [book, setBook] = useState({
        title: '',
        autor: '',
        price: null,
        cover: ''
    });
    const navigate = useNavigate();
    const isEmpty = true;
    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/books", book);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    // Title and Author can't be empty!

    return (
        <div className='form'>
            <h1>Add New Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name='title' />
            <input type="text" placeholder='author' onChange={handleChange} name='author' />
            <input type="number" placeholder='price' onChange={handleChange} name='price' />
            <input type="text" placeholder='cover' onChange={handleChange} name='cover' />

            <button onClick={handleClick}>ADD</button>
            <span>
                {
                    isEmpty ? (
                        <h3>Title and Author can't be empty!</h3>
                    ) : (
                        <h3></h3>
                    )
                }
            </span>
        </div>
    )
}

export default Add;