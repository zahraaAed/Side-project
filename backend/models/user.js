import sequelize from "../config/dbconfig.js";
import { DataTypes } from "sequelize";


const User= sequelize.define("user",{
    username: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
      
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    },
},)
User.sync() 
export default User