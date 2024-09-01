import { Router } from "express";

import {
  loginValidation,
  signupValidation,
} from "../../middleware/validation/inputValidation";
import { createUser } from "../../controller/auth/createUser";
import { loginUser } from "../../controller/auth/loginUser";
import { handleErrors } from "../../middleware/validation/handleErrors";
const router = Router();

router.get("/", (req, res) => {
  res.send("auth is ok");
});
router.post("/login", loginValidation, handleErrors, loginUser);
router.post("/register", signupValidation, handleErrors, createUser);

export default router;
