import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div>
        <center>
          <p className="title">Take the Base quiz</p>
          <Link to={localStorage.token ? "/quizzes" : "/users/login"}>
            <button className="button is-success">Click Here to Get started</button>
          </Link>
        </center>
      </div>
    </>
  );
};
export default LandingPage;