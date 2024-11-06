import { Pool, Client } from 'pg';
import env from 'dotenv'
env.config()

// const pool = new Pool({
//   user: process.env.POSTGRES_USER as string,
//   host: process.env.POSTGRES_HOST as string,
//   database: process.env.POSTGRES_DB as string, 
//   password: process.env.POSTGRES_PASSWORD as string,
//   port: Number(process.env.POSTGRES_PORT as string),
// })const { Client } = require('pg');

// Replace placeholders with actual environment variables (recommended)
const DB_USER = 'users_ngu9_user'; // Use process.env if available
const DB_PASSWORD = 'v1qVqARgGijwxWs8wuNwpvQH0v0PzBsi';
const DB_HOST = 'dpg-cp4u19a1hbls73f6lgh0-a.oregon-postgres.render.com';
const DB_DATABASE = 'users_ngu9';
const DB_PORT = 5432; // Default PostgreSQL port

const client = new Client({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  port: DB_PORT,
});

client.connect()
  .then(() => console.log('Connected to database!'))
  .catch((error) => {
    console.error('Error connecting to database:', error);
    // Handle connection errors here (e.g., display error messages to the user)
  });
export default client;