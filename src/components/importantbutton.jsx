import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function ImportantButton() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  const goToManage = () => {
    router.push('/manage');
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="fixed bottom-0 left-0 m-4">
      <button onClick={togglePopup} className="px-4 py-2 bg-gray-700 text-white rounded">
        <FontAwesomeIcon icon={faBars} />
      </button>

      {showPopup && (
        <div className="absolute bottom-14 left-0 bg-white shadow-lg rounded p-2">
          <button onClick={logout} className="w-full mb-2 px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
          <button onClick={goToProfile} className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded">
            Profile
          </button>
          <button onClick={goToManage} className="w-full px-4 py-2 bg-green-500 text-white rounded">
            Manage
          </button>
        </div>
      )}
    </div>
  );
}
