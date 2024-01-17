import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  try {
    const headerInput = req.headers['authorization'];
    const token = headerInput && headerInput.split(' ')[1];
    console.log('Received Token:', token);

    if (!token) {
      return res.status(401).json({ error: 'Not authorized user' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default protect;
