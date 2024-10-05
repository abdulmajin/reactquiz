import React, { useEffect } from "react";
import clock from "../clock.svg";

export default function Quiztopnav({ dispatch, secCount, muniteCount }) {
  useEffect(
    function () {
      const intervalId = setInterval(function () {
        // console.log("hello");
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(intervalId);
    },
    [dispatch]
  );

  return (
    <div className="topnav">
      <div className="timer">
        <img className="clock" src={clock} alt="timer" />
        <div className="timertrack">
          <p className="timerem">Time remaining</p>
          <p className="runtime">
            {String(muniteCount).padStart(2, "0")}:
            {String(secCount).padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="submit">
        <button
          className="submitbtn"
          onClick={() => dispatch({ type: "submit" })}
        >
          submit
        </button>
      </div>
    </div>
  );
}
