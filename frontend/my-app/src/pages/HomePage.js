import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
const HomePage = () => {
  const [memes, setmemes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/meme/getallMemes"
      );

      setmemes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(memes);
  return (
    <div>
      <h1>Memes</h1>
      <h3>
        <q>
          <i>
          Unleashing the humor in every byte: where code meets comedy<br></br>
           Welcome to a world of laughter and programming prowess
          </i>
        </q>
      </h3>
      <div className="meme-container">
        <div className="body-meme">
        {memes.map((meme) => (
          <div key={meme.id}>
            <img src={`http://localhost:4000/${meme.img}`} alt="meme Image" />

            <h2>{meme.text_caption}</h2>
          </div>
          
        ))}
      </div>
      </div>
    </div>
  );
};

export default HomePage;
