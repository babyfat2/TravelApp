import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";

export const postCommentDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { comment, idDestination } = req.body;

  try {
    const commentDestination = await prisma.comment.create({
      data: {
        comment,
        destinationId: idDestination,
        userId: req.user.id,
      },
    });
    console.log("🚀 ~ file: postComment.ts:19 ~ commentPost:", commentDestination)
    if (comment) return res.json({ msg: "commented", commentDestination });
  } catch (e) {
    next(e);
  }
};
