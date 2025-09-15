import React, { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBookId !== null) {
      setBooks(
        books.map((book) =>
          book.id === editingBookId ? { ...book, ...formData } : book
        )
      );
      setEditingBookId(null);
    } else {
      const newBook = { id: Date.now(), ...formData };
      setBooks([...books, newBook]);
    }
    setFormData({ title: "", author: "" });
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setFormData({ title: book.title, author: book.author });
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📚 Library Management
      </h2>

      <BookForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingBookId={editingBookId}
      />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500 mt-4">No books available</p>
      ) : (
        <BookList
          books={filteredBooks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
