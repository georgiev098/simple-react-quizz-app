export default function FinishButton({ dispatch, selectedAnswer }) {
  if (selectedAnswer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: "finish",
        })
      }
    >
      Finish
    </button>
  );
}
