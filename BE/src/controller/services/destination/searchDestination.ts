import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getSearchDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { q } = req.query;
  console.log("🚀 ~ file: searchDestination.ts:10 ~ q:", q);

  try {
    if (!q || q.toString().trim() === "") {
      const allDestinations = await prisma.destination.findMany({});

      return res.status(200).json({ allDestinations });
    }

    const Destinations = await prisma.destination.findMany({
      where: {
        OR: [
          { name: { contains: q?.toString(), mode: "insensitive" } },

          { location: { contains: q?.toString(), mode: "insensitive" } },
        ],
      },
      take: 15,
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        images: true,
    }
    });

    if (Destinations) {
      return res.status(200).json({ Destinations });
    }
    res.status(404).json({ Destinations: [], msg: "Not Found" });
  } catch (e) {
    next(e);
  }
};
