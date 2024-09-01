import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";


export const likeDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const idUser = req.user.id;
  const {idDestination} = req.body;
  console.log(idUser + idDestination);
  try {
    const user = await prisma.user.findFirst({
        where: {
          id: req.user.id,
          like:{
            some:{
              destinationId: idDestination,
            }
          }
        },
      });
      console.log("🚀 ~ file: likePost.ts:20 ~ like ~ user:", user);
    if (!user) {
    const likeDestination = await prisma.like.create({
        data: {
            user: {
                connect:{
                    id: idUser
                }
            },
            destination: {
                connect: {
                    id: idDestination
                }
            }
        }
    })
    res.json({msg: "like"});
    } else {
      console.log(idDestination);
        const likeDestinationDelete = await prisma.like.findFirst({
            where: {
                userId: idUser,
                destinationId: idDestination,
            }
        })
        console.log(
          "🚀 ~ file: likePost.ts:39 ~ like ~ likeToDelete:",
          likeDestinationDelete
        );
          if (!likeDestinationDelete) {
            throw new Error("Like not found");
          }
          const deleteLike = await prisma.like.delete({
            where: {
              id: likeDestinationDelete.id,
            },
          });
     
          if (deleteLike) {
            return res.status(200).json({ msg: "unlike" });
          }
    }
  } catch (e) {
    next(e);
  }
};
