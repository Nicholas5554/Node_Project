import { verifyToken } from "../services/auth.service.js";

export const auth = async (req, res, next) => {

    try {
        const tokenFromClient = req.headers["x-auth-token"];
        const userInfo = verifyToken(tokenFromClient);

        if (!userInfo || !tokenFromClient) {
            throw new Error("Authentication Error : unauthorize user");
        }
        req.user = userInfo;
        next();

    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};