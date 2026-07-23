import { prisma } from "../config/db.js";
export const me = async (req, res) => {
    try {
        const userId = req.user;
        if (userId === undefined) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true,
                firstName: true,
            }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
//# sourceMappingURL=user.js.map