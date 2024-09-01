"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountValidator = exports.updateDataValidator = exports.followerFollowingValidator = exports.notifIdValidator = exports.getCommentValidator = exports.postCommentValidator = exports.likeValidator = exports.getPostsValidator = exports.searchValidator = exports.followValidator = exports.addDesValidator = exports.createPostValidator = exports.loginValidation = exports.signupValidation = void 0;
const express_validator_1 = require("express-validator");
exports.signupValidation = [
    (0, express_validator_1.body)("name")
        .exists()
        .withMessage("Name field is required.")
        .isString()
        .withMessage("Name field must be a string.")
        .isLength({ max: 100, min: 2 })
        .withMessage("Name must be between 2 and 15 characters long."),
    (0, express_validator_1.body)("userName")
        .custom((value) => {
        if (value.includes(" ")) {
            throw new Error("Spaces are not allowed in the input.");
        }
        return true;
    })
        .exists()
        .withMessage("UserName field is required.")
        .isString()
        .withMessage("UserName field must be a string.")
        .isLength({ max: 20, min: 1 })
        .withMessage("UserName must be between 2 and 15 characters long."),
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("Email field is required.")
        .isEmail()
        .withMessage("Invalid email address."),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password field is required.")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols."),
];
exports.loginValidation = [
    (0, express_validator_1.body)("userName")
        .exists()
        .withMessage("User Name field is required.")
        .isString()
        .withMessage("Invalid user name"),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password field is required.")
        .isLength({ max: 15, min: 2 })
        .withMessage("Password must be between 2 and 15 characters long."),
];
exports.createPostValidator = [
    (0, express_validator_1.body)("user").optional().isMongoId().withMessage("Invalid user ID"),
    (0, express_validator_1.body)(["photo"]).custom((value, { req }) => {
        if (req.body.photo || req.body.postText) {
            return true;
        }
        throw new Error("Either photo URIs must be provided");
    }),
    (0, express_validator_1.body)("photo")
        .optional()
        .isObject()
        .withMessage("Photo must be an object")
        .bail()
        .custom((value) => {
        if (!value.uri || !value.height || !value.width) {
            throw new Error("Incomplete or malformed object");
        }
        if (typeof value.uri !== "string" ||
            typeof value.height !== "number" ||
            typeof value.width !== "number") {
            throw new Error("Either uri isn't a string or height isn't a string or width isn't a string");
        }
        return true;
    })
        .withMessage("Photo Uri must be an array of URI"),
    (0, express_validator_1.body)("postText")
        .optional()
        .isString()
        .withMessage("Post text must be a string"),
];
exports.addDesValidator = [
    (0, express_validator_1.query)("id").exists().isMongoId().withMessage("Not valid Id"),
];
exports.followValidator = [
    (0, express_validator_1.query)("id").exists().isMongoId().withMessage("Not valid Id"),
];
exports.searchValidator = [
    (0, express_validator_1.query)("q").exists().isString().withMessage("query cannot be empty"),
];
exports.getPostsValidator = [
    (0, express_validator_1.query)("take").exists().isNumeric().withMessage("produce posts to take"),
    (0, express_validator_1.query)("skip").exists().isNumeric().withMessage("produce skip to take"),
];
exports.likeValidator = [
    (0, express_validator_1.query)("id").exists().isMongoId().withMessage("Not valid Id"),
];
exports.postCommentValidator = [
    (0, express_validator_1.body)("id").exists().isMongoId().withMessage("Not valid Id"),
    (0, express_validator_1.body)("comment").exists().isString().withMessage("Comment must be valid"),
];
exports.getCommentValidator = [
    (0, express_validator_1.query)("id").exists().isMongoId().withMessage("Not valid Id"),
];
exports.notifIdValidator = [
    (0, express_validator_1.query)("notificationId").exists().withMessage("Not valid Id"),
];
exports.followerFollowingValidator = [
    (0, express_validator_1.query)("take").exists().isNumeric().withMessage("produce posts to take"),
    (0, express_validator_1.query)("skip").exists().isNumeric().withMessage("produce skip to take"),
];
exports.updateDataValidator = [
    (0, express_validator_1.body)("password").exists().isString().withMessage("invalid password"),
    (0, express_validator_1.body)(["userName", "newPassword", "name"]).custom((value, { req }) => {
        console.log(req.body);
        if (req.body.userName && !req.body.name && !req.body.newPassword) {
            return true;
        }
        else if (!req.body.userName && req.body.name && !req.body.newPassword) {
            return true;
        }
        else if (!req.body.userName && !req.body.name && req.body.newPassword) {
            return true;
        }
        throw new Error("Either userName | newPassword | name is needed");
    }),
];
exports.deleteAccountValidator = [
    (0, express_validator_1.body)("password").exists().isString().withMessage("invalid password"),
];
