import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import memesRoute from "./routes/memesRoute.js";
import userMemeRoute from "./routes/userMemeRoute.js"
import bodyParser from "body-parser";
import sequelize from "./config/dbconfig.js";
const app = express();
const PORT = 4000;

app.use(cors());
sequelize.sync();
app.use(bodyParser.json());

app.use(express.static("./"))
app.use("/api/user", userRoute);
app.use("/api/meme", memesRoute);
app.use("/api/userMeme", userMemeRoute);
sequelize.sync();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('backend/images'));


app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
