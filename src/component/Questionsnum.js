import { type } from "@testing-library/user-event/dist/type";
import React from "react";

export default function Questionsnum({ question, dispatch }) {
  return (
    <div className="qnum">
      {question.map((item, i) => (
        <Listnum dispatch={dispatch} qindex={i} key={i} question={question} />
      ))}
    </div>
  );
}

function Listnum({ qindex, dispatch, question }) {
  return (
    <>
      <button
        className={`qnumbtn ${question[qindex].answer ? "answer" : ""}`}
        key={qindex}
        onClick={() => dispatch({ type: "jump", payload: qindex })}
      >
        {qindex + 1}
      </button>
    </>
  );
}
