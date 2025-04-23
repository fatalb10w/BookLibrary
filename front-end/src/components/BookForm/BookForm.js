import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
import './BookForm.css'
import { addBook, fetchBook } from '../../redux/slices/bookSlice'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'
import {setError} from "../../redux/slices/errorSlice";

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && author) {
      const book = createBookWithID({ title, author }, 'manual')
      console.log(addBook)
      dispatch(addBook(book))
      setTitle('')
      setAuthor('')
    } else {
      dispatch(setError('You must fill title and author'))
    }
  }

  function handleAddRandomBook() {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
    const randomBookWithID = createBookWithID(randomBook, 'random')
    dispatch(addBook(randomBookWithID))
  }

  const handleAddRandomBookViaAPI = async () => {
    try {
      setIsLoading(true)
      await dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
    } finally {
      setIsLoading(false)
    }


  }

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>

        <button type="button" onClick={handleAddRandomBookViaAPI} disabled={isLoading}>
          {isLoading ? (
              <><span>Loading... <FaSpinner className="spinner" /></span></>
          ) : 'Add Random via API'}
        </button>
      </form>
    </div>
  )
}

export default BookForm
