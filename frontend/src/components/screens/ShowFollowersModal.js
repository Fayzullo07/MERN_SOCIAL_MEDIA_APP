import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFollowersUsers } from "../../api/UsersRequest";
import SkeletonLoading from "../../Untils/SkeletLoading";

const ShowFollowersModal = (props) => {
  const { showFollowersModal, setShowFollowersModal, userId } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getFollowersUsers(userId)
      .then((data) => {
        setUsers(data.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // <!-- Modal -->
    <div
      className="modal"
      style={showFollowersModal ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Followers</h5>
            <button
              onClick={() => setShowFollowersModal(false)}
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="modal-body overflow-auto">
              {users.length == 0 ? (
                <SkeletonLoading height={60} count={6} rodius={50} />
              ) : (
                users?.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user?._id}`}
                    className="text-reset text-decoration-none"
                  >
                    <div
                      className="row border mb-2 bg-light rounded-pill"
                      onClick={() => setShowFollowersModal(false)}
                    >
                      <div className="col-2 p-2">
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="rounded-circle"
                          width="50"
                        />
                      </div>
                      <div className="col-10 p-1 fst-italic">
                        <h4>
                          <b>{user.name}</b>
                        </h4>
                        <span>
                          <b>Email: </b> {user.email}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
              {/* {results.length === 0 && <span>Not Found User</span>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFollowersModal;
