import { useEffect, useState } from "react";

export default function MemoryGame() {
  const [cards, setCards] = useState(generateGrid());
  const [isLock, setIslock] = useState(false);
  const [FlippedCard, setFlippedCard] = useState([]);

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLock) {
      //avoiding duplicates click
      return;
    }
    const copyCards = [...cards];
    copyCards[index].isFlipped = true;
    setCards(copyCards);
    setFlippedCard([...FlippedCard, index]);
  };

  useEffect(() => {
    if (FlippedCard.length === 2) {
      setIslock(true); //we can't click anymore
      //but after 3s will everything as before
      setTimeout(() => {
        if (cards[FlippedCard[0]].number !== cards[FlippedCard[1]].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[FlippedCard[0]].isFlipped = false;
            copyCards[FlippedCard[1]].isFlipped = false;
            return copyCards;
          });
        }
        setIslock(false);
        setFlippedCard([]);
      }, 3000);
    }
  }, [FlippedCard]);
  return (
    <div className="grid-container">
      {cards.map(({ id, number, isFlipped }) => {
        return (
          <button className="card" onClick={() => handleClick(id)} key={id}>
            {isFlipped ? number : "?"}
          </button>
        );
      })}
    </div>
  );
}

function generateGrid() {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);
  const cards = grid.map((item, index) => {
    return { id: index, number: item, isFlipped: false };
  });
  return cards;
}
