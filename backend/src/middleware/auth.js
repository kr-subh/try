import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        let token;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided (via Bearer header or cookie)."
            });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;


        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please login again."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token. Authentication failed.",
            error: error.message
        });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User information not found."
            });
        }


        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Role '${req.user.role}' is not authorized to access this route. Allowed roles: ${allowedRoles.join(", ")}`
            });
        }

        next();
    };
};

export default auth;
export { auth, authorizeRoles };
