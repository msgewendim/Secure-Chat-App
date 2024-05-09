import { Request, Response, text } from "express";
import { MessageBL } from "../BL/MessageBL";
export class MessageController {
  private messageBL: MessageBL;
  constructor(messageBL: MessageBL) {
    this.messageBL = messageBL;
  }

  async getAllMessages(req: Request, res: Response) {
    try {
      const { sender, receiver } = req.body;
      const messages = await this.messageBL.getAllMessages(sender, receiver);
      // if (result === 0) {
      //   res.status(200).json({ message: "No Messages Found" });
      // }
      res.status(200).json({ message: "Messages Fetched Successfully", messages });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message, error });
    }
  }
  
  async createMessage(req: Request, res: Response) {
    try {
      const { sender , receiver, message } = req.body;
      const result = await this.messageBL.createMessage(sender as number, receiver as number, message as string);
      res
        .status(201)
        .json({ message: "Message Created Successfully",  result});
    } catch (error) {
      res.status(400).json({ message: (error as Error).message, error });
    }
  }
}
