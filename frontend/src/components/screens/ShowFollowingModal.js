import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAnyUsers, getFollowingsUsers } from "../../api/UsersRequest";
import SkeletonLoading from "../../Untils/SkeletLoading";

const ShowFollowingModal = (props) => {
  const { showFollowingModal, setShowFollowingModal, userId } = props;
  const [users, setUsers] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    getFollowingsUsers(userId)
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
      style={showFollowingModal ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Followings</h5>
            <button
              onClick={() => setShowFollowingModal(false)}
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
                    to={
                      user?._id === userInfo?.user?._id
                        ? `/profile`
                        : `/profile/${user?._id}`
                    }
                    className="text-reset text-decoration-none"
                  >
                    <div
                      className="row border mb-2 bg-light rounded-pill"
                      onClick={() => setShowFollowingModal(false)}
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

export default ShowFollowingModal;
