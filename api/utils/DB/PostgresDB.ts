import { Pool } from 'pg';
import env from 'dotenv'
env.config()

const pool = new Pool({
  user: process.env.POSTGRES_USER as string,
  host: process.env.POSTGRES_HOST as string,
  database: process.env.POSTGRES_DB as string, 
  password: process.env.POSTGRES_PASSWORD as string,
  port: Number(process.env.POSTGRES_PORT as string),
})


export default pool;