import { ObjectId } from "mongodb";
import { UserRepo } from "../Dal/UserRepoMongo";
import { UserMongo } from "../Models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UserBL {
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  async getAllUsers(id?: string): Promise<UserMongo[]> {
    try {
      const result = await this.userRepo.getAllUsers();
      if (result.length === 0) {
        throw new Error("Users Not Found In Database");
      }
      // return all users without current user
      if (id) {
        console.log("returns all users except user with id", id);
        return result.filter(user => id !== user._id?.toString());
      }
      console.log("returns all users (including user with id)");
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<Partial<UserMongo>> {
    try {
      const result = await this.userRepo.getUserById(id);
      if (!result) {
        throw new Error("User Not Found In Database");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(newUser: UserMongo): Promise<UserMongo> {
    try {
      const { username, email, image } = newUser;
      // check if user exists
      const userExists = await this.userRepo.getUserByEmail(email);
      if (userExists) {
        throw new Error("User Already Exists");
      }
      // // create new user with hashed password
      const plainTextPassword = newUser.password;
      const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

      // const user = new userModel({ username, email, hashedPassword, image });
      const user = {
        username,
        email,
        password: hashedPassword,
        image,
      } as UserMongo;

      const result = await this.userRepo.createUser(user);
      if (!result) {
        throw new Error("Error Creating a new User");
      }

      // // return user with out password
      const { password, ...userWithoutPassword } = result;
      return userWithoutPassword as UserMongo;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: string,
    userData: Partial<UserMongo>
  ): Promise<UserMongo> {
    try {
      console.log("User to be Updated", id, userData);
      const result = await this.userRepo.updateUser(id, userData);
      if (!result) {
        throw new Error(`Error Updating User with id : ${id}`);
      }
      // return user with out password
      const updatedUser = await this.userRepo.getUserById(id);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepo.deleteUser(id);
    } catch (error) {
      throw (error as Error) || new Error("Error Deleting User");
    }
  }

  async loginUser(email: string, password: string): Promise<UserMongo> {
    try {
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        throw new Error("User Not Found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid Password");
      }
      // return user without password
      const validUser = await this.userRepo.getUserById(user._id?.toString() as string);
      return validUser;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle(credentials: string): Promise<UserMongo> {
    try {
      // decode credentials
      const googleUser = jwt.decode(credentials);
      const { email, name } = googleUser as GoogleUser;
      const user = await this.userRepo.getUserByEmail(email);
      if (!user) {
        const newUser = {
          username: name,
          email,
          image: "",
          password: "",
        } as UserMongo;
        const result = await this.userRepo.createUser(newUser);
        console.log(result, "created user result");
        return result;
      }
      console.log(user, "user exists in database");
      return user;
    } catch (error) {
      throw error;
    }
  }
}

interface GoogleUser {
  email: string;
  name: string;
}
