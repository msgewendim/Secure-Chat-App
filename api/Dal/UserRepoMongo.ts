import { FilterQuery } from "mongoose";
import { UserMongo, mongooseResult, userModel } from "../Models/User";
import { IUserRepo } from "../utils/interfaces/IUserRepo";

export class UserRepo implements IUserRepo<UserMongo> {
  async getAllUsers(id?: string): Promise<UserMongo[]> {
    const users = (await userModel.find({}).select("-password")) as UserMongo[];
    console.log(users.length, "get all users from REPO");
    return users;
  }
  async getUserById(id: string): Promise<UserMongo> {
    const user = (await userModel
      .findById(id)
      .select("-password")) as UserMongo; // Exclude password from response
    console.log(user, "get user by id from REPO");
    return user;
  }
  async createUser(userData: UserMongo): Promise<UserMongo> {
    const user = await userModel.create(userData);
    console.log(user, "created user result from REPO");
    return user.toObject() as UserMongo;
  }
  async updateUser(
    id: string,
    userData: Partial<UserMongo>
  ): Promise<UserMongo> {
    
    const user = (await userModel.findByIdAndUpdate(id, userData).select("-password")) as UserMongo;
    console.log(user, "updated user result from REPO");
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    const user = await userModel.findByIdAndDelete(id);
    console.log(user, "deleted user result from REPO");
  }

  async getUserByEmail(email: string): Promise<UserMongo> {
    const user = (await userModel.findOne({ email: email })) as UserMongo;
    console.log(user, "get user by email from REPO");
    return user;
  }
}
