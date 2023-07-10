//import React from 'react'
import React, {useState, useEffect} from 'react'
import axios from "axios";

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
   const [message, setInitialMessage] = useState(initialMessage)
   const [email, setInitialEmail] = useState(initialEmail)
   const [steps, setInitialSteps] = useState(initialSteps)
   const [index, setInitialIndex] = useState(initialIndex)


  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    const x = (index % 3) + 1
    let y
    if (index < 3) y = 1
    else if (index < 6) y = 2
    else if (index < 9) y = 3
    return [x, y]

    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const [x, y] = getXY()
    return `Coordinates (${x}, ${y})`
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }
  
   function getTime() {
    if(steps === 1){
    return `time`
  }else{
    steps 
    return 'times'

  }

   }






  function reset() {
      setInitialMessage(initialMessage)
      setInitialEmail(initialEmail)
      setInitialSteps(initialSteps)
      setInitialIndex(initialIndex)
      
  }
     
    
    // Use this helper to reset all states to their initial values.
  

  function getNextIndex(direction) {
    switch (direction) {
      case 'up':
        return (index < 3) ? index : index - 3
      case 'down':
        return (index > 5) ? index : index + 3
      case 'left':
        return (index % 3 === 0) ? index : index - 1
      case 'right':
        return ((index - 2) % 3 === 0) ? index : index + 1
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }
}

  function move(evt) {
    const direction = evt.target.id
    const nextIndex = getNextIndex(direction)

    if (nextIndex !== index) {
      
        setInitialSteps(steps + 1)
        setInitialMessage(initialMessage)
        setInitialIndex(nextIndex)
       
      
    } else {
      
        setInitialMessage(`You can't go ${direction}`)
      }
    }
    
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    

  function onChange(evt) {
    const newEmail = evt.target.value
    console.log(newEmail,'APPLE')
    setInitialEmail(newEmail)
    
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    evt.preventDefault();
     const [x, y] = getXY()
      axios.post("http://localhost:9000/api/result",{ email, steps, x, y })
      .then((res) => {
        setInitialMessage(res.data.message)
        setInitialEmail(initialEmail)
       
       //console.log(res.data,'BERRY');
       //console.log(res.data.message);
      })
      .catch((err) => {
    
          setInitialMessage(err.response.data.message)
        
      //console.log(err,'FRUIT');
      //console.log(err.response.data.message);
        });
    
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {getTime()}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset}id="reset">reset</button>
      </div>
      <form>
        <input 
        value = {email}
        onChange={onChange}
        id="email" 
        type="email" 
        placeholder="type email"></input>
        <input 
        onClick={onSubmit}
        id="submit" 
        type="submit"></input>
      </form>
    </div>
  )
}
