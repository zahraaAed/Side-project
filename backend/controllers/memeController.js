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
export const getMemeById = async (req, res) => {
    const { MemeId } = req.params;
  console.log("get front of id")
    try {
      const OneMeme = await Meme.findByPk(MemeId, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      console.log("get front of include")
      if (!OneMeme) {
        return res.status(404).json({ message: "Meme not found" });
      }
  
      const formattedMeme = OneMeme.toJSON();
      if (OneMeme.User) {
        formattedMeme.creatorName = OneMeme.User.username;
      }
     
      res.status(200).json({ Meme: formattedMeme });
       console.log("fetch data")
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };


export const deleteMeme = async (req,res) =>{
    const {MemeId}= req.params;
    try{
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
      }
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


export const addMeme = async (req, res) => {
    const image = req.file ? req.file.path : null;
   
    const { text_caption } = req.body; 
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
      }
    
        const createdMeme = await Meme.create({ text_caption, img: image });
        console.log(createdMeme);
        res.status(200).json({ message: 'Meme created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



// export const addMeme = async (req, res) => {
//     console.log("Received POST request at /api/meme/addMeme");
//     const image = req.file ? req.file.path : null;
//     // console.log("error in img")
//     const { caption} = req.body; 
//     console.log("error in caption")
//     try { 
//       const createdMeme = await Meme.create({caption, img: image });
//       console.log("got meme")
//       console.log(createdMeme);
//       console.log("got meme")
//       res.status(200).json({ message: 'Meme created successfully' });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: error.message });
//     }
//    };
   
// Update
export const updateMeme = async (req, res) => {
    const { MemeId } = req.params;
    const img = req.file?.path;
    console.log("get front to start updating")
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
      }
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
