import { messageModel, messageSchema } from "../Models/Message";
import { IMessageRepo } from "../utils/interfaces/IMessageRepo";

export class MessageRepo implements IMessageRepo<typeof messageSchema> {
  async getAllMessages(
    sender: string,
    receiver: string
  ): Promise<(typeof messageSchema)[] | unknown> {
    try {
      // return all messages for the sender and receiver
      const messages = await messageModel
        .find({
          "message.users": { $all: [sender, receiver] },
        })
        .sort({ updatedAt: 1 });
      if (!messages) {
        throw new Error("No Messages Found");
      }
      console.log(messages.length, " Messages Found => ", messages.slice(0, 3));
      const convertedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.message?.sender === sender,
          message: msg.message?.text,
        };
      });
      return convertedMessages;
    } catch (error) {
      throw error;
    }
  }

  async createMessage(
    text: string,
    users: Array<string>,
    sender: string
  ): Promise<typeof messageSchema | unknown> {
    try {
      const data = await messageModel.create({
        message: { text: text, users: users, sender: sender },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

type Msg = {
  text: string;
  users: Array<number>;
  sender: number;
  date: Date;
};

