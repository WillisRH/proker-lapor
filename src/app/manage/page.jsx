"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ImportantButton from '@/components/importantbutton';
import { isAdmin } from '@/helper/isAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManagePage() {
  const [settings, setSettings] = useState({
    allowedDays: [],
    visibleToVerifiedUser: false,
    disabledecoration: false,
    privateMessage: false,
  });
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin();
      if (!admin) {
        router.push('/');
        return;
      }
      setIsAdminUser(true);
      fetchSettings();
    };
    checkAdmin();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const updateSettings = async () => {
    try {
      await axios.post('/api/settings', settings);
      toast.success('Settings updated successfully!', {
        position: "top-right",
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast.error('Failed to update settings!', {
        position: "top-right",
      });
    }
  };

  const goToManageUser = () => {
    router.push('/manage/users');
  };

  const addAllowedDay = () => {
    setSettings({ ...settings, allowedDays: [...settings.allowedDays, ""] });
  };

  const removeAllowedDay = (index) => {
    const newAllowedDays = settings.allowedDays.filter((_, i) => i !== index);
    setSettings({ ...settings, allowedDays: newAllowedDays });
  };

  const handleAllowedDayChange = (index, value) => {
    const newAllowedDays = settings.allowedDays.map((day, i) => (i === index ? Number(value) : day));
    setSettings({ ...settings, allowedDays: newAllowedDays });
  };

  if (!isAdminUser) return null;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center py-2">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-black">Manage Settings</h1>
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); updateSettings(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Allowed Days
                </label>
                {settings.allowedDays.map((day, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={day}
                      onChange={(e) => handleAllowedDayChange(index, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                    />
                    <button
                      type="button"
                      onClick={() => removeAllowedDay(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAllowedDay}
                  className="mt-2 py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Day
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Visible to Verified Users
                </label>
                <select
                  value={settings.visibleToVerifiedUser}
                  onChange={(e) => setSettings({ ...settings, visibleToVerifiedUser: e.target.value === 'true' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Disable Decoration
                </label>
                <select
                  value={settings.disabledecoration}
                  onChange={(e) => setSettings({ ...settings, disabledecoration: e.target.value === 'true' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Private Message
                </label>
                <select
                  value={settings.privateMessage}
                  onChange={(e) => setSettings({ ...settings, privateMessage: e.target.value === 'true' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
