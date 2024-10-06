const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwt middleware");

    // Check if the authorization header is present
    if (!req.headers['authorization']) {
        return res.status(401).json({ error: "Authorization failed, please login" });
    }

    // Extract token from the authorization header (check for 'Bearer' prefix)
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token missing, authorization failed" });
    }

    try {
        // Verify the token
        const jwtResponse = jwt.verify(token, "userpwd123");
        console.log(jwtResponse);

        // Set the decoded userId in the request object for further use
        req.payload = jwtResponse.userId;

        // Proceed to the next middleware or route handler
        next();
        
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ error: "Invalid token, authorization failed" });
    }
};

module.exports = jwtMiddleware;
