import React, { useEffect, useState } from 'react'
import {romanceBooks,thrillerBooks} from "./data/Books";
import Result from "./components/Result";
import Pending from "./components/PendingList";
import Roulette from "./components/Roulette";
import useBooks from './hooks/useBooks';
import "./App.css";
const themes = {
  Romance: {
    primary: "#FFB6C1",
    secondary: "#FFC0CB",
    accent: "#DB7093",
    background: "#FFF0F5",
    text: "#4B0082",
    fontTitle: "Playfair Display, serif",
    fontBody: "Nunito, sans-serif"
  },
  Thriller: {
    primary: "#8B0000",
    secondary: "#2F4F4F",
    accent: "#800080",
    background: "#191970",
    text: "#F5F5F5",
    fontTitle: "Oswald, sans-serif",
    fontBody: "Roboto, sans-serif"
  }
};

function App() {
  const [genre, setGenre] = useState("");
  const theme = themes[genre] || {
  background: "#ffffff",
  text: "#000000"
};
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPendings, setShowPendings] = useState(false);
  const STORAGE_KEY = "pendingBooks";
  const [spinTrigger, setSpinTrigger] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
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
  const { books, loading, error, refetch } = useBooks(genre);
  const options = (books && books.length)
    ? books
    : (genre === "Romance" ? romanceBooks : thrillerBooks);
  function handleGenre(genre){
    setGenre(genre);
    setSelectedBook(null);
  }
  function addToPending(book){
      setPendingBooks(prev=>
        prev.some(b =>b.id === book.id)? prev: [...pendingBooks,book]
      )

    }
  function handleStart(){
    setSpinTrigger(prev => prev +1);
    if (isSpinning) return;
    setIsSpinning(true);
    if(genre === "Romance"){
      let randomThriller = Math.floor(Math.random()* romanceBooks.length);
      let randomBook = romanceBooks[randomThriller];
      setSelectedBook(randomBook);
      addToPending(randomBook);
    }else if(genre === "Thriller"){
      let randomThriller = Math.floor(Math.random()* thrillerBooks.length);
      let randomBook = thrillerBooks[randomThriller];
      setSelectedBook(randomBook);
      addToPending(randomBook);
    }
    setTimeout(() => setIsSpinning(false), 4000);
  }
  const themeKey = genre?.toLowerCase() === "thriller" ? "thriller" : "romance";
  return (
     <div
      className="app-bg"
      data-theme = {themeKey} 
      style={{
      backgroundColor: theme.background, 
      color: theme.text, 
      minHeight: "100vh",
      padding: "1rem"}}>
      <div className="glass-shell">
        {!genre ? (
      <div className="start-screen">
        <div className="roulette-container" >
          <img className="roulette-img"src="Roulette.png" alt="Roulette" />
        </div>
        <h1>Choose a Genre</h1>
        <div className="button-group">
          <button  className="btn btn-romance"onClick={()=>handleGenre("Romance")}>Romance</button>
          <button className="btn btn-thriller"onClick={()=>handleGenre("Thriller")}>Thriller</button>
        </div>
      </div> ):(
      <>
      <div className="roulette-section">
        <h1>Ready to Spin</h1>
        {loading && <p style={{opacity:.9}}>Loading Books…</p>}
        {error && (
         <div style={{opacity:.9}}>
        <p>it was a problem. Try again?</p>
        <button className="btn btn-pendings" onClick={refetch}>Reintentar</button>
        </div>
      )}
        <Roulette
          options={options}
          genre ={genre}
          spinTrigger={spinTrigger}
          onResult={setSelectedBook}/>
        <button 
        className={`btn btn-start ${genre.toLowerCase()}` }
        onClick={handleStart}
        disabled={isSpinning || loading}>
        {loading ? "Loading..." : "Start"}
        </button>
        {selectedBook && <Result book={selectedBook} genre={genre}/>}
        <button 
        className="btn btn-pendings"
        onClick={()=> setShowPendings(!showPendings)}>
          {showPendings? "Hide pendings": "Show pendings"}
        </button>
        </div>
        {showPendings && <Pending books={pendingBooks} genre={genre}/>}
      </>)} 
      </div>
      
    </div>
  )
}

export default App
