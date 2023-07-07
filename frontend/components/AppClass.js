import e from 'cors'
import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}



export default class AppClass extends React.Component {

  state = {
    Message: '',
    Email: '',
    Steps: 0,
    index: 4, // the index the "B" is at
    
    
    //jasmin: true,
  }

  
  //componentDidUpdate = (prevProps, prevState) => {
   // if (prevState.index !== this.state.index){
     // console.log(this.state.index);
   // }
//  }

 // addOne = () => {
   // const newSteps = (this.state.Steps =+ 1)
  //  console.log(newSteps, 'WATERMELON');
   // return (newSteps);
 // }

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    const { index } = this.state
    const x = (index % 3) + 1
    let y
    if (index < 3) y = 1
    else if (index < 6) y = 2
    else if (index < 9) y = 3
    this.state.x = x
    this.state.y = y
    return [x, y]
  }





  // It it not necessary to have a state to track the coordinates.
  // It's enough to know what index the "B" is at, to be able to calculate them.


  getXYMessage = () => {
    const [x, y] = this.getXY()
    return `Coordinates (${x}, ${y})`
    //const Cor = `Coordinates (${this.state.x}, ${this.state.y})`
   // console.log(Cor);
    //return (Cor)


    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }
  
  getTime = () => {
    if(this.state.Steps === 1){
    return `time`
  }else{
    this.state.Steps 
    return 'times'

  }

   }



  reset = () => {
    this.setState({
    Message: '',
    Email:'',
    Steps: 0,
    index: 4
  })
}
  // Use this helper to reset all states to their initial values.
  

  getNextIndex = (direction) => {
    const { index } = this.state
    switch (direction) {
      case 'up':
        return (index < 3) ? index : index - 3
      case 'down':
        return (index > 5) ? index : index + 3
      case 'left':
        return (index % 3 === 0) ? index : index - 1
      case 'right':
        return ((index - 2) % 3 === 0) ? index : index + 1
    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    const direction = evt.target.id
    const nextIndex = this.getNextIndex(direction)

    if (nextIndex !== this.state.index) {
      this.setState({
        ...this.state,
        Steps: this.state.Steps + 1,
        Message: initialMessage,
        index: nextIndex,
       
      })
    } else {
      this.setState({
        ...this.state,
        Message: `You can't go ${direction}`,
      })
    }
  

    //const newSteps= this.Steps + 1
    //this.setState({...this.state,
    //Steps: newSteps});
      }

   down = () => {
    const newIndex = this.getNextIndex('down');
    this.setState({...this.state,
    index: newIndex,
    Steps: this.state.Steps + 1,});
  }

  left = () => {
    const newIndex = this.getNextIndex('left');
    this.setState({...this.state,
    index: newIndex,
    Steps: this.state.Steps + 1,});
  }
   
  right = () => {
    const newIndex = this.getNextIndex('right');
    this.setState({...this.state,
    index: newIndex,
    Steps: this.state.Steps + 1,});
  }


    //const newJasmin = false
//this.setState({...this.state,
//jasmin: newJasmin});
    

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  

  onChange = (evt) => {
    const newEmail = evt.target.value
    console.log(newEmail,'APPLE')
    this.setState({...this.state,
    Email: newEmail,
    //Message: `${evt.target.value}`
  })
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    //debugger;
    evt.preventDefault();
    
    let payload = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.Steps,
      email: this.state.Email
      }
      axios.post("http://localhost:9000/api/result",payload)
      .then((res) => {
        this.setState({
        Message: res.data.message,
       })
       


      console.log(res,'BERRY');
      console.log(res.data.message);
    
    })


    // Use a POST request to send a payload to the server.
    };
    
     
  



  render() {
    const { className } = this.props
    const { Steps } = this.state

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {Steps} {this.getTime()}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.Message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form>
          <input 
          value={this.value}
          onChange={this.onChange}
          id="email" 
          type="email" 
          placeholder="type email"></input>
          <input 
          onClick={this.onSubmit}
          id="submit" 
          type="submit"></input>
        </form>
      </div>
    );
  }
}








