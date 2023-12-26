import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
export async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let token_split = token.split(" ");
  console.log(token_split);

  jwt.verify(token_split[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
}

