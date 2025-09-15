import React from "react";

function BookList({ books, handleEdit, handleDelete }) {
  if (books.length === 0) {
    return <p className="text-gray-500">No books found.</p>;
  }

  return (
    <ul className="space-y-2">
      {books.map((book) => (
        <li
          key={book.id}
          className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm"
        >
          <span>
            <strong>{book.title}</strong> by {book.author}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => handleEdit(book)}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
