"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RiAddLine } from 'react-icons/ri'; // Import the plus icon
import restrictAccess from '@/helper/restrictAccess';
import settings from '@/lib/settings.json';
import logodubes from '@/components/logodubes.png';

const restrictaccess = restrictAccess;

function Navbar() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the current date
  const currentDate = new Date();
  
  // Extract the day of the month
  const dayOfMonth = currentDate.getDate();
  const allowedDays = settings.allowedDays;

  return (
    <nav className="bg-gray-800 text-white p-2 flex justify-between items-center">
      <Image src={logodubes} alt="Logo" width={50} height={50} />
      <div className="font-bold text-xl">
        <Link href="/">LAPOR</Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          {allowedDays.includes(dayOfMonth) ? (
            <Link href="/new" className="hover:bg-gray-700 px-3 py-2 rounded">
              {isMobile ? (
                <RiAddLine className="text-3xl font-bold" /> // Adjust the size and weight of the icon
              ) : (
                'Add Performance'
              )}
            </Link>
          ) : (
            <span className="px-3 py-2 rounded bg-gray-600 cursor-not-allowed">
              {isMobile ? (
                <RiAddLine className="text-3xl font-bold" /> // Adjust the size and weight of the icon
              ) : (
                'Add Performance'
              )}
            </span>
          )}
        </li>
        {/* Additional navigation items */}
      </ul>
    </nav>
  );
}

export default Navbar;
