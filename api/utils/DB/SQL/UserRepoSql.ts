// import User from "../Models/User";
// import pool from "../utils/DB/PostgresDB";
// import { IUserRepo } from "../utils/interfaces/IUserRepo";

// export class UserRepo implements IUserRepo<User>{
//   async getAllUsers(): Promise<User[]> {
//     const query = 'SELECT * FROM users';
//     const { rows } = await pool.query(query);
//     return rows;
//   }
//   async getUserById(id: number): Promise<User> {
//     const query = 'SELECT * FROM users WHERE id = $1';
//     const {rows} =  await pool.query(query, [id]);
//     console.log(rows);
//     return rows[0];
//   }
//   async createUser(userData : User): Promise<User> {
//     const {username, email, password, image} = userData
//     const query = 'INSERT INTO users (username, email, password, image) VALUES ($1, $2, $3, $4) RETURNING *';
//     const {rows} =  await pool.query(query, [username, email, password, image]);
//     return rows[0];
//   }
//   async updateUser(id : number, userData: Partial<User>): Promise<User> {
//     let query = 'UPDATE users SET ';
//     const keys = Object.keys(userData); // get all the keys and values of the object passed in the function as argument 
//     const values = Object.values(userData);  
//     for (let i = 0; i < keys.length; i++) {
//       query += `${keys[i]} = $${i + 1}, `;  // add each key and value to the query string with $1, $2, $3, etc.
//     } 
//     query = query.slice(0, -2);   // remove the last comma and space
//     query += ' WHERE id = $' + (keys.length + 1) + ' RETURNING *';   // add the WHERE clause and return the updated user
//     const {rows} =  await pool.query(query, [...values, id]); 
//     return rows[0];
//   }
//   async deleteUser(id: number): Promise<void> {
//     const query = 'DELETE * FROM users WHERE id = $1'
//     await pool.query(query, [id]);
//   }
  
//   async getUserByEmail(email: string): Promise<User> {
//     const query = 'SELECT * FROM users WHERE email = $1';
//     const {rows} =  await pool.query(query, [email]);
//     return rows[0];
//   }
// }