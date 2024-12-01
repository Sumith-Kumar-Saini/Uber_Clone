import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { body } from "express-validator";

const router = Router();

/**
 * Route for user registration.
 * Validates request body for email, fullname, and password.
 */
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullName.lastName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isStrongPassword({ minLength: 8 })
      .withMessage(
        "Password must be required and minimum length is 8 characters"
      ),
  ],
  UserController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage(
        "Password must be required and minimum length is 8 characters"
      ),
  ],
  UserController.loginUser
);

/**
 * Route for fetching all users.
 */
router.get("/", UserController.getUsers);

export default router;
