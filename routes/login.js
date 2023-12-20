import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import pool from "../config/db.js";
//POST LOGIN
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email]);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    const match = await comparePassword(password, user.rows[0].password);
    
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user.rows[0].id,
        email: user.rows[0].email,
        name:user.rows[0].name
       },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export default Login;
