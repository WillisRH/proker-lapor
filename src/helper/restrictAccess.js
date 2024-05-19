import settings from '@/lib/settings.json'; // Adjust the path according to your project structure

const restrictAccess = (router) => {
  // Get the current date
  const currentDate = new Date();
  
  // Extract the day of the month
  const dayOfMonth = currentDate.getDate();
  
  // Get the allowed days from settings.json
  const allowedDays = settings.allowedDays;
  
  // Check if the current day is in the allowed days
  if (!allowedDays.includes(dayOfMonth)) {
    // If it's not an allowed day, redirect to the home page
    router.push('/');
  }
};

export default restrictAccess;
