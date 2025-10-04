export default function Option({ question, dispatch, selectedAnswer }) {
  const hasAnswer = selectedAnswer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            selectedAnswer === index ? "asnwer" : ""
          } ${
            hasAnswer
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
