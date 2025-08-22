import jwt from "jsonwebtoken";
export default function authMiddleware(req, res, next) {
    try {
        // @ts-ignore
        const authHeader = req.get('authorization');
        if (!authHeader) {
            return res.status(403).json({
                message: "no auth header"
            });
        }
        const token = authHeader.split(' ')[1]; // auth-header: "Bearer token"
        if (!token) {
            return res.status(403).json({
                message: "no token"
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.json({
                message: "no jwt secret"
            });
        }
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        console.log("server error > ", e);
        return res.status(500).json({
            message: "internal server error!!"
        });
    }
}
//# sourceMappingURL=authMiddleware.js.map