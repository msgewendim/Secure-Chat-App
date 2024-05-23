import mongoose from "mongoose";
class Password {
  password: string;
  userID: string;
  name: string;
  constructor(password: string, userID: string, name: string) {
    this.password = password;
    this.userID = userID;
    this.name = name;
    
  }
}

const PasswordSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const passwordModel = mongoose.model("Password", PasswordSchema, "passwords");

export default Password;
