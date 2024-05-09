import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      users: Array<number>,
      sender: {
        type: Object,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  
  }
);

export default class Msg {
  text : string
  users: Array<number>
  sender: number
  date : Date
  constructor(text : string, users: Array<number>, sender: number) {
    this.text = text
    this.users = users
    this.sender = sender
    this.date = new Date()
  }
}

export const messageModel =  mongoose.model("Message", messageSchema, "messages");