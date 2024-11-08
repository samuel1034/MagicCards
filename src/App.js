import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/sword-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState (null)
  const [choiceTwo, setChoiceTwo] = useState(null)


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };


  // Handle a Choice

  const handleChoice = (card) => {

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  //Compare 2 selected cards
useEffect (() => {
  if (choiceOne && choiceTwo) {
    setTurns(turns + 1);
    if (choiceOne.src === choiceTwo.src) {
      console.log("You got a match");
      resetTurn();
    } else {
      console.log("No match, try again");
      resetTurn();
    }
  }    
},[choiceOne,choiceTwo])

// Reset Choices and Increase Turns

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevturns => prevturns + 1);
  }


  // Shuffle cards when the component mounts
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}/>
        ))}
      </div>
    </div>
  );
}

export default App;