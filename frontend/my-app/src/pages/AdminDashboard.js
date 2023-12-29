import { useState, useEffect } from "react";
import axios from "axios"
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
const Add = () => {
  const [meme, setmeme] = useState([]);
  const [text_caption, setText_caption] = useState("");
  const [img, setImg] = useState([]);
  const [memes, setmemes] = useState([]);

  console.log(img);
  const fetchData = async (e) => {
    e.preventDefault();
    console.log("calling this function");
    const formData = new FormData();
    console.log("calling form data")
    formData.append("text_caption", text_caption);
    formData.append("img", img);
    console.log("Form Data:", formData);
   console.log("gooo")
    try {
      const response = await axios.post(
        "http://localhost:4000/api/meme/addMeme",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
   
      setmeme(response.data.meme);
      console.log(meme);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
   };
   
  //fetch inorder to delete data
  const handleDelete = async (MemeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meme?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/meme/${MemeId}`);
      console.log("meme deleted successfully");
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  };

  const fetchmemes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/meme/getAllMemes"
      );

      setmemes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchmemes();
  }, []);
  console.log("meme", memes);
  return (
    <>
      <div className="meme">
        <h1>User's memes</h1>
        <div className="meme-description">
          <div className="memes-change">
            <h2>Add meme</h2>
            <form className="form" onSubmit={fetchData}>
              <label for="text_caption">text_caption</label>
              <input
                type="text"
                id="text_caption"
                name="text_caption"
                onChange={(e) => setText_caption(e.target.value)}
              ></input>

              <input
                type="file"
                id="file-img"
                name="file-img"
                onChange={(e) => setImg(e.target.files[0])}
              ></input>
              <button type="submit">Submit</button>
            </form>
          </div>{" "}
          <h2>Edit memes</h2>
          <div className="memes-edit">
            {memes.map((meme) => (
              <div key={meme.id}>
                <img
                  src={`http://localhost:4000/${meme.img}`}
                  alt="meme Image"
                />

                <p>{meme.text_caption}</p>
<div className="buttons">
               <button className="link-button"><Link to={`/edit/${meme.id}`}>Edit</Link></button>

                <button onClick={() => handleDelete(meme.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
