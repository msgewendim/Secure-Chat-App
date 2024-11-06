// import { UserRepo } from "../Dal/UserRepo"
// import User from "../Models/User"
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken'
// export class UserBL {

//   private userRepo : UserRepo

//   constructor(userRepo : UserRepo) {
//     this.userRepo = userRepo  
//   }

//   async getAllUsers(id?: number): Promise<User[]> {
//     try {    
//       const result = await this.userRepo.getAllUsers();
//       if (result.length === 0){
//         throw new Error("Users Not Found In Database")
//       }
//       // return users with out password
//       const usersWithoutPassword = result.map(user => {
//         const {password, ...userWithoutPassword} = user
//         return userWithoutPassword
//       })
//       // return all users without current user
//       if(id){
//         console.log('returns all users except user with id', id);
//         return usersWithoutPassword.filter(user => user.id !== id) as User[]
//       }else{
//         console.log('returns all users (including user with id)');
//         return usersWithoutPassword as User[];
//       }
//     } catch (error) {
//       throw error
//     }
//   }

//   async getUserById(id: number): Promise<User> {
//     try {
//       const result = await this.userRepo.getUserById(id);
//       if (!result){
//         throw new Error("User Not Found In Database")
//       }
//       const {password, ...userWithoutPassword} = result
      
//       return userWithoutPassword as User;
//     } catch (error) {
//       throw error
//     }
//   }

//   async createUser(newUser : User): Promise<User> {
//     try {
//       const { username , email, image } = newUser;
//       // check if user exists
//       const userExists = await this.userRepo.getUserByEmail(email);
//       if(userExists){
//         throw new Error("User Already Exists")
//       }
//       // create new user with hashed password
//       const plainTextPassword = newUser.password;
//       const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

//       const user = new User(username, email, hashedPassword, image);
//       const result = await this.userRepo.createUser(user);
//       if ( !result ){ 
//         throw new Error("Error Creating a new User")
//       }
//       // return user with out password
//       const {password, ...userWithoutPassword} = result

//       return userWithoutPassword as User;
//     } catch (error) {
//       throw error
//     }
//   }

//   async updateUser(id : number, userData: Partial<User>): Promise<User> {
//     try {
//       const result = await this.userRepo.updateUser(id, userData);
//       if ( !result ){ 
//         throw new Error(`Error Updating User with id : ${id}`)
//       }
//       const {password, ...userWithoutPassword} = result
      
//       return userWithoutPassword as User;
//     } catch (error) {
//       throw error
//     }
//   }

//   async deleteUser(id: number): Promise<void> {
//     try {
//       await this.userRepo.deleteUser(id);
//     } catch (error) {
//       throw error as Error || new Error("Error Deleting User")
//     }
//   }

//   async loginUser(email: string, password: string): Promise<User> {
//     try {
//       const user = await this.userRepo.getUserByEmail(email);
//       if (!user) {
//         throw new Error("User Not Found");
//       }
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         throw new Error("Invalid Password");
//       }
//       const { password: _, ...userWithoutPassword } = user;
//       return userWithoutPassword as User;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async loginWithGoogle(credentials: string): Promise<User> {
//     try {
//       // decode credentials 
//       const googleUser = jwt.decode(credentials);
//       const { email, name } = googleUser as GoogleUser;
//       const user = await this.userRepo.getUserByEmail(email);
//       if(!user) {
//         const newUser = new User(name, email, "", "");
//         const result = await this.userRepo.createUser(newUser);
//         console.log(result, "created user result");
//         return result;
//       }else{
//         console.log(user, "user exists in database");        
//         return user
//       }
//       } catch (error) {
//       throw error;
//     }
//   }
// }

// interface GoogleUser {
//   email: string;
//   name: string;
// }