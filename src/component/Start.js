import React from "react";
import "../css/start.css";
import start from "../start.png";
export default function Start({ dispatch, question, questions, muniteCount }) {
  const qlength = question.length;
  console.log(qlength);
  return (
    <div className="starContainer">
      <img className="startimg" src={start} alt="start" />
      <div className="readyquizc">
        <h3>Ready For Quiz</h3>
        <p>"Test your knowledge of React based on what you already know."</p>
        <span>
          {qlength} Question {muniteCount} munites
        </span>
        <button
          className="startbtn"
          onClick={() => dispatch({ type: "start" })}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
