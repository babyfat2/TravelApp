import prisma from "../../../lib/prisma/init";
import { NextFunction, Request, Response } from "express";

export const getDestinationLikeByUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const {id}= req.user
  try {
    const destinations = await prisma.destination.findMany({
      where:{
        likes: {
            some: {
                userId: id,
            }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        images: true,
    }
    })
    if (destinations) {
      return res.json(destinations);
    }
    throw new Error("Error in trying get posts");
  } catch (e) {
    next(e);
  }
};
