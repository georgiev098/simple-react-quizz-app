export default function ProgressBar({
  numQuestions,
  index,
  score,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{score} </strong> / {maxPoints}
      </p>
    </header>
  );
}
