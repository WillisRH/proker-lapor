import Link from 'next/link';

function Postcard({ title, description, id }) {
  const MAX_DESCRIPTION_LENGTH = 100;

  let shortDescription = description; 

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    shortDescription = description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
  }

  const colors = [
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

  return (
    <Link href={`/postcard/${id}`}>
    
        <div className={`border border-gray-200 p-4 rounded-md w-72 ${cardColor} transition-transform hover:scale-105 hover:shadow-xl`}> 
          <h2 className="font-bold text-lg mb-2">{title}</h2>
          <p className="text-gray-600">{shortDescription}</p> {/* Display the shortened description */}
        </div>
    
    
    </Link>
  );
}

export default Postcard;
