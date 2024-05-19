"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import restrictAccess from '@/helper/restrictAccess';
import settings from '@/lib/settings.json'

const restrictaccess = restrictAccess;

function Navbar() {
  const router = useRouter();

  // useEffect(() => {
  //   restrictaccess;
  // }, [router]);

  // Get the current date
  const currentDate = new Date();
  
  // Extract the day of the month
  const dayOfMonth = currentDate.getDate();
  const allowedDays = settings.allowedDays;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* <Image fill={true} src="images/logodubes.png" alt="Logo"/> */}
      <div className="font-bold text-xl">
        <Link href="/">
          LAPOR 
        </Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          {allowedDays.includes(dayOfMonth) ? (
            <Link href="/new" className="hover:bg-gray-700 px-3 py-2 rounded">
              Add Performance
            </Link>
          ) : (
            <span className="px-3 py-2 rounded bg-gray-600 cursor-not-allowed">Add Performance</span>
          )}
        </li>
        {/* <li>
          <Link href="/about">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact">
            Contact
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
