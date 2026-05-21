import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;
  const movie = await prisma.movie.findUnique({ where: { id: movieId } });
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  const watchListItemExists = await prisma.watchListItem.findUnique({
    where: {
      // The combination is unique:
      // For this check we have to add this line to schema: @@unique([userId, movieId])
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });
  if (watchListItemExists) {
    return res.status(400).json({ error: "Movie already in the watch List" });
  }
  const watchListItem = await prisma.watchListItem.create({
    data: {
      userId,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      watchListItem,
    },
  });
};

export { addToWatchList };
