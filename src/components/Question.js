import Option from "./Option";

export default function Question({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      {question.options.map((option) => (
        <Option option={option} key={option} />
      ))}
    </div>
  );
}
