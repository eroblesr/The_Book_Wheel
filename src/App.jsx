import React, { useEffect, useState } from 'react'
import {romanceBooks,thrillerBooks} from "./data/Books";
import Result from "./components/Result";
import Pending from "./components/PendingList";
import Roulette from "./components/Roulette";
import "./App.css";
function App() {
  const [genre, setGenre] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPendings, setShowPendings] = useState(false);
  const STORAGE_KEY = "pendingBooks";
  const [pendingBooks, setPendingBooks] = useState(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  try {
    return saved ? JSON.parse(saved) : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
});
  useEffect(()=>{
    localStorage.setItem("pendingBooks", JSON.stringify(pendingBooks));
  },[pendingBooks]);
  function handleGenre(genre){
    setGenre(genre);
    setSelectedBook(null);
  }
  function handleSpin(){
    if(genre === "Romance"){
      let randomThriller = Math.floor(Math.random()* romanceBooks.length);
      let randomBook = romanceBooks[randomThriller];
      setSelectedBook(randomBook);
      setPendingBooks([...pendingBooks,randomBook]);
      addToPending(randomBook);
    }else if(genre === "Thriller"){
      let randomThriller = Math.floor(Math.random()* thrillerBooks.length);
      let randomBook = thrillerBooks[randomThriller];
      setSelectedBook(randomBook);
      setPendingBooks([...pendingBooks,randomBook]);
      addToPending(randomBook);
    }
    function addToPending(book){
      setPendingBooks(prev=>
        prev.some(b =>b.id === book.id)? prev: [...pendingBooks,book]
      )

    }
  }
  return (
     <div>
      {!genre ? (
      <> <h1>Choose a Genre</h1>
        <button onClick={()=>handleGenre("Romance")}>Romance</button>
        <button onClick={()=>handleGenre("Thriller")}>Thriller</button>
      </> ):(
      <>
        <h1>Ready to Spin</h1>
        <Roulette
          options={genre === "Romance"? romanceBooks : thrillerBooks}
          genre ={genre}
          onResult={setSelectedBook}/>
        <button onClick={handleSpin}>Spin</button>
        {selectedBook && <Result book={selectedBook}/>}
        <button onClick={()=> setShowPendings(!showPendings)}>
          {showPendings? "Hide pendings": "Show pendings"}
        </button>
        {showPendings && <Pending books={pendingBooks}/>}
      </>)} 
      
    </div>
  )
}

export default App
