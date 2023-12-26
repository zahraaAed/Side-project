import sequelize from "../config/dbconfig.js";
import { DataTypes } from "sequelize";
import User from "../models/user.js";

const Meme = sequelize.define("meme", {
    text_caption: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

// User.hasMany(Meme);
// Meme.belongsTo(User);
User.hasMany(Meme, { foreignKey: 'userId' });
Meme.belongsTo(User, { foreignKey: 'userId' });


Meme.sync();

export default Meme;
