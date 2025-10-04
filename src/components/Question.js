import Option from "./Option";

export default function Question({
  question,
  dispatch,
  selectedAnswer,
  score,
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <h3>{score}</h3>
      <Option
        dispatch={dispatch}
        question={question}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}
