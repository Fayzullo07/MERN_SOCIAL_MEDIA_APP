import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { searchUsers } from "../../api/UsersRequest";
import SkeletonLoading from "../../Untils/SkeletLoading";

const SearchUserModal = (props) => {
  const { show, setShow } = props;
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please Enter something in search");
      return;
    }
    try {
      setLoading(true);

      const { data } = await searchUsers(search);

      setLoading(false);
      setResults(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <!-- Modal -->
    <div
      className="modal"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Search Users</h5>
            <button
              onClick={() => setShow(false)}
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSearch}
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div className="modal-body overflow-auto">
              {loading ? (
                <SkeletonLoading height={60} count={10} rodius={50} />
              ) : (
                results?.map((user) => (
                  <Link
                    key={user._id}
                    to={`/profile/${user?._id}`}
                    className="text-reset text-decoration-none"
                  >
                    <div
                      className="row border mb-2 bg-light rounded-pill"
                      onClick={() => setShow(false)}
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
              {results.length === 0 && <span>Not Found User</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserModal;
