import { PasswordRepo } from "../Dal/PasswordRepo";
import Password, { passwordModel } from "../Models/Password";
import { encrypt, decrypt } from "../utils/middlewares/crypto";
export class PasswordBL {
  private passwordRepo: PasswordRepo;
  key = "mySecretKey";
  constructor(passwordRepo: PasswordRepo) {
    this.passwordRepo = passwordRepo;
  }

  async updatePassword(id: string, passwordData: Partial<Password>) : Promise<Password> {
    try {
      const { password, userID, name } = passwordData;
      let hashedPassword;
      if (password) {
        // hash new password
        hashedPassword = encrypt(password, this.key);
      }
      const passwordObj = new Password(
        hashedPassword as string,
        userID ? (userID as number) : NaN,
        name ? (name as string) : ""
      );
      const result = await this.passwordRepo.updatePassword(id, passwordObj) as Password;
      if(!result) throw new Error("Password Not Found");
      // return updated password decrypted
      // const decryptedPassword = decrypt(result?.password as string, this.key);
      // return { ...result, password: decryptedPassword };
      return result;
    } catch (error) {
      throw error;
    }
  }

  async addPassword(passwordData: Partial<Password>): Promise<Password> {
    try {
      const { password, userID, name } = passwordData;
      if (!password || password.length < 0 || !userID || !name || name.length < 0) {
        throw new Error("Password, User ID, or Name are required");
      }

      // hash password
      const hashedPassword = encrypt(password, this.key);
      // create new password
      const passwordObj = new Password(hashedPassword, userID, name);
      // send password to repo for saving
      const result = await this.passwordRepo.createPassword(passwordObj);

      // return new password decrypted
      const decryptedPassword = decrypt(result?.password as string, this.key);
      return { ...result, password: decryptedPassword };
    } catch (error) {
      throw error;
    }
  }

  async deletePassword(id: string) {
    try {
      const result = await this.passwordRepo.deletePassword(id) as typeof passwordModel;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getPassword(id: string) : Promise<typeof passwordModel | unknown> {
    try {
      const result = await this.passwordRepo.getPassword(id) as Password;
      console.log(result, "password found");
      if (!result) {
        throw new Error("Password Not Found");
      }        
      // decrypt password
      const decryptedPassword = decrypt(result?.password as string, this.key);
      return {...result, password: decryptedPassword};
      
    } catch (error) {
      throw error;
    }
  }

  async getAllPasswordOfUser(userID: number, page: number) {
    try {
      const result = await this.passwordRepo.getAllPasswordsOfUser(userID, page) as Password[];
      const decryptedPasswords = result.map((password : Password) => {
        const decryptedPassword = decrypt(password?.password as string, this.key);
        return { ...password, password: decryptedPassword };
      })
      return decryptedPasswords;
    } catch (error) {
      throw error;
    }
  }
}
