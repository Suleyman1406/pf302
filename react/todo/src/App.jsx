import { useState } from "react";
import { Todo } from "./components/todo";

function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && <Todo />}
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export default App;
