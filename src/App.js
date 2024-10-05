import "./App.css";
import "./css/header.css";
import "./css/quiznav.css";
import Header from "./component/Header";
import Quiztopnav from "./component/Quiztopnav";
import QuestionsScreen from "./component/QuestionsScreen";
import Questions from "./component/Questions";
import Questionsnum from "./component/Questionsnum";
import Error from "./component/Error";
import Start from "./component/Start";
import { useEffect, useReducer } from "react";
import Result from "./component/Result";
import questionpacks from "./questions.json";
const initial = {
  status: null,
  question: [],
  index: 0,
  points: 0,
  selected: null,
  secCount: 59,
  muniteCount: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "datareceived": {
      return { ...state, status: "active", question: action.payload };
    }

    case "datafail": {
      return { ...state, status: "failed" };
    }
    case "start": {
      return { ...state, status: "start" };
    }
    case "timer": {
      if (state.muniteCount === 0) {
        return { ...state, status: "submit" };
      }
      if (state.secCount === 0) {
        return { ...state, muniteCount: state.muniteCount - 1, secCount: 59 };
      } else {
        return { ...state, secCount: state.secCount - 1 };
      }
      //return { ...state, secCount: state.secCount - 1 };
    }
    case "restart": {
      return {
        ...state,
        status: "active",
        question: action.payload,
        index: 0,
        secCount: 59,
        muniteCount: 10,
        points: 0,
      };
    }
    case "next": {
      return { ...state, index: state.index + 1 };
    }
    case "prev": {
      return { ...state, index: state.index - 1 };
    }
    case "submit": {
      let respon = window.confirm("Do you Wish to  submit quiz");
      if (respon) {
        alert("submited");
        return { ...state, status: "submit" };
      } else {
        alert("submit cancel");
        return { ...state, status: "start" };
      }
    }
    case "jump": {
      return { ...state, index: action.payload };
    }
    case "selected": {
      const curr = state.question.at(state.index);
      console.log(curr.points);
      return {
        ...state,
        question: state.question.map((items, i) =>
          i === state.index
            ? {
                ...items,
                answer: true,
                selectedop: curr.options[action.payload],
              }
            : items
        ),
        points:
          curr.correctOption === action.payload
            ? state.points + curr.points
            : state.points,
      };
    }
    default: {
      throw new Error("failed to fetched file");
    }
  }
}
function App() {
  const [
    { status, question, index, points, selected, secCount, muniteCount },
    dispatch,
  ] = useReducer(reducer, initial);
  const totalq = question.length;

  useEffect(
    function () {
      /*    fetch("{questionpacks}")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "datareceived", payload: data }))
        .catch((error) => {
          dispatch({ type: "datafail" });
        });*/
      dispatch({ type: "datareceived", payload: questionpacks });
    },
    [dispatch]
  );

  console.log(questionpacks);
  return (
    <div className="App">
      <Header status={status} />
      <main className="main">
        {status === "active" && (
          <Start
            dispatch={dispatch}
            question={question}
            muniteCount={muniteCount}
          />
        )}
        {status === "failed" && <Error />}
        {status === "start" && (
          <>
            <Quiztopnav
              dispatch={dispatch}
              secCount={secCount}
              muniteCount={muniteCount}
            />
            <QuestionsScreen question={question} index={index}>
              <Questions
                question={question[index]}
                dispatch={dispatch}
                index={index}
                totalq={totalq}
                points={points}
              />
              <Questionsnum question={question} dispatch={dispatch} />
            </QuestionsScreen>
          </>
        )}
        {status === "submit" && (
          <Result question={question} points={points} dispatch={dispatch} />
        )}
      </main>
    </div>
  );
}

export default App;
