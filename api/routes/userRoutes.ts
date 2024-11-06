import express, { Request, Response } from "express";
import {UserController} from "../Controllers/UserController";
import {UserBL} from "../BL/UserBLMongo";
import {UserRepo} from "../Dal/UserRepoMongo";

const router = express.Router();
const userController = new UserController(new UserBL(new UserRepo()));
// GET routes
router.get("/", async (req: Request, res: Response) => await userController.getAllUsers(req, res))
router.get("/contacts/:_id", async (req: Request, res: Response) => await userController.getAllUsers(req, res))
router.get("/:_id", async (req: Request, res: Response) => await userController.getUserById(req, res))

// POST routes
router.post("/register", async (req: Request, res: Response) => await userController.createUser(req, res))
router.post("/login", async (req: Request, res: Response) => await userController.loginUser(req, res))
// router.post("/google", async (req: Request, res: Response) => await userController.loginWithGoogle(req, res))

// PUT routes
router.put("/:_id", async (req: Request, res: Response) => await userController.updateUser(req, res))
router.put("/setAvatar/:id", async (req: Request, res: Response) => await userController.updateUser(req, res))

// DELETE routes
router.delete("/:_id", async (req: Request, res: Response) => await userController.deleteUser(req, res))


export default router;