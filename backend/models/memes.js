import sequelize from "../config/dbconfig.js";
import { DataTypes } from "sequelize";
import User from "../models/user.js"
const Meme= sequelize.define("meme", {

    text_caption: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
},

);
User.hasMany(Meme);
Meme.belongsTo(User);

Meme.sync()


export default Meme;