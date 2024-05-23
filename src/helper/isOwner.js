import { getUserData } from "./get";

export const isOwner = async (_id) => {
    try {
        const userid = await getUserData('_id');

        if (_id === userid) {
            console.log("isowner", userid)
            return true;
        }
        
        return false;
    } catch (error) {
        console.error("Failed to get admin status:", error.message);
        return false; 
    }
};
