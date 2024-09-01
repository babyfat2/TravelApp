"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.DATABASE_URL;
// Replace the following with the specified user you want to monitor changes for
const client = new mongodb_1.MongoClient(uri);
exports.userCollection = client.db().collection("User");
