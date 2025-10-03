export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react quizz</h2>
      <h3>{numQuestions} Questions to test your knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "start",
          })
        }
      >
        Begin
      </button>
    </div>
  );
}
