import React, { useState } from "react";
import style from "./style.module.css";

const CreateCardForm = ({ setCards }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const card = {
      title,
      description,
      reviewCount,
      isActive,
    };

    setCards((cards) => [{ ...card, id: cards.length + 1 }, ...cards]);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description"
      />
      <input
        value={reviewCount}
        onChange={(e) => setReviewCount(e.target.valueAsNumber)}
        type="number"
        placeholder="Review Count"
      />
      <input
        checked={isActive}
        onChange={(e) => setIsActive(e.target.checked)}
        type="checkbox"
        id="isActive"
      />
      <label htmlFor="isActive">Is Active</label>
      <button>Save</button>
    </form>
  );
};

export default CreateCardForm;
