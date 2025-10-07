export default function FinishScreen({
  score,
  maxPoints,
  highestScore,
  dispatch,
}) {
  const percent = (score / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxPoints} (
        {Math.ceil(percent)}%)
      </p>
      <p className="highscore"> Highest Score : {highestScore}</p>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "reset",
          })
        }
      >
        Reset
      </button>
    </>
  );
}
