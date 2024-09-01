import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";


export const getAllDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {

  try {
    const getAllDestination = await prisma.destination.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            location: true,
            images: true,
        }
    })
    res.json(getAllDestination);
  } catch (e) {
    next(e);
  }
};
