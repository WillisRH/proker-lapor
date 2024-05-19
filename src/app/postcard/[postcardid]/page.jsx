"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar';
import { useParams } from 'next/navigation';
import { isAdmin } from '@/helper/isAdmin';
import { isVerified } from '@/helper/isVerified';

export default function PostcardDetailPage() {
  const router = useRouter();
  const postcardid = useParams().postcardid;
  const [postcard, setPostcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const checkVerified = async() => {
      try {
        const verified = await isVerified();
        if (!verified) {
          router.push('/faq');
          return;
        }
      } catch (err) {
        console.error(err)
      }
    }
    checkVerified();
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/postcard/id?id=${postcardid}`);
        setPostcard(response.data.postcard);
        const isAdminUser = await isAdmin();
        setAdmin(isAdminUser);
      } catch (error) {
        console.error('Error fetching postcard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postcardid) {
      fetchData();
    }
  }, [postcardid]);

  const handleTitleClick = () => {
    if (!admin) return; // Don't allow editing if not admin
    setIsEditingTitle(true);
    setNewTitle(postcard.title);
  };

  const handleDescriptionClick = () => {
    if (!admin) return; // Don't allow editing if not admin
    setIsEditingDescription(true);
    setNewDescription(postcard.description);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/postcard/edit`, {
        title: newTitle,
        description: newDescription,
        postId: postcardid
      });
      setPostcard(response.data.postcard);
    } catch (error) {
      console.error('Error editing postcard:', error);
    } finally {
      setIsEditingTitle(false);
      setIsEditingDescription(false);
    }
  };

  const handleEditSubmit = () => {
    handleSave(); // Save changes
  };

  const handleDelete = async () => {
    if (!admin) return; // Only allow deletion if admin
    try {
      await axios.delete(`/api/postcard/id?id=${postcardid}`);
      router.push('/');
    } catch (error) {
      console.error('Error deleting postcard:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Postcard Detail</h1>
        <p className="text-gray-800">Owner ID:</p>
        {postcard.owner.map((owner, index) => (
              <p key={index} className="text-gray-800 mb-1 ">{owner}</p>
            ))}
            {/* {postcard.owner.map((owner, index) => (
              <p key={index} className="text-gray-800 mb-1 fixed bottom-0 left-3">{owner}</p>
            ))} */}
        {postcard ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-800 mb-1 fixed bottom-0 left-3">Postcard ID: {postcard._id}</p>
            {isEditingTitle ? (
              <input
                type="text"
                value={newTitle}
                onChange={handleTitleChange}
                onBlur={handleSave}
                className="text-xl font-bold mb-4 text-gray-800 focus:outline-none border-b-2 border-gray-500"
              />
            ) : (
              <h2
                onClick={handleTitleClick}
                className={`text-xl font-bold mb-4 text-gray-800 ${admin ? 'cursor-copy' : ''}`}
              >
                {postcard.title}
              </h2>
            )}
            {isEditingDescription ? (
              <textarea
                value={newDescription}
                onChange={handleDescriptionChange}
                onBlur={handleSave}
                className="text-gray-800 w-full h-40 mb-4 resize-none focus:outline-none border-b-2 border-gray-500"
              />
            ) : (
              <p
                onClick={handleDescriptionClick}
                className={`text-gray-800 mb-4 ${admin ? 'cursor-copy' : ''}`}
              >
                {postcard.description}
              </p>
            )}
            {(isEditingTitle || isEditingDescription) && (
              <button onClick={handleEditSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                Save
              </button>
            )}
            {admin && ( // Only render delete button if admin
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded bottom-2 left-2">
                Delete
              </button>
            )}
          </div>
        ) : (
          <p className="text-xl font-semibold text-center text-gray-800 mt-8">No postcard found.</p>
        )}
      </div>
    </div>
  );
}
