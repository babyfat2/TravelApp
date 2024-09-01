"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const express_validator_1 = require("express-validator");
const errorFormatter = ({ location, msg, param, value, nestedErrors, }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${location}[${param}]: ${msg}`;
};
const handleErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log({ errors: errors.array() });
        res.status(400).json(errors);
    }
    else {
        next();
    }
};
exports.handleErrors = handleErrors;
