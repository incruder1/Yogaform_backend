import  express from 'express';
import  cors from "cors"; 
import bodyParser from "body-parser"
import pool from "./config/db.js";
import dotenv from "dotenv";
import  Login  from"./routes/login.js";
import { SignUp } from './routes/SignUp.js';
const app = express();
const port = process.env.PORT||3001;
dotenv.config();


app.use(cors());
app.use(bodyParser.json());

// Route for user signup

// Route for user login
app.post('/api/signup',SignUp);
 
app.post('/api/login',Login);

app.put('/api/update-batch/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { batch } = req.body;

    // Validate input (add more validation as needed)
    if (!batch) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Update user's batch information in the database
    const result = await pool.query('UPDATE users SET batch = $1 WHERE email = $2 RETURNING *', [
      batch,email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/get-user/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Validate input (add more validation as needed)
    if (!email) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Retrieve user information by email from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.'});
    }

    res.status(200).send({
      status:"Success",
      data:result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
