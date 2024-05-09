import express, { Request, Response } from "express";
import {MessageController} from "../Controllers/MessageController";
import { MessageBL } from "../BL/MessageBL";
import { MessageRepo } from "../Dal/MessageRepo";

const router = express.Router();
const userController = new MessageController(new MessageBL(new MessageRepo()));
// GET routes
router.post("/getMessages", async (req: Request, res: Response) => await userController.getAllMessages(req, res))

// POST routes
router.post("/addMsg", async (req: Request, res: Response) => await userController.createMessage(req, res))


// PUT routes
// router.put("/:id", async (req: Request, res: Response) => await userController.updateMessage(req, res))

// // DELETE routes
// router.delete("/:id", async (req: Request, res: Response) => await userController.deleteMessage(req, res))


export default router;