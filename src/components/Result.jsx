import React from 'react'

function Result({book}) {
  return (
    <div>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
    </div>
  )
}

export default Result