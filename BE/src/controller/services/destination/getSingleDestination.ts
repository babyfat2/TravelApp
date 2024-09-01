import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";


export const getSingleDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const idDestination = req.query.idDestination;
  try {
    const getSingleDestination = await prisma.destination.findUnique({
        where: {
            id: idDestination,
        },
        select: {
          name: true,
          description: true,
          location: true,
          images: {
            where: {
              destinationId: idDestination,
            }
          },
          likes: {
            where: {
              userId: req.user.id
            },
            select: {
              id: true,
            }
          }
        }
    })
    res.json(getSingleDestination);
  } catch (e) {
    next(e);
  }
};
