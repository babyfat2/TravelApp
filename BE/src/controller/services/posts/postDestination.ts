import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";
import validator from "validator";
import ogs from "open-graph-scraper";
import expo from "../../../lib/expo/init";
import { handleNotificationsForPosts } from "../../../modules/handleNotifications/forPosts";

export const postDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const {
    id,
    name,
    description,
    location,
  }: {
    id: string;
    name: string;
    description: string;
    location: string;
  } = req.body;

  // TODO: add destination
  const newDestination = await prisma.destination.create({
    data: {
      name,
      description,
      location,
    },
  });

  if (newDestination) {
    return res.status(200).json({ msg: "new Destination created" });
  }
  return res.status(400).json({ msg: "error" });
};
