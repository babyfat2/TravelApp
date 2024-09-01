"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
    req.session.destroy();
    res.json({ msg: "done" });
};
exports.logout = logout;
