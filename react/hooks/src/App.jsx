import { useState } from "react";
import { Toast } from "./Toast";

function App() {
  const [person, setPerson] = useState({ name: "test" });
  const [count, setCount] = useState(0);
  const [showToast, setShowToast] = useState(true);

  return (
    <>
      {showToast && <Toast />}
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setShowToast(false)}>Remove Toast</button>
      {/* <h1>{person.name}</h1>
      <button
        onClick={() => {
          person.name = "hello";
          setPerson({ ...person });
        }}
      >
        x
      </button> */}
    </>
  );
}

export default App;
