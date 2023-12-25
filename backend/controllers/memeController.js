import Meme from "../models/memes.js";

export const getAllMemes= async (req,res) =>{
    try{
        const Memes = await Meme.findAll()
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
export const addMeme = async (req, res) => {

    try {
        const image=req.file.path||null
        const {text_caption} = req.body
        const Meme = await Meme.create({text_caption,img:image});
        console.log(Meme)
        res.status(200).json({  message: "Meme created successfully" });
    }catch (error) {
   console.log(error)
     res.status(500).json({ message: error.message});
    }
   };

//update
export const updateMeme= async (req,res) =>{
    const { MemeId} = req.params;
    const img = req.file?.path
    try{
        if(req.body){
            const Meme=await Meme.update({...req.body,img},{where:{id:MemeId}});
            return res.status(200).json({message:`Meme updated successfully!`,Meme:Meme});
        }
        res.status(400).json({message:'something went wrong'})

    }catch(err){console.error(err);
    }

}