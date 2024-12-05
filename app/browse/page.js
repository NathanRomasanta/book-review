"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import { useEffect, useState } from "react";



//Browser Page
export default function Page() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch(`https://www.googleapis.com/auth/books`);
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

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const signIn = async () => {
        await gitHubSignIn();
    }

    const signOut = async () => {
        await firebaseSignOut();
    }



    return (
        <div>
            <header className="bg-purple-500 text-white p-8 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Bookish Buzz</h1>

                    <ul className="flex space-x-4">
                        <li><Link href="http://localhost:3000/" className="hover:underline">Home</Link></li>
                        <li><a href="#" className="hover:underline">Browse</a></li>
                    </ul>
                </div>
            </header>
            
            <main>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">Book List</h1>
                    <ul>
                        {books.map((book) => (
                            <li key ={book.id} className="border-b border-gray-200 py-4 mb-4">
                                <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
                                <p>{book.volumeInfo.authors?.join(', ')}</p>
                                <p>{book.volumeInfo.publishedDate}</p>
                                <p>{book.volumeInfo.description}</p>
                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="mt-2" />
                            </li>
                        ))}
                    </ul>

                </div>
            </main>
        </div>
    )
}

