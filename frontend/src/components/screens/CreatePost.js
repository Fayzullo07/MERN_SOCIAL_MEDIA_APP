import { PickerOverlay } from "filestack-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../Redux/Actions/PostsActions";
import UploadImage from "../../Untils/UploadImage";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [photo, setPhoto] = useState("");
  const [isPicker, setIsPicker] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state.post);
  const { loading } = post;

  // Handle Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(title, descr, photo, navigate));
  };

  return (
    <div className="container my-3 card">
      <button
        onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
        className="d-flex justify-content-center my-2"
        style={{
          border: "none",
          backgroundColor: "white",
          border: "5px dashed green",
        }}
        title="Choose Image"
        disabled={disabled}
      >
        {photo ? (
          <img src={photo} alt="postImage" className="img-fluid" />
        ) : (
          <img
            src="https://scontent.ftas1-2.fna.fbcdn.net/v/t1.6435-9/50992732_385340002013938_2152854929805410304_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cgk1LVVgcaAAX-ERtdA&_nc_ht=scontent.ftas1-2.fna&oh=00_AT-PtzdQQwibEkWD_jPd82UVwNGPw0lqlBI7gYVOVqhMuQ&oe=62D65630"
            className="img-fluid"
          />
        )}
      </button>

      <div className="text-center">
        <div className="form-floating mx-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Title</label>
        </div>

        <div className="form-floating mx-4 my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter description"
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
          />
          <label>Description</label>
        </div>

        <button
          className="btn btn-outline-success m-4 w-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "LOADING . . ." : "ADD POST"}
        </button>
        {/* FileStack */}
        {isPicker && (
          <UploadImage
            setPhoto={setPhoto}
            setIsPicker={setIsPicker}
            setDisabled={setDisabled}
          />
        )}
      </div>
    </div>
  );
};

export default CreatePost;
