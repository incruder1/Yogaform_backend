
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import pool from "../config/db.js"
export  const SignUp = async (req, res) => {
  try {
    const {name, email,password,  batch, age } = req.body;
    
    
  
 
    console.log(email);
    console.log(password);
    
    //validations
    
    if (!name || !email || !password || !batch || !age) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
   
    //check user
    const exisitingUser =   await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    //exisiting user
    if (exisitingUser.rows[0]) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await pool.query(
      'INSERT INTO users (name, email, password, batch, age) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, batch, age]
    );

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

