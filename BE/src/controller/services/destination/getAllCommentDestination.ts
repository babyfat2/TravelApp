import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const getAllCommentDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const idDestination = req.query.idDestination;
  try {
    const allCommentDestination = await prisma.comment.findMany({
        where: {
            destinationId: idDestination
        },
        select: {
            id: true,
            comment: true,
            User: {
                select: {
                id: true,
                verified: true,
                name: true,
                imageUri: true,
                userName: true,
                }
            },
            createdAt: true,
        }
    });
    console.log("🚀 ~ file: postComment.ts:19 ~ commentPost:", allCommentDestination)
    if (allCommentDestination) return res.json({ msg: "commented", allCommentDestination });
  } catch (e) {
    next(e);
  }
};