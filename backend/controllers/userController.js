import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { username,email,password } = req.body;
    const user= await User.create({ username,email,password:await bcrypt.hash(password, 15) });
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


//user login 
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      //find the user by the email
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    
  
      // Compare the passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      //jwt token
      const token = jwt.sign({ userId: user.id, email: user.email }, '56256516', {
        expiresIn: '1h', // Token expiration time
      });
  
      res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  };