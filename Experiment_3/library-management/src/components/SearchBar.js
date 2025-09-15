import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      placeholder="Search by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mb-4 border rounded-md"
    />
  );
}

export default SearchBar;
