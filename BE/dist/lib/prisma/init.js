"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const prisma = new PrismaClient({
//   log: config.stage === "local" ? [] : ["error"],
// });
exports.default = prisma;
