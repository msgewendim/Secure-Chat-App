export interface IUserRepo<T> {
  getAllUsers(): Promise<T[]>
  getUserById(id: number): Promise<T>
  createUser(userData : T): Promise<T>
  updateUser(id : number, userData: Partial<T>): Promise<T>
  deleteUser(id: number): Promise<void>
}
