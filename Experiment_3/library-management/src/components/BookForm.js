import React from "react";

function BookForm({ formData, handleChange, handleSubmit, editingBookId }) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="flex-1 p-2 border rounded-md"
      />
      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
        className="flex-1 p-2 border rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {editingBookId ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default BookForm;
