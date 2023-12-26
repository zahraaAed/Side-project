import Meme from "../models/memes.js";
import User from "../models/user.js";
export const getAllMemes= async (req,res) =>{
    try{
        const Memes = await Meme.findAll({ 
        
    });
        if(Memes){
              return res.status(200).send(Memes);

        }
        else{res.status(404).json({message:'Meme not found'})}

    }catch(err){
        res.status(500).json({error: err.message})
    }
        
}

export const getMemeById = async(req,res) =>{
    const {MemeId} = req.params;

    try{
        const Meme = await Meme.findByPk(MemeId)
        if(!Meme){
            return res.status(404).json({ message: "Meme not found" });
        }
        res.status(200).json({Meme:Meme});
    }catch(err){
        console.log(err);
    }
}


export const deleteMeme = async (req,res) =>{
    const {MemeId}= req.params;
    try{
        const DeleteMeme = await Meme.destroy({where:{id:MemeId}});
        if(!DeleteMeme){
            return res.status(404).json({ message: "Meme not deleted" });
        }
        res.status(200).json({message:"meme deleted successfully"});
    }catch(err){
        console.log(err);
    }

}



//add


// export const addMeme = async (req, res) => {
//     const image = req.file ? req.file.path : null;
   
//     const { text_caption } = req.body; 
//     try {
    
//         const createdMeme = await Meme.create({ text_caption, img: image });
//         console.log(createdMeme);
//         res.status(200).json({ message: 'Meme created successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };


export const addMeme = async (req, res) => {
    const image = req.file ? req.file.path : null;
    const { text_caption, userId } = req.body; 
   
    try {
      let user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
   
      const createdMeme = await user.createMeme({ text_caption, img: image });
      console.log(createdMeme);
      res.status(200).json({ message: 'Meme created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
   };
   
// Update
export const updateMeme = async (req, res) => {
    const { MemeId } = req.params;
    const img = req.file?.path;

    try {
        if (req.body) {
            const updatedMeme = await Meme.update({ ...req.body, img }, { where: { id: MemeId } });
            return res.status(200).json({ message: 'Meme updated successfully!', Meme: updatedMeme });
        }
        res.status(400).json({ message: 'Something went wrong' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
//get meme for user

  