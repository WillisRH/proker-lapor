import moment from 'moment';
import Link from 'next/link';
import { BsFillPinAngleFill } from 'react-icons/bs'; 
import { GiCactus } from 'react-icons/gi';
import { FaReact } from 'react-icons/fa';
import { GiButterflyFlower } from 'react-icons/gi';

function Postcard({ title, description, id, createdat }) {
  const MAX_DESCRIPTION_LENGTH = 100;

  let shortDescription = description; 

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    shortDescription = description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
  }

  const colors = [
    'bg-[#cccbd9]',
    'bg-[#80778a]',
    'bg-[#998ba2]',
    'bg-[#c2b1c3]',
    'bg-[#e0c9db]',
    'bg-[#e5e4f2]',
    'bg-[#e7a5a4]',
    'bg-[#deb5bb]',
    'bg-[#d8ad9c]',
    'bg-[#edc8b3]',
    'bg-[#b29790]',
    'bg-pink-200', 
    'bg-yellow-200', 
    'bg-green-200',
    'bg-blue-200',
    'bg-indigo-200',
    'bg-purple-200',
    'bg-gray-200'
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  const cardColor = colors[randomIndex];

  // Determine if an icon should be displayed (5 in 10 chance)
  const showIcon = Math.random() < 0.5;
  const icons = [BsFillPinAngleFill, GiCactus, FaReact, GiButterflyFlower];
  const randomIconIndex = Math.floor(Math.random() * icons.length);
  const SelectedIcon = icons[randomIconIndex];

  return (
    <Link href={`/postcard/${id}`}>
      <div className={`relative border border-gray-200 p-4 rounded-md w-72 ${cardColor} transition-transform hover:scale-105 hover:shadow-xl`}>
        <h2 className="font-bold text-lg mb-2 text-black">{title.toUpperCase()}</h2>
        <p className="text-black">{shortDescription}</p> {/* Display the shortened description */}
        {showIcon && (
          <div className="absolute top-2 right-2 text-black">
            <SelectedIcon size={24} /> {/* Adjust the size as needed */}
          </div>
        )}
        {/* <h3 className="font-italic left-10 m-4 px-4 py-2 text-black">{moment(createdat).format('MMMM Do YYYY, h:mm:ss a')}</h3> */}
      </div>

      
    </Link>
  );
}

export default Postcard;
