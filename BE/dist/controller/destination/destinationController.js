"use strict";
// src/controller/destinationController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFavorites = exports.deleteFavorites = exports.getIsFavorites = exports.getFavorites = exports.postFavorites = exports.getCommentDestinationById = exports.getDestinationById = exports.getDestinations = exports.addDestination = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addDestination = async (req, res) => {
    try {
        const { name, description, location, image } = req.body;
        const existingDestination = await prisma.destination.findFirst({
            where: {
                name: name,
                location: location,
                description: description,
            },
        });
        if (existingDestination) {
            return res.status(400).json({ error: "Destination already exists" });
        }
        const destination = await prisma.destination.create({
            data: {
                name,
                description,
                location,
                image,
            },
        });
        res.status(200).json({ destination, msg: "add destination successfully" });
    }
    catch (error) {
        res.status(500).json("error");
    }
};
exports.addDestination = addDestination;
const getDestinations = async (req, res) => {
    try {
        const destinations = await prisma.destination.findMany();
        res.json(destinations);
    }
    catch (error) {
        res.status(500).json("error");
    }
};
exports.getDestinations = getDestinations;
const getDestinationById = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const destination = await prisma.destination.findUnique({
            where: {
                id: destinationId,
            },
        });
        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }
        res.json(destination);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getDestinationById = getDestinationById;
const getCommentDestinationById = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const comments = await prisma.commentDestination.findMany({
            where: {
                destinationId: destinationId?.toString(),
            },
            select: {
                id: true,
                comment: true,
                createdAt: true,
                User: {
                    select: {
                        verified: true,
                        imageUri: true,
                        name: true,
                        id: true,
                        userName: true,
                    },
                },
            },
        });
        if (!comments) {
            return res
                .status(404)
                .json({ error: "Comments for the destination not found" });
        }
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCommentDestinationById = getCommentDestinationById;
const postFavorites = async (req, res) => {
    try {
        const { destinationId, userId } = req.body;
        const existingFavorite = await prisma.destinationFavorite.findFirst({
            where: {
                AND: {
                    destinationId: destinationId,
                    userId: userId,
                },
            },
        });
        if (existingFavorite) {
            return res
                .status(400)
                .json({ error: "Destination already added to favorites" });
        }
        const favorite = await prisma.destinationFavorite.create({
            data: {
                destinationId: destinationId,
                userId: userId,
            },
        });
        res.status(200).json(favorite);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.postFavorites = postFavorites;
const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { DestinationFavorite: { include: { Destination: true } } },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const destinationFavorites = user.DestinationFavorite.map((favorite) => favorite.Destination);
        res.json(destinationFavorites);
    }
    catch (error) {
        console.error("Error fetching destination favorites:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getFavorites = getFavorites;
const getIsFavorites = async (req, res) => {
    try {
        const { userId, destinationId } = req.params;
        const favorite = await prisma.destinationFavorite.findFirst({
            where: {
                AND: {
                    destinationId: destinationId,
                    userId: userId,
                },
            },
        });
        if (!favorite) {
            res.status(200).json({ isFavorite: "true" });
        }
        res.status(200).json({ isFavorite: "false" });
    }
    catch { }
};
exports.getIsFavorites = getIsFavorites;
const deleteFavorites = async (req, res) => {
    const { destinationId, userId } = req.body;
    try {
        // Tìm và xóa bản ghi với điều kiện destinationId và userId
        const deletedFavorite = await prisma.destinationFavorite.deleteMany({
            where: {
                destinationId,
                userId,
            },
        });
        if (deletedFavorite.count > 0) {
            return res.status(200).json({ message: "delete success" });
        }
        else {
            return res.status(404).json({ message: "Not found !" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR" });
    }
};
exports.deleteFavorites = deleteFavorites;
const isFavorites = async (req, res) => {
    try {
        const { userId, destinationId } = req.params;
        const destination = await prisma.destination.findUnique({
            where: {
                id: destinationId,
            },
        });
        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }
        const favorite = await prisma.destinationFavorite.findFirst({
            where: {
                AND: {
                    destinationId: destinationId,
                    userId: userId,
                },
            },
        });
        const isFavorite = favorite ? "true" : "false";
        const response = {
            id: destination.id,
            name: destination.name,
            description: destination.description,
            location: destination.location,
            isFavorite: isFavorite,
            image: destination.image,
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.isFavorites = isFavorites;
