const { default: axios } = require("axios");

export const isAdmin = async () => {
    try {
        const res = await axios.get('/api/users/me');
        const userData = res.data.data;
        console.log("User Data:", userData);

        // Check if the user is an admin
        const isAdmin = userData.isAdmin;
        console.log("Is Admin:", isAdmin);
        
        return isAdmin;
    } catch (error) {
        console.error("Failed to get admin status:", error.message);
        return false; // Return false if there's an error
    }
};
