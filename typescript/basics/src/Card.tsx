type Props = {
  isNew: boolean;
  title: string;
  description?: string;
  handleClick: (title: string) => void;
  sum: (a: number, b: number) => number;
};

const Card = ({ title, description, handleClick, isNew }: Props) => {
  return (
    <div>
      <h1>Card {title}</h1>
      <p>{isNew ? "New" : "Old"}</p>
      <p>{description?.toLowerCase()}</p>
      <button onClick={() => handleClick("asdasd")}>Click me</button>
    </div>
  );
};

export default Card;
