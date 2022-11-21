import Die from "./die"
import { useState } from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'



function App() {

  const [numList,setNumlist] = useState(allNewDice())
  const [tenzies,setTenzies] = useState(false)
  
  useEffect(()=>{
    const allHeld = numList.every (die=> die.isHeld ) 
    const firstvalue = numList[0].value
    const allsamevalue = numList.every(die => die.value === firstvalue)
    if (allHeld && allsamevalue) {
      setTenzies(true)
      console.log("you won");
    }
  }, [numList])

  function allNewDice () {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
 
  const diceElements = numList.map(die => <Die
    key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}
    />)

  function holdDice(id){
    setNumlist(oldNumList => oldNumList.map(die =>{
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setNumlist(oldNumList => oldNumList.map(die =>{
        return die.isHeld ?
          die:
          generateNewDie()
      }))
    }else {
      setTenzies(false)
      setNumlist(allNewDice)
    }
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random()* 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function useWindowSize(){
    const [size, setSize]= useState ([window.innerHeight,window.innerWidth])
    return size
  }
  
  const [height,width] = useWindowSize();

  return (
  
    <main className="tenzies">
      {tenzies &&  
        <Confetti
        width={width}
        height={height}
       />
      }
      <h1 className="title">Tenzies</h1>
      <p className="explanation">Roll until all dice are the same. Click <br /> each die to freeze it at its current value <br /> between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button  className="roll-but" onClick={rollDice}>{tenzies ? "New Game" : "ROLL"}</button>
    </main>
  );
}

export default App;
