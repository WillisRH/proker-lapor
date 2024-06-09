// components/PostcardFinder.js
import { useState } from 'react';

export default function PostcardFinder({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Call the onSearch function passed as a prop
  };

  return (
    <div className="mb-6 items-left text-left">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search postcards..."
        className="p-2 border border-gray-300 rounded-md w-full text-black"
      />
    </div>
  );
}
