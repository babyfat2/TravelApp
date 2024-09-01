"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followStatusEmit = void 0;
const mongodb_1 = require("mongodb");
const init_1 = require("../../lib/mongodb/init");
const followStatusEmit = (id, socket) => {
    try {
        const changeStream = init_1.userCollection.watch([
            {
                $match: {
                    "documentKey._id": new mongodb_1.ObjectId(id),
                },
            },
        ]);
        changeStream.on("change", (change) => {
            if (change.updateDescription?.updatedFields?.followingCount) {
                //console.log(change); // Change object
                socket.emit("following", change?.updateDescription?.updatedFields?.followingCount);
            }
            socket.emit("followers", change?.updateDescription?.updatedFields?.followersCount);
            console.log("🚀", change?.updateDescription?.updatedFields?.followingCount);
        });
    }
    catch (e) { }
};
exports.followStatusEmit = followStatusEmit;
