import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "../../Redux/Actions/UserActions";
import UploadImage from "../../Untils/UploadImage";

const EditProfile = (props) => {
  const { showEditModal, setShowEditModal, myPhoto, myName, myEmail } = props;
  const dispatch = useDispatch();
  const [isPicker, setIsPicker] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [photo, setPhoto] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    setName(myName);
    setEmail(myEmail);
    setPhoto(myPhoto);
  }, []);

  const handleChange = () => {
    if (!name || !email || !password || !confirm || !photo) {
      toast.warning("Fill in all informations!");
      return;
    }
    if (password !== confirm) {
      toast.warning("Password should be similar!");
      return;
    }
    dispatch(
      updateProfile(
        name,
        email,
        password,
        confirm,
        photo,
        myEmail,
        setShowEditModal
      )
    );
  };
  return (
    //  Modal
    <div
      className="modal bg-secondary"
      style={
        showEditModal ? { display: "block", opacity: 1 } : { display: "none" }
      }
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Edit Profile</h3>
            <button
              className="btn-close"
              onClick={() => setShowEditModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <button
                onClick={() =>
                  isPicker ? setIsPicker(false) : setIsPicker(true)
                }
                type="button"
                className="border mb-4 rounded-circle"
                style={{ objectFit: "cover", width: "164px", height: "155px" }}
                disabled={disabled}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="imageUpload"
                    className="rounded-circle"
                    style={{
                      objectFit: "cover",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                ) : (
                  <img
                    src={myPhoto}
                    className="w-100 rounded-circle"
                    alt="ImageDefault"
                    style={{ objectFit: "cover" }}
                    title="Change Image"
                  />
                )}
              </button>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="col-form-label">
                      <b>Name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email" className="col-form-label">
                      <b>Email</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="password" className="col-form-label">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      <b>Confirm</b>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowEditModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleChange}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
      {/* FileStack */}
      {isPicker && (
        <UploadImage
          setPhoto={setPhoto}
          setIsPicker={setIsPicker}
          setDisabled={setDisabled}
        />
      )}
    </div>
  );
};

export default EditProfile;
