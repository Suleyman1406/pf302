import React, { useState } from "react";
import styles from "./style.module.css";

const Counter = () => {
  const [count, setCount] = useState(1);

  function increment() {
    setCount((prev) => prev + 1);
  }
  function reset() {
    setCount(0);
  }
  function decrement() {
    setCount(count - 1);
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Counter</h1>
      <p className={styles.count}>{count}</p>
      <div className={styles.buttons__wrapper}>
        <button onClick={increment} className={styles.button}>
          Increment
        </button>
        <button onClick={reset} className={styles.button}>
          Reset
        </button>
        <button onClick={decrement} className={styles.button}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
