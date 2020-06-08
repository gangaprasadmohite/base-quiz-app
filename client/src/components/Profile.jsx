import React from "react";
import { Link } from "react-router-dom";
import Loader from 'react-loaders'


const Profile = props => {
  return (
    <>
      {props.user ? (
        <center>
          <div className="my_tile">
            <article className="tile is-child notification is-info">
              <p className="title">{props.user.user.username}</p>
              <p className="subtitle">{props.user.user.email}</p>
              <p className="subtitle">
                {props.user.user.isAdmin ? "Admin" : "User"}
              </p>
              {!props.user.user.isAdmin ? (
                <Link to="/score">
                  <p className="Profile_score">Score</p>
                </Link>
              ) : null}
              <Link to="/">
                <p
                  className="title"
                  onClick={() => {
                    localStorage.clear();
                    props.isLogged(false);
                  }}
                >
                <span>Logout</span>
                </p>
              </Link>
            </article>
          </div>
        </center>
      ) : (
        <Loader className="loader" type="square-spin" />
      )}
    </>
  );
};
export default Profile