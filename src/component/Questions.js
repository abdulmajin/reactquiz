import React from "react";

export default function Questions({
  qnum,
  question,
  dispatch,
  index,
  totalq,
  points,
}) {
  console.log(points);
  return (
    <div className="alignq">
      <div>
        <span className="qstatus">
          {" "}
          Question {index + 1} of {totalq}
        </span>
        <h4 className="questioDisplay">{question.question}</h4>
      </div>
      <div>
        <div className="optionList">
          {question.options.map((items, index) => (
            <Options
              option={items}
              key={index}
              dispatch={dispatch}
              index={index}
              question={question}
            />
          ))}
        </div>

        <Footer dispatch={dispatch} index={index} />
      </div>
    </div>
  );
}
function Options({ option, dispatch, index, question }) {
  const selectedops = question.selectedop;

  return (
    <>
      <button
        key={option}
        disabled={selectedops}
        className={`options ${selectedops === option ? "answer" : ""} `}
        onClick={() => dispatch({ type: "selected", payload: index })}
      >
        {option}
      </button>
    </>
  );
}

function Footer({ dispatch, index }) {
  console.log(index);

  return (
    <footer className="footer">
      {index > 0 && (
        <button
          className="nextprevbtn"
          onClick={() => dispatch({ type: "prev" })}
        >
          Prev
        </button>
      )}

      {index === 14 ? (
        <button
          className="nextprevbtn"
          onClick={() => dispatch({ type: "submit" })}
        >
          Submit
        </button>
      ) : (
        <button
          className="nextprevbtn"
          onClick={() => dispatch({ type: "next" })}
        >
          Next
        </button>
      )}
    </footer>
  );
}
