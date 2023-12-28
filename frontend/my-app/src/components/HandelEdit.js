import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Handeledit() {
  const { MemeId } = useParams();

  const [values, setValues] = useState({
    text_caption: '',
    img: null, 
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/meme/${MemeId}`)
      .then((res) => {
        setValues({
          ...values,
          text_caption: res.data.meme.text_caption,
        });
      })
      .catch((err) => console.log(err));
    console.log("this is it", MemeId);
    console.log(values);
  }, [MemeId]);

  const navigate = useNavigate();

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:4000/api/meme/update/${MemeId}`, values)
      .then((res) => {
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
    <form className="form" onSubmit={handleEditSubmit}>
        <label htmlFor="caption">Caption</label>
        <input
          type="text"
          id="caption"
          name="caption"
          value={values.text_caption}
          onChange={(e) => setValues({ ...values, text_caption: e.target.value })}
        />
   <input
  type="file"
  id="file-img"
  name="file-img"
  onChange={(e) => setValues({...values, img:e.target.files[0]})}
></input>

      
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Handeledit;
