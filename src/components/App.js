import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import FinishButton from "./FinishButton";
import Timer from "./Timer";
import Footer from "./Footer";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  selectedAnswer: null,
  score: 0,
  highestScore: 0,
  secondsRemaining: null,
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
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
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
        index: state.index + 1,
        selectedAnswer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highestScore: Math.max(state.score, state.highestScore),
      };
    case "reset":
      return {
        ...state,
        status: "ready",
        score: 0,
        index: 0,
        selectedAnswer: null,
        secondsRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      selectedAnswer,
      score,
      highestScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

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
              maxPoints={maxPoints}
              answer={selectedAnswer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
              score={score}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {index === numQuestions - 1 ? (
                <FinishButton
                  dispatch={dispatch}
                  selectedAnswer={selectedAnswer}
                />
              ) : (
                <NextButton
                  dispatch={dispatch}
                  selectedAnswer={selectedAnswer}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            maxPoints={maxPoints}
            score={score}
            highestScore={highestScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
