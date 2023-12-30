import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
dotenv.config();
// export const registerUser = async (req, res) => {
//   console.log("received user from localhost")
//   try {
//     const { username,email,role,password } = req.body;
//     console.log("received try")
//     const user= await User.create({ username,email,role,password:await bcrypt.hash(password, 15) });
//     console.log("received hash")
//     res.status(200).json({user});
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };
export const registerUser = async (req, res) => {
  console.log("Received user from localhost");
  try {
    const { username, email, role, password } = req.body;
    console.log("Received user data:", { username, email, role, password });

    const hashedPassword = await bcrypt.hash(password, 15);
    console.log("Password hashed successfully");

    const user = await User.create({ username, email, role, password: hashedPassword });
    console.log("User created:", user);

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    res.status(500).json({ message: error.message });
  }
};


//user login
export async function signInUser(req, res) {
  console.log("login from front")
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      console.log("login from front get name")
      if (!user) {
          return res.status(404).json('Incorrect username and password combination');
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      console.log("login from front get password")
      if (!passwordValid) {
          return res.status(404).json('Incorrect username and password combination');
          
      }
    
      const token = jwt.sign({ username: user.username, role: user.role  }, process.env.SECRET_KEY || 'default_secret');
    
      res.status(200).json({
          username: user.username,
          role: user.role,
          accessToken: token,
      });
  } catch (err) {
      console.error(err);
      res.status(500).send('Sign in error');
  }
}
