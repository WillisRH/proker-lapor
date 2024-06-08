"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/helper/isAdmin';
import Link from 'next/link';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        router.push("/");
        return;
      }
      fetchUsers();
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  const updateUser = async (id, updates) => {
    try {
      await axios.put('/api/users', { id, ...updates });
      setUsers(users.map(user => user._id === id ? { ...user, ...updates } : user));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 text-black">
        <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">Username</th>
                  <th className="py-2 px-4 border-b border-gray-200">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200">Verified</th>
                  <th className="py-2 px-4 border-b border-gray-200">Admin</th>
                  <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.isVerified ? 'Yes' : 'No'}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => updateUser(user._id, { isVerified: !user.isVerified })}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      >

                        {user.isVerified ? 'Unverify' : 'Verify'}
                      </button>
                      <button
                        onClick={() => updateUser(user._id, { isAdmin: !user.isAdmin })}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
