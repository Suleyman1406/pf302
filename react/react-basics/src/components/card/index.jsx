import React from "react";
import styles from "./style.module.css";

const Card = (props) => {
  // props.card.title = "test";
  let { id, title, description, reviewCount, isActive } = props.card;
  let { handleDelete } = props;

  // function handleClick() {
  //   setCards((prev) => prev.filter((card) => card.id !== id));
  // }

  return (
    <div className={styles.card}>
      <img src="https://picsum.photos/200/300" alt="placeholder" />
      <h3 className={styles.heading}>{title}</h3>
      <p>{description}</p>
      <p>{reviewCount} reviews</p>
      {isActive ? (
        <span className={styles.badge}>Active</span>
      ) : (
        <span className={styles.badge}>Deactive</span>
      )}
      <button
        onClick={() => handleDelete(id)}
        className={styles.delete__action}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
