import Password, { passwordModel } from "../Models/Password";


export class PasswordRepo {

  async createPassword(password: Password) : Promise<Password> {
    try {
      const result = await passwordModel.create(password);
      console.log("Password Created", result);
      return result.toObject();
    } catch (error) {
      throw error
    }
  }

  async getPassword(id : string) : Promise<typeof passwordModel[] | unknown> {
    try {
      const result  = await passwordModel.findById(id)
      console.log("Password Found", result);
      if (!result) {
        throw new Error("Password Not Found");
      }
      return result.toObject();
    } catch (error) {
      throw error
    }
  } 

  async getAllPasswordsOfUser(userID : string, page : number) : Promise<typeof passwordModel[] | unknown> {
    try {
      const LIMIT = 5
      if(!page){
        page = 1
      }
      const offset = (page - 1) * LIMIT;
      const result = await passwordModel.find({userID : userID}).skip(offset).limit(LIMIT).sort({updatedAt : -1})
      console.log("Passwords of User "+ userID + "Found", result.length);
      return result
    } catch (error) {
      throw error
    }
  }

  async updatePassword(id : string, password: Partial<Password>) : Promise<typeof passwordModel | unknown> {
    try {
      console.log("Password to be Updated", id, password);
      await passwordModel.findByIdAndUpdate(id, password);
      const result = await this.getPassword(id);
      console.log("Password Updated successfully", result);
      return result as typeof passwordModel
    } catch (error) {
      throw error
    }
  }

  async deletePassword(id : string) : Promise<typeof passwordModel | unknown> { 
    try {
      const result = await passwordModel.findByIdAndDelete(id);
      console.log("Password Deleted", result);
      return result?.toObject() as typeof passwordModel;
    } catch (error) {
      throw error
    }
  }
}