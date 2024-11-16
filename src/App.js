import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png" , matched: false },
  { "src": "/img/sword-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState (null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState (false)


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
  useEffect(() => {    
    if (choiceOne && choiceTwo) {
      setDisabled(true) 
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) { // Changed from choiceOne.id to choiceOne.src for matching
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn()
      } else {
         setTimeout(() =>  resetTurn(), 1000);
      }      
    }
  }, [choiceOne, choiceTwo]);

  console.log (cards);

// Reset Choices and Increase Turns

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevturns => prevturns + 1);
    setDisabled (false)
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
          <SingleCard
           key={card.id} 
           card={card} 
           handleChoice={handleChoice}
           flipped={card === choiceOne || card === choiceTwo || card.matched}
           disabled={disabled}/>
        ))}
      </div>
    </div>
  );
}

export default App;