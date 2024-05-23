'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function NewPostcardForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privateMsg, setPrivateMsg] = useState('');
  const [performance, setPerformance] = useState(0);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      const response = await fetch('/api/postcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          description,
          owner: [res.data.data._id],
          privatemsg: privateMsg,
          performance
        }),
      });

      if (response.ok) { 
        console.log('Postcard saved successfully');
        const savedPostcard = await response.json();
        // Update your postcard state to refresh the display using the savedPostcard data 
        router.push('/');
      } else {
        console.error('Failed to save postcard:', response.status, response.statusText);
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Display an error message to the user
    }

    // Reset form fields
    setTitle('');
    setDescription('');
    setPrivateMsg('');
    setPerformance(0);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-center text-black">It's time for you to post, Create a New Postcard</h2>

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
        
        <div className="mb-6">
          <label htmlFor="privatemsg" className="block text-black font-bold mb-2">Private Message (Optional):</label>
          <textarea 
            id="privatemsg"
            value={privateMsg}
            onChange={(e) => setPrivateMsg(e.target.value)} 
            className="w-full border border-gray-300 p-2 rounded" 
            style={{ color: 'black' }} // Inline style for input text color
          />
        </div>

        <div className="mb-6">
          <label htmlFor="performance" className="block text-black font-bold mb-2">Performance:</label>
          <input
            type="range"
            id="performance"
            value={performance}
            onChange={(e) => setPerformance(e.target.value)}
            min="0"
            max="100"
            className="w-full"
          />
          <span className="block text-center text-black mt-2">{performance}%</span>
        </div>

        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPostcardForm;
