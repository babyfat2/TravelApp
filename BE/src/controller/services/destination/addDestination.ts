import { NextFunction, Response } from "express";
import prisma from "../../../lib/prisma/init";


export const addDestination = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
    const {name, description, location} = req.body;
    try {
    const getAllDestination = await prisma.destination.create({
        data: {
            name: name,
            description: description,
            location: location,
        }        
    })
    console.log( "Create Destination seccess");
    res.json(getAllDestination);
  } catch (e) {
    next(e);
  }
};
