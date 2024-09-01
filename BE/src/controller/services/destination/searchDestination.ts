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

    const destination = await prisma.destination.findMany({
      where: {
        OR: [
          { name: { contains: q?.toString(), mode: "insensitive" } },

          { location: { contains: q?.toString(), mode: "insensitive" } },
        ],
      },
      take: 15,
    });

    if (destination) {
      return res.status(200).json({ destination });
    }
    res.status(404).json({ destination: [], msg: "Not Found" });
  } catch (e) {
    next(e);
  }
};
