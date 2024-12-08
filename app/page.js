"use client";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import ElevatedButton from "./components/ElevatedButton";
import { FaGithub, FaGoogle } from "react-icons/fa";
//Home Page
export default function Page() {
  console.log(useUserAuth());

  const { user, gitHubSignIn, firebaseSignOut, googleSignIn } = useUserAuth();

  const signIn = async () => {
    await gitHubSignIn();
  };

  const signInGoogle = async () => {
    await googleSignIn();
  };

  const signOut = async () => {
    await firebaseSignOut();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-purple-500 text-white p-8 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Bookish Buzz</h1>

          <ul className="flex space-x-4">
            <li>
              <Link href="http://localhost:3000/" className="hover:underline">
                //kinda sketch ngl Home
              </Link>
            </li>
            <li>
              <Link href="/browse" className="hover:underline">
                Browse
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <main className="flex-grow p-6">
        {user ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="mb-4 p-4">Welcome, {user.displayName}</p>
            <button className="mb-4 hover:underline" onClick={signOut}>
              Sign Out
            </button>
            <p className="text-center p-8">Welcome to Bookish Buzz!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center min-h-screen ">
              <h1 className="font-cursive text-3xl text-center p-4">
                Sorry, you need to sign in first!
              </h1>

              <div className="flex space-x-4">
                <ElevatedButton
                  text="GitHub"
                  onClick={signIn}
                  Icon={FaGithub}
                />
                <ElevatedButton
                  text="Twitter"
                  onClick={signIn}
                  Icon={FaGoogle}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-purple-500 text-white p-12 shadow-md"></footer>
    </div>
  );
}
