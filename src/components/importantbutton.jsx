import axios from "axios";
import { useRouter } from "next/navigation";


export default function ImportantButton() {
    const router = useRouter();
    const logout = async () => {
        try {
          await axios.get('/api/users/logout');
          router.push('/login');
        } catch (error) {
          console.log(error.message);
        }
      };

      const goToProfile = () => {
        // Implement your navigation to the profile page here
        router.push('/profile');
      };

    return (

        <div>
            <button onClick={logout} className="fixed bottom-0 left-0 m-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
      <button onClick={goToProfile} className="fixed bottom-12 left-0 m-4 px-4 py-2 bg-blue-500 text-white rounded">
          Profile
        </button>
        </div>

    )


}