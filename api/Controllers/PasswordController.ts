import { Request, Response } from "express";
import { PasswordBL } from "../BL/PasswordBL";
import { decrypt } from "../utils/middlewares/crypto";
import Password from "../Models/Password";

export class PasswordController {
  private passwordBL: PasswordBL;

  constructor(passwordBL: PasswordBL) {
    this.passwordBL = passwordBL;
  }
  async getAllPasswordOfUser(req: Request, res: Response) {
    try {
      const userId = req.params.userID;
      const page = req.query.page;
      const parsedPage = parseInt(page as string);
      const passwords = await this.passwordBL.getAllPasswordOfUser(
        userId,
        parsedPage
      );
      if (passwords.length === 0) {
        res.status(200).json({ message: "Passwords Not Found In Database" });
      }else{
      res.status(200).json({    
        message: "Passwords Fetched Successfully",
        passwords: passwords,
      });
    }
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getPassword(req: Request, res: Response) {
    try {
      const id = req.params._id;
      const password = await this.passwordBL.getPassword(id);
      res.status(200).json({
        message: "Password Fetched Successfully",
        password: password === null ? "Password Not Found" : password,
      });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async addPassword(req: Request, res: Response) {
    try {
      const passwordData : Password = req.body;
      console.log(passwordData);
      const password = await this.passwordBL.addPassword(passwordData);
      res
        .status(200)
        .json({ message: "Password Added Successfully", password });
    } catch (error) {
      console.log((error as Error).message);
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const id = req.params._id;
      const passwordData = req.body;
      const password = await this.passwordBL.updatePassword(id, passwordData);
      res
        .status(200)
        .json({ message: "Password Updated Successfully", password });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async deletePassword(req: Request, res: Response) {
    try {
      const id = req.params._id;
      const password = await this.passwordBL.deletePassword(id);
      res
        .status(200)
        .json({ message: "Password Deleted Successfully", password });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  decryptPassword(req: Request, res: Response) {
    try {
      const passwordData = req.body;
      const decryptedPassword = decrypt(
        passwordData.password,
        this.passwordBL.key
      );
      res.status(200).json({
        message: "Password Decrypted Successfully",
        password: decryptedPassword,
      });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
