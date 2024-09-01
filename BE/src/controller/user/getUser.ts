import { Response, NextFunction } from "express";
import prisma from "../../lib/prisma/init";

export const getUser = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req?.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        followers: true,
        userName: true,
        id: true,
        followersCount: true,
        followingCount: true,
        email: true,
        following: true,
        verified: true,
        imageUri: true,
        emailIsVerified: true,
      },
    });
    if (user) {
      const {
        email,
        userName,
        imageUri,
        emailIsVerified,
        name,
        id,
        verified,
        followersCount,
        followingCount,
      } = user;
      return res.status(200).send({
        data: {
          email,
          userName,
          imageUri,
          emailIsVerified,
          verified,
          name,
          id,
          followersCount: followersCount?.toString(),
          followingCount: followingCount?.toString(),
        },
      });
    }
    res.status(404).json({ msg: "user does not exist" });
  } catch (e) {
    next(e);
  }
};
