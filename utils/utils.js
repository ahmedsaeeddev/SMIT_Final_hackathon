export const checkAdmin = (req, res, next) => {
    const user = req.user;  // Assuming user is attached to the request object (via middleware like JWT authentication)

    if (user && user.isAdmin) {
        return next();  // Proceed if the user is an admin
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};
