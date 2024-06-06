'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import logodubes from '@/components/logodubes.png'

function NewPostcardForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privateMsg, setPrivateMsg] = useState('');
  const [performance, setPerformance] = useState(0);
  const [postcards, setPostcards] = useState([]);
  const [selectedPostcard, setSelectedPostcard] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPostcards = async () => {
      try {
        const res = await axios.get('/api/users/me');
        const userId = res.data.data._id;
        const response = await axios.get(`/api/postcard?userId=${userId}`);
        setPostcards(response.data.postcards);
      } catch (error) {
        console.error('Error fetching postcards:', error);
      }
    };

    fetchPostcards();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get('/api/users/me');
      const userId = res.data.data._id;
      console.log("Selected ", selectedPostcard);
      const response = await fetch('/api/postcard', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          title, 
          description,
          owner: [userId],
          privatemsg: privateMsg,
          referto: selectedPostcard,
          performance, 
        }),
      });

      if (response.ok) { 
        console.log('Postcard saved successfully');
        router.push('/');
      } else {
        console.error('Failed to save postcard:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setTitle('');
    setDescription('');
    setPrivateMsg('');
    setPerformance(0);
    setSelectedPostcard(null);
  };

  const handleTogglePostcard = (id) => {
    setSelectedPostcard(selectedPostcard === id ? "" : id);
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
            style={{ color: 'black' }}
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
            style={{ color: 'black' }}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="privatemsg" className="block text-black font-bold mb-2">Private Message (Optional):</label>
          <textarea 
            id="privatemsg"
            value={privateMsg}
            onChange={(e) => setPrivateMsg(e.target.value)} 
            className="w-full border border-gray-300 p-2 rounded" 
            style={{ color: 'black' }}
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

        <h2 className="text-xl font-bold mb-4 text-center text-black">Refer To (Make sure to use this when you already have postcard):</h2>
        <div className="mb-6">
          {postcards.length > 0 ? (
            <ul className="space-y-2">
              {postcards.map(postcard => (
                <li key={postcard._id} className="flex items-center justify-between p-2 border border-gray-300 rounded">
                  <span style={{ color: 'black' }}>{postcard.title}</span>
                  <button 
                    type="button"
                    onClick={() => handleTogglePostcard(postcard._id)}
                    className={`p-2 rounded ${selectedPostcard === postcard._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    {selectedPostcard === postcard._id ? 'Selected' : 'Select'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black">You have no postcards.</p>
          )}
        </div>

        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPostcardForm;
