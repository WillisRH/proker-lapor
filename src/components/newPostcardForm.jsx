"use client"
import Link from 'next/link';
import { useState } from 'react';


function NewPostcardForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/postcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) { 
        console.log('Postcard saved successfully');
        const savedPostcard = await reponse.json();
        // Update your postcard state to refresh the display using the savedPostcard data 
      } else {
        console.error('Failed to save postcard:', response.status, response.statusText)
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Display an error message to the user
    }

    // Reset form fields
    setTitle('');
    setDescription('');
};


  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-center text-black">Create a New Postcard</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-black font-bold mb-2">Title:</label>
          <input 
            type="text" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full border border-gray-300 p-2 rounded" 
            required 
            style={{ color: 'black' }} // Inline style for input text color
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-black font-bold mb-2">Description:</label>
          <textarea 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full border border-gray-300 p-2 rounded" 
            required 
            style={{ color: 'black' }} // Inline style for input text color
          />
        </div>


        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPostcardForm;
