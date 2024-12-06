'use client';
import { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';

//Browser Page
export default function Page() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setLoading(true);
    async function fetchBooks() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=He+Who+Fights+with+Monsters`
        );
        if (!response.ok) {
          throw new Error('Network connection is not great!');
        }
        const data = await response.json();
        setBooks(data.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <header className='bg-purple-500 text-white p-8 shadow-md'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>Bookish Buzz</h1>
          <div className='flex items-center space-x-2'>
          <input
            type='text'
            placeholder='Search'
            value={userInput}
            className='border border-gray-200 p-2 rounded-lg text-black'
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setLoading(true);
              async function fetchBooks() {
                try {
                  const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${userInput
                      .split(' ')
                      .join('+')}`
                  );
                  if (!response.ok) {
                    throw new Error('Network connection is not great!');
                  }
                  const data = await response.json();
                  setBooks(data.items);
                } catch (error) {
                  setError(error);
                } finally {
                  setLoading(false);
                }
              }
              fetchBooks();
            }}
            className='border-2 border-gray-200 text-white p-2 rounded-lg'>
            Search
          </button>
          </div>

          <ul className='flex space-x-4'>
            <li>
              <Link
                href='http://localhost:3000/'
                className='hover:underline'>
                Home
              </Link>
            </li>
            <li>
              <a
                href='#'
                className='hover:underline'>
                Browse
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <div className='container mx-auto p-4'>
          <h1 className='text-3xl font-bold mb-4'>Book List</h1>
          <ul>
            {books.map((book) => (
              <li
                key={book.id}
                className='border-b border-gray-200 py-4 mb-4 flex items-start'>
                
                <div className='w-1/3'>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                  className='mt-2'
                /></div>
                <div className='w-2/3 ml-6'>
                <h2 className='text-xl font-semibold'>
                  {book.volumeInfo.title}
                </h2>
                <p className='mb-2'>Written by: {book.volumeInfo.authors?.join(', ')}</p>
                <p>Published on: {book.volumeInfo.publishedDate}</p>
                <p>{book.volumeInfo.description}</p></div>
                
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className='bg-purple-500 text-white p-12 shadow-md'></footer>

    </div>
  );
}
