import { prisma } from "../config/db.js";
// Test log
const movies = async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
};

export { movies };
