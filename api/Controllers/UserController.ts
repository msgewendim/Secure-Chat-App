import { Request, Response } from "express";
import { UserBL } from "../BL/UserBL";

export class UserController {
  private userBL : UserBL
  constructor(userBL : UserBL) {
    this.userBL = userBL
  } 
  
  async getAllUsers(req: Request, res: Response) {
    try{
      const id = +req.params.id
      const users = await this.userBL.getAllUsers(id);
      if(users.length === 0){
        res.status(200).json({ message : "Users Not Found In Database"})
      }
      res.status(200).json(users);
    }catch(error){
      res.status(404).json((error as Error).message);
    }
  }

  async createUser(req: Request, res: Response) {
    try{
      const newUser = req.body;
      const user = await this.userBL.createUser(newUser);
      res.status(201).json({message : "User Created Successfully", user});
    }catch(error){
      res.status(400).json((error as Error).message);
    }
  }

  async updateUser(req: Request, res: Response) {
    try{
      const updatedUserData = req.body;
      const id = +req.params.id
      const user = await this.userBL.updateUser(id, updatedUserData);
      res.status(200).json({message : "User Updated Successfully", user});
    } catch(error){
      res.status(400).json((error as Error).message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = +req.params.id
      await this.userBL.deleteUser(id);
      res.status(200).json({message : "User Deleted Successfully"});
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async getUserById(req: Request, res: Response) {  
    try{
      const id = +req.params.id
      const user = await this.userBL.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json((error as Error).message);
    } 
  }

  async loginUser(req: Request, res: Response) {
    try{
      const {email, password} = req.body;
      const user = await this.userBL.loginUser(email, password);
      res.status(200).json({message : "Login Successful", user});
    } catch(error){
      res.status(400).json({message : (error as Error).message });
    }
  }

  async loginWithGoogle(req: Request, res: Response) {
    try{
      const {credential} = req.body;
      const user = await this.userBL.loginWithGoogle(credential);
      res.status(200).json({message : "Login Successful", user});
    } catch(error){
      res.status(400).json({message : (error as Error).message });
    }
  }
}
  