export default function NextButton({ dispatch, selectedAnswer }) {
  if (selectedAnswer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: "nextQuestion",
        })
      }
    >
      Next
    </button>
  );
}
