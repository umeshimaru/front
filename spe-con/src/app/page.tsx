"use client";
import { Header } from "@/components/header";
import { Home } from "@/components/home"
import { useState,useEffect } from 'react';

export default function Page() {
  const [word, setWord] = useState([]);
  useEffect(() => {
    const getWord = async () => {
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memos`); 
        const text = await res.json();
        console.log(text);
        setWord(text);

    };
    getWord();
  }, []);
  return (
    <>
     {word.map((word:{id:number, message:string}) => (
       <p key={word.id}>{word.message}</p>
     ))}
      <Header />
      <main>
        <Home />
      </main>
    </>
  );
}
