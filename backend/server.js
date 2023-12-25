import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/dbconfig.js";
const app = express();
const PORT = 4000;

app.use(cors());
sequelize.sync();
app.use(bodyParser.json());
app.use(express.static("./"))
sequelize.sync();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('backend/images'));


app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});