import express, { Request, Response } from "express";
import { PasswordController } from "../Controllers/PasswordController";
import { PasswordBL } from "../BL/PasswordBL";
import { PasswordRepo } from "../Dal/PasswordRepo";

const router = express.Router();

const passwordController = new PasswordController(new PasswordBL( new PasswordRepo()));
// GET routes
router.get("/:id", async (req: Request, res: Response) => await passwordController.getPassword(req, res))
router.get("/getAll/:userID", async (req: Request, res: Response) => await passwordController.getAllPasswordOfUser(req, res))

// POST routes
router.post("/", async (req: Request, res: Response) => await passwordController.addPassword(req, res))
router.post("/decrypt", async (req: Request, res: Response) => await passwordController.decryptPassword(req, res))

// PUT routes
router.put("/:id", async (req: Request, res: Response) => await passwordController.updatePassword(req, res))

// // DELETE routes
router.delete("/:id", async (req: Request, res: Response) => await passwordController.deletePassword(req, res))


export default router;