import { MessageRepo } from "../Dal/MessageRepo"
import Msg, { messageSchema } from "../Models/Message"

export class MessageBL {

  private messageRepo : MessageRepo

  constructor(messageRepo : MessageRepo) {
    this.messageRepo = messageRepo  
  }

  async getAllMessages(sender: string, receiver: string): Promise<typeof messageSchema[] | unknown> {
    try {
      const result = this.messageRepo.getAllMessages(sender, receiver)
      if(!result) {
        throw new Error("No Messages Found")
      }
      return result
    } catch (error) {
      throw error
    }
  } 
  
  async createMessage(sender : string, receiver : string, message : string): Promise<typeof messageSchema | unknown> {
    try {
      // send to db for storage
      const createdMessage = await this.messageRepo.createMessage(message , [sender, receiver], sender)
      if (!createdMessage) {
        throw new Error("Message Not Created");
      }
      console.log("Message Created - BL", createdMessage)
      return createdMessage
    } catch (error) {
      throw error
    }
  }
}

