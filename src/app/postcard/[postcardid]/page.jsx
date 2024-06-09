'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar';
import { isAdmin } from '@/helper/isAdmin';
import { isVerified } from '@/helper/isVerified';
import PerformanceChart from '@/components/PerformanceChart';
import { isOwner } from '@/helper/isOwner';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import settings from '@/lib/settings.json'


export default function PostcardDetailPage() {
  const router = useRouter();
  const { postcardid } = useParams();
  const [postcard, setPostcard] = useState(null);
  const [referToPostcards, setReferToPostcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [admin, setAdmin] = useState(false);
  const [owner, setOwner] = useState(false);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const privatemessage = settings.privateMessage

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
        const response = await axios.get(`/api/postcard?id=${postcardid}`);
        const { mainPostcard, refertoPostcards } = response.data.postcards;
        setPostcard(mainPostcard);
        setReferToPostcards(refertoPostcards);

        const isAdminUser = await isAdmin();
        setAdmin(isAdminUser);

        const isOwnerUser = await Promise.all(mainPostcard.owner.map(async ownerId => await isOwner(ownerId)));
        setOwner(isOwnerUser.some(status => status));
        
      } catch (error) {
        console.error('Error fetching postcard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postcardid) {
      fetchData();
    } else {
      const fetchAllData = async () => {
        try {
          const response = await axios.get('/api/postcard');
          setPostcard(response.data.postcards);
        } catch (error) {
          console.error('Error fetching postcards:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchAllData();
    }
  }, [postcardid]);

  const handleTitleClick = () => {
    if (!admin && !owner) return;
    setIsEditingTitle(true);
    setNewTitle(postcard.title);
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 100);
  };

  const handleDescriptionClick = () => {
    if (!admin && !owner) return;
    setIsEditingDescription(true);
    setNewDescription(postcard.description);
    setTimeout(() => {
      if (descriptionInputRef.current) {
        descriptionInputRef.current.focus();
      }
    }, 100);
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
      toast.success(`Postcard successfully edited!`, {
        position: "top-right",
      });
      setPostcard(response.data.postcard);
    } catch (error) {
      toast.error(`Error when trying to edit the postcard!`, {
        position: "top-right",
      });
      console.error('Error editing postcard:', error);
    } finally {
      setIsEditingTitle(false);
      setIsEditingDescription(false);
    }
  };

  const handleEditSubmit = () => {
    handleSave();
  };

  const handleDelete = async () => {
    if (!admin) return;
    try {
      await axios.delete(`/api/postcard/id?id=${postcardid}`);
      toast.success(`Postcard successfully deleted!`, {
        position: "top-right",
      });
      router.push('/');
    } catch (error) {
      toast.error(`Failed when deleting the postcard.`, {
        position: "top-right",
      });
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

  

  // const performanceValues = [75, 88, 62, 32, 82, 98, 89, 90, 28.2]; 
  
  const performanceValues = [postcard.performance, ...referToPostcards.map(card => card.performance)];
  const dateValues = [...referToPostcards.map(card => card.createdAt)]


  

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        {isEditingTitle ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleSave}
            ref={titleInputRef}
            className="text-3xl font-bold text-center mb-8 text-gray-800 focus:outline-none border-b-2 border-gray-500"
          />
        ) : (
          <h1
            className={`text-3xl font-bold text-center mb-8 text-gray-800 ${admin || owner ? 'cursor-copy' : ''}`}
            onClick={handleTitleClick}
          >
            {postcard.title.toUpperCase()}
          </h1>
        )}
        {postcard ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            {/* <p className="text-gray-800 mb-1 fixed bottom-0 left-3">Postcard ID: {postcard._id}</p> */}
            {/* {postcard.owner && (
              <p className="text-gray-800 mb-1 fixed bottom-5 left-3">
                Owner ID:{' '}
                {postcard.owner.map((owner, index) => (
                  <span key={index}>
                    {index > 0 && ', '}
                    {owner}
                  </span>
                ))}
              </p>
            )} */}

            {isEditingDescription ? (
              <textarea
                value={newDescription}
                onChange={handleDescriptionChange}
                onBlur={handleSave}
                ref={descriptionInputRef}
                className="text-gray-800 w-full h-40 mb-4 resize-none focus:outline-none border-b-2 border-gray-500"
              />
            ) : (
              <div>
                <h2 className='text-xl font-bold mb-4 text-gray-800'>
                  Description:
                </h2>
                <p
                  onClick={handleDescriptionClick}
                  className={`text-gray-800 mb-4 ${admin || owner ? 'cursor-copy' : ''}`}
                >
                  {postcard.description}
                </p>
              </div>
            )}
            {(admin || owner) && privatemessage && postcard.privatemsg && (
              <div className="bg-gray-200 p-4 rounded-md mt-4">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Private Message:</h3>
                <p className="text-gray-800">{postcard.privatemsg}</p>
              </div>
            )}
            {(admin || owner) && postcard.performance && (
              <div className="mt-6">
                {/* <h3 className="text-lg font-bold mb-2 text-gray-800">Performance:</h3> */}
                <PerformanceChart performances={performanceValues}  />
                <p className="text-gray-800 mt-2 mb-4">
                  First Performance Report Created at <strong>{moment(postcard.createdAt).format('MMMM Do YYYY')}</strong>
                </p>
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
            {admin && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded bottom-2 left-2"
              >
                Delete All
              </button>
            )}
          </div>
        ) : (
          <p className="text-xl font-semibold text-center text-gray-800 mt-8">No postcard found.</p>
        )}
        {referToPostcards.length > 0 && (
          <div className="mt-8">
            {referToPostcards.map(refertoPostcard => (
              <div key={refertoPostcard._id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <h1
            className={`text-2xl font-bold text-center mb-2 text-gray-800`}
          >
            {refertoPostcard.title}
          </h1>
          <h1
            className={`text-l italic underline text-center mb-8 text-gray-800`}
          >
            {moment(refertoPostcard.createdAt).format('dddd MM-DD-YYYY').toUpperCase()}
          </h1> 
                <p className="text-gray-800">Title: {refertoPostcard.title}</p>
                <p className="text-gray-800">Description: {refertoPostcard.description}</p>
                {/* <p className="text-gray-800">Owner: {refertoPostcard.owner.join(', ')}</p> */}
                {(admin || owner) && privatemessage && refertoPostcard.privatemsg && (
              <div className="bg-gray-200 p-4 rounded-md mt-4">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Private Message:</h3>
                <p className="text-gray-800">{refertoPostcard.privatemsg}</p>
              </div>
            )}
                <PerformanceChart performances={performanceValues} date={refertoPostcard} />
                <div>
                <p className="text-gray-500 mb-2">
                  <strong>{moment(refertoPostcard.createdAt).format('MMMM-DD-YYYY').toUpperCase()}</strong>
                </p>
                {/* <p className="text-gray-500">
                  <strong>{moment(refertoPostcard.createdAt).format('hh:mm:ss')}</strong>
                </p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* {(admin || owner) && (
        <div className="flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Month Performance
          </button>
        </div>
      )} */}
      <ToastContainer />
    </div>
  );
}
