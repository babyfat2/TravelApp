"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inputValidation_1 = require("../../middleware/validation/inputValidation");
const createUser_1 = require("../../controller/auth/createUser");
const loginUser_1 = require("../../controller/auth/loginUser");
const handleErrors_1 = require("../../middleware/validation/handleErrors");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("auth is ok");
});
router.post("/login", inputValidation_1.loginValidation, handleErrors_1.handleErrors, loginUser_1.loginUser);
router.post("/register", inputValidation_1.signupValidation, handleErrors_1.handleErrors, createUser_1.createUser);
exports.default = router;
