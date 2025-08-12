import React from 'react'

function PendingList({books}) {
    
  return (
    <div>
        <h2>Pending books</h2>
        {books.length === 0?(
            <p>No books added yet...</p>
        ):(
            <ul>
                {books.map((book,index)=>(
                    <li key={index}>{book.title}</li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default PendingList