export interface IUserRepo<T> {
  getAllUsers(): Promise<T[]>
  getUserById(id: string): Promise<T>
  createUser(userData : T): Promise<T>
  updateUser(id : string, userData: Partial<T>): Promise<T>
  deleteUser(id: string): Promise<void>
}

