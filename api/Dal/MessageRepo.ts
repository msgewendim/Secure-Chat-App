import { messageModel, messageSchema } from "../Models/Message";
import { IMessageRepo } from "../utils/interfaces/IMessageRepo";

export class MessageRepo implements IMessageRepo<typeof messageSchema> {
  async getAllMessages(
    sender: number,
    receiver: number
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
      console.log("Messages Found", messages.length);
      console.log("Messages Found Array", messages.slice(0, 3));
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
    users: Array<number>,
    sender: number
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

// async getAllMessages(sender: number, receiver: number): Promise<typeof messageSchema[] | unknown> {
//   const result = await messageModel.find({users: [sender, receiver]}).sort({date: -1})
//   if(!result) {
//     throw new Error("No Messages Found")
//   }
//   console.log("Messages Found", result.length);
//   console.log("Messages Found Array", result);
//   return result
// }
// async getAllMessages(sender: number, receiver: number): Promise<Msg[]> {
//   const query = 'SELECT * FROM messages WHERE users = $1 ORDER BY date DESC';
//   const { rows } = await pool.query(query, [sender, receiver]);
//   return rows;
// }
// async createMessage(messageData: Msg): Promise<Msg | undefined> {
//   const { text, users, sender} = messageData;
//   const query = 'INSERT INTO messages(message, users, sender) VALUES ($1, $2, $3) RETURNING *';
//   const {rows} = await pool.query(query, [text, users, sender]);
//   console.log("New message received", rows[0])
//   return rows[0]
// }

// }
