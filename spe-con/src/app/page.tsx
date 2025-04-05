"use client";
import { Header } from "@/components/header";
import { Home } from "@/components/home"
import { useEffect } from 'react';

export default function Page() {
  // const [word, setWord] = useState<{message:string}>([]);
  useEffect(() => {
    const getWord = async () => {
  
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memos`); 
        // const text = await res.json();
        // console.log(text);
        // setWord(text);
        

    };
    getWord();
  }, []);
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/memos`)
  return (
    <>
     {/* {word.map((word:{id:number, message:string}) => (
       <p key={word.id}>{word.message}</p>
     ))} */}
      <Header />
      <main>
        <Home />
      </main>
    </>
  );
}
