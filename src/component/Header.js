import React from "react";
import avatar from "./avatar.svg";
export default function Header({ status }) {
  return (
    <header className="header">
      <div className="logo">
        <h2>React MCQ</h2>
      </div>
      {status === "start" && (
        <div className="profileDatails">
          <div className="profilepix">
            <img className="avatar" src={avatar} alt="photos" />
          </div>
          <div className="profNameId">
            <h3 className="username">User</h3>
            <span>87393749</span>
          </div>
        </div>
      )}
    </header>
  );
}
