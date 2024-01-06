import express from "express";
import UserController from "../controllers/userController";
import { authenticateToken } from "../middleware/authentication";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user registration and login
 */

/**
 * @swagger
 *   /register:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         201:
 *           description: User registered successfully
 *         400:
 *           description: Bad request or missing required fields
 *         500:
 *           description: Internal server error
 */
router.post("/register", UserController.registerUser);

/**
 * @swagger
 *   /login:
 *     post:
 *       summary: Login as a user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the user
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: The password of the user
 *             example:
 *               email: "john.doe@example.com"
 *               password: "securepassword"
 *       responses:
 *         200:
 *           description: User logged in successfully, returns JWT token
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     description: JWT token for authentication
 *         400:
 *           description: Bad request or missing required fields
 *         401:
 *           description: Invalid email or password
 *         500:
 *           description: Internal server error
 */
router.post("/login", UserController.loginUser);

/**
 * @swagger
 *   /user:
 *     get:
 *       summary: Get user details
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Returns user details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserResponse'
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Internal server error
 */
router.get("/user", authenticateToken, UserController.getUserDetails);

export default router;
