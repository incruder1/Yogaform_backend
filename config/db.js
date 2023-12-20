// import pg from "pg";
// const { Pool } = pg;

// // Database connection pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Yoga-DB',
//   password: '123',
//   port: 5432,
// });
// export default pool;
import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();
// Database connection pool
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.PGPORT,
});
console.log(process.env.PGPORT+"   Port");
export default pool;
