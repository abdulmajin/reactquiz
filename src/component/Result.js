import React, { useEffect } from "react";
import "../css/result.css";
import questionpacks from "../questions.json";

export default function Result({ points, question, dispatch }) {
  const overAllPoint = question.reduce((sum, acc) => acc.points + sum, 0);
  const percentCal = (points / overAllPoint) * 100;

  return (
    <div className="resultcont">
      <p className="result">
        <span>🤨</span> You scored <strong>{points}</strong> out of{" "}
        {overAllPoint} ({Math.ceil(percentCal)}%)
      </p>
      <p className="highscore">(Highscore: {points} points)</p>
      <button
        className="btnrestart"
        onClick={() => dispatch({ type: "restart", payload: questionpacks })}
      >
        Restart quiz
      </button>
    </div>
  );
}
