'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar';
import { useParams } from 'next/navigation';
import { isAdmin } from '@/helper/isAdmin';
import { isVerified } from '@/helper/isVerified';
import PerformanceChart from '@/components/PerformanceChart';
import { isOwner } from '@/helper/isOwner';

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
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const checkVerified = async () => {
      try {
        const verified = await isVerified();
        if (!verified) {
          router.push('/faq');
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkVerified();

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/postcard/id?id=${postcardid}`);
        const postcardData = response.data.postcard;
        setPostcard(postcardData);

        const isAdminUser = await isAdmin();
        setAdmin(isAdminUser);

        const isOwnerUser = await Promise.all(postcardData.owner.map(async ownerId => await isOwner(ownerId)));
        setOwner(isOwnerUser.some(status => status));
        console.log("OKASPNDI)ASDNAIOSDNAoi", isOwnerUser)
        
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
    if (!admin && !owner) return; // Don't allow editing if not admin or owner
    setIsEditingTitle(true);
    setNewTitle(postcard.title);
  };

  const handleDescriptionClick = () => {
    if (!admin && !owner) return; // Don't allow editing if not admin or owner
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
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{postcard.title}</h1>
        {postcard ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-800 mb-1 fixed bottom-0 left-3">Postcard ID: {postcard._id}</p>
            <p className="text-gray-800 mb-1 fixed bottom-5 left-3">Owner ID:</p>
            {postcard.owner.map((owner, index) => (
              <p key={index} className="fixed bottom-2 left-0 m-4 px-20 text-black">{owner}</p>
            ))}
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
                className={`text-xl font-bold mb-4 text-gray-800 ${admin || owner ? 'cursor-copy' : ''}`}
              >
                Description:
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
                className={`text-gray-800 mb-4 ${admin || owner ? 'cursor-copy' : ''}`}
              >
                {postcard.description}
              </p>
            )}
            {(admin || owner) && postcard.privatemsg && (
              <div className="bg-gray-200 p-4 rounded-md mt-4">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Private Message:</h3>
                <p className="text-gray-800">{postcard.privatemsg}</p>
              </div>
            )}
            {(admin || owner) && postcard.performance && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Performance:</h3>
                <PerformanceChart performance={postcard.performance} />
              </div>
            )}
            {(admin || owner) && (isEditingTitle || isEditingDescription) && (
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
            )}
            {admin && ( // Only render delete button if admin
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded bottom-2 left-2"
              >
                Delete
              </button>
            )}
          </div>
        ) : (
          <p className="text-xl font-semibold text-center text-gray-800 mt-8">No postcard found.</p>
        )}
      </div>
      {(admin || owner) && ( // Render "Add Month Performance" button for admin or owner
              <div className="flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Month Performance
              </button>
            </div>
            )}
    </div>
  );
}
