import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./memeDetail.css";
const MemeDetail = () => {
  const { MemeId } = useParams();
  const [meme, setMeme] = useState({
   
    text_caption: '',
    img: null, 
    user: { username: '' },
  });

  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/meme/${MemeId}`)
      .then((res) => {
        console.log("Received data from API:", res.data);
        setMeme(res.data.Meme); 

      })
      .catch((err) => console.log(err));

  }, [MemeId]);

  return (
    <div>
      <h1>Meme's Detail</h1>
      <div className='meme-detail'>
      <div className="body-meme">
      <img src={`http://localhost:4000/${meme.img}`} alt="meme Image" />
        <h2>{meme.text_caption}</h2>
        <p>Created by: {meme.user.username}</p>
      </div>
      </div>
    </div>
  );
};

export default MemeDetail;
