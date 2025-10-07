import React from 'react'
import "./Result.css";
function Result({book, genre}) {
  return (
    <div className={`result-card ${genre.toLowerCase()}`}>
        <h2 className={`title-book ${genre.toLowerCase()}`}>{book.title}</h2>
        <h3 className={`author-book ${genre.toLowerCase()}`}>{book.author}</h3>
        <img
        src={book.cover || "https://via.placeholder.com/150x220?text=No+Cover"}
        alt={book.title}
        />
    </div>
  )
}

export default Result