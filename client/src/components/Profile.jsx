import React from "react";

const Profile = props => {
  return (
    <>
      <center>
        <div className="tile is-parent my_tile">
          <article className="tile is-child notification is-info">
            <p className="title">{props.user.user.username}</p>
            <p className="subtitle">{props.user.user.email}</p>
            <p className="subtitle">
              {props.user.user.isAdmin ? "Admin" : "User"}
            </p>
            <p
              className="title"
              onClick={() => {
                localStorage.clear();
                props.isLogged(false);
              }}
            >
              <span>Logout</span>
            </p>
          </article>
        </div>
      </center>
    </>
  );
};

export default Profile;
