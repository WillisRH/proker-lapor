const jwt = require('jsonwebtoken');

export const getDataFromToken = (request) => {
    try {
        // Retrieve the token from the cookies
        const token = request.cookies.get("token")?.value || '';

        // Verify and decode the token using the secret key
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Return the decoded token data
        return decodedToken;
    } catch (error) {
        throw new Error(error.message);
    }
};
