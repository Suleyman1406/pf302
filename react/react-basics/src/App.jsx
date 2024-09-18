import Card from "./components/card";
import styles from "./app.module.css";
import Header from "./components/header";
import { Fragment, useState } from "react";
import LoadMore from "./components/load-more";
import Counter from "./components/counter";
import UpdateUser from "./components/update-user";
import CreateCardForm from "./components/create-card-form";

const DEFAULT_CARDS = [
  {
    id: 1,
    title: "Card 1 Title",
    description: "Card 1 Description",
    reviewCount: 3.5,
    isActive: true,
  },
  {
    id: 2,
    title: "Card 2 Title",
    description: "Card 2 Description",
    reviewCount: 4.5,
    isActive: false,
  },
  {
    id: 3,
    title: "Card 3 Title",
    description: "Card 3 Description",
    reviewCount: 5.0,
    isActive: true,
  },
  {
    id: 4,
    title: "Card 4 Title",
    description: "Card 4 Description",
    reviewCount: 4.0,
    isActive: false,
  },
  {
    id: 5,
    title: "Card 5 Title",
    description: "Card 5 Description",
    reviewCount: 3.0,
    isActive: true,
  },
  {
    id: 6,
    title: "Card 6 Title",
    description: "Card 6 Description",
    reviewCount: 2.5,
    isActive: false,
  },
  {
    id: 7,
    title: "Card 7 Title",
    description: "Card 7 Description",
    reviewCount: 4.5,
    isActive: true,
  },
  {
    id: 8,
    title: "Card 8 Title",
    description: "Card 8 Description",
    reviewCount: 4.0,
    isActive: false,
  },
  {
    id: 9,
    title: "Card 9 Title",
    description: "Card 9 Description",
    reviewCount: 3.0,
    isActive: true,
  },
  {
    id: 10,
    title: "Card 10 Title",
    description: "Card 10 Description",
    reviewCount: 2.5,
    isActive: false,
  },
];

function App() {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  function handleCardDelete(id) {
    setCards((prev) => prev.filter((card) => card.id !== id));
  }

  return (
    <div className={styles.wrapper}>
      <Header
        cardItemsCount={cards.length}
        title={"Card List"}
        content={"Some of the cards listing from Slides"}
      />
      <CreateCardForm setCards={setCards} />
      <div className={styles.card__wrapper}>
        {cards.map((card) => (
          <Card handleDelete={handleCardDelete} card={card} key={card.id} />
        ))}
      </div>
      <LoadMore hasMore={false} />
      {/* <Counter /> */}
      {/* <UpdateUser /> */}
    </div>
  );
}

export default App;
