// import Meme from "../models/memes.js";
// import User from "../models/user.js";

// export const getMemesForUsers = async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//         let user = await User.findByPk(userId, { include: [{ model: Meme }] });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
  
//         let memes = user.Memes;
//         if (memes) {
//             memes = memes.map(meme => ({
//                 ...meme.dataValues,
//                 creatorName: meme.User.username
//             }));
//         }
  
//         return res.status(200).json("meme user successfully");
//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }
//  }
import Meme from "../models/memes.js";
import User from "../models/user.js";

export const getMemesForUsers = async (req, res) => {
 const { userId } = req.params;
 
 try {
     let memes = await Meme.findAll({ where: { userId: userId }, include: [User] });
     if (!memes || memes.length === 0) {
         return res.status(404).json({ message: "No memes found for this user" });
     }
 
     memes = memes.map(meme => {
         if (meme.User) {
             return {
                ...meme.dataValues,
                creatorName: meme.User.username
             };
         } else {
             return meme.dataValues;
         }
     });
 
     return res.status(200).json(memes);
 } catch (err) {
     res.status(500).json({ error: err.message })
 }
 }

