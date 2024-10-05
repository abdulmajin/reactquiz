import React, { useEffect } from "react";
import "../css/result.css";
import { type } from "@testing-library/user-event/dist/type";

export default function Result({ points, question, dispatch }) {
  /*const refetch = async (dispatch) => {
    const res = await fetch("http://localhost:8000/questions");
    const data = await res.json();
    dispatch({ type: "restart", payload: data });
  };*/

  const refetch = async () => {
    try {
      const res = await fetch("http://localhost:8000/questions");

      const data = await res.json();
      dispatch({ type: "restart", payload: data });
    } catch (error) {
      console.error("error in Fetching data");
      dispatch({ type: "datafail" });
    }
  };
  const overAllPoint = question.reduce((sum, acc) => acc.points + sum, 0);
  const percentCal = (points / overAllPoint) * 100;

  return (
    <div className="resultcont">
      <p className="result">
        <span>🤨</span> You scored <strong>{points}</strong> out of{" "}
        {overAllPoint} ({Math.ceil(percentCal)}%)
      </p>
      <p className="highscore">(Highscore: {points} points)</p>
      <button className="btnrestart" onClick={() => refetch()}>
        Restart quiz
      </button>
    </div>
  );
}
