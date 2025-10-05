import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  selectedAnswer: null,
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        selectedAnswer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index++,
        selectedAnswer: null,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ questions, status, index, selectedAnswer, score }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const maxPoitns = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      })
      .catch((err) =>
        dispatch({
          type: "dataFailed",
        })
      );
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              score={score}
              maxPoints={maxPoitns}
              answer={selectedAnswer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
              score={score}
            />
            <NextButton dispatch={dispatch} selectedAnswer={selectedAnswer} />
          </>
        )}
      </Main>
    </div>
  );
}
