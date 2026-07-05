import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is missing",
            });
        }
        let decode;
        try {
            decode = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ success: false, message: "Token expired" });
            }
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        if (!decode) {
            return res.status(400).json({
                success: false,
                message: "Token expired",
            });
        }
        if (!decode.userId) {
            return res.status(400).json({
                success: false,
                message: "UserId is missing",
            });
        }
        req.user = decode.userId;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
//# sourceMappingURL=auth.js.map