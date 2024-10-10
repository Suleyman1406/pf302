import { ReactNode, useRef } from "react";

type Color = "red" | "blue" | "green";
type Props = {
  color: Color;
  children: ReactNode;
  clickCount: number;
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
};

const Button = ({ color, children, clickCount, setClickCount }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={buttonRef}
        style={{ color }}
        onClick={() => {
          setClickCount((prev) => prev + 1);
        }}
      >
        {children}
      </button>
      <p>Clicked {clickCount} times</p>
    </>
  );
};

export default Button;
