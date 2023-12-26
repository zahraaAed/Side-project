import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { username,email,role,password } = req.body;
    const user= await User.create({ username,email,role,password:await bcrypt.hash(password, 15) });
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


//user login
export async function signInUser(req, res) {
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user) {
          return res.status(404).json('Incorrect username and password combination');
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
          return res.status(404).json('Incorrect username and password combination');
      }

      const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);

      res.status(200).json({
          username: user.username,
          accessToken: token,
      });
  } catch (err) {
      console.error(err);
      res.status(500).send('Sign in error');
  }
}
