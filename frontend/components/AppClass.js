import React from 'react';
import axios from 'axios';

const URL = "http://localhost:9000/api/result"

const initialState = {
  x: 2,
  y: 2,
  totalMoves: 0,
  message: '',
  email: '',
}

export default class AppClass extends React.Component {

  state = initialState;

  rightHandler = () => {
    if(this.state.x < 3){
      this.setState({
        ...this.state,
        x: this.state.x + 1,
        totalMoves: this.state.totalMoves +1,
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go right",
      })
    }
  }

  leftHandler = () => {
    if(this.state.x > 1) {
      this.setState({
        ...this.state,
        x: this.state.x - 1,
        totalMoves: this.state.totalMoves + 1,
        message: '',
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go left",
      })
    }
  }

  upHandler = () => {
    if(this.state.y > 1){
      this.setState({
        ...this.state,
        y: this.state.y - 1,
        totalMoves: this.state.totalMoves + 1,
        message: '',
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go up",
      })
    }
  }

  downHandler = () => {
    if(this.state.y < 3){
      this.setState({
        ...this.state,
        y: this.state.y + 1,
        totalMoves: this.state.totalMoves + 1,
        message: '',
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go down",
      })
    }
  }

  render() {

    const { className } = this.props
    const {x, y, totalMoves, message, email} = this.state

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {totalMoves} times</h3>
        </div>
        <div id="grid">
          <div className={x === 1 && y === 1 ? "square active" : "square"}>
            {x === 1 && y === 1 ? "B" : ""}
          </div>
          <div className={x === 2 && y === 1 ? "square active" : "square"}>
            {x === 2 && y === 1 ? "B" : ""}
            </div>
          <div className={x === 3 && y === 1 ? "square active" : "square"}>
            {x === 3 && y === 1 ? "B" : ""}
            </div>
          <div className={x === 1 && y === 2 ? "square active" : "square"}>
            {x === 1 && y === 2 ? "B" : ""}
          </div>
          <div className={x === 2 && y === 2 ? "square active" : "square"}>
            {x === 2 && y === 2 ? "B" : ""}
            </div>
          <div className={x === 3 && y === 2 ? "square active" : "square"}>
            {x === 3 && y === 2 ? "B" : ""}
            </div>
          <div className={x === 1 && y === 3 ? "square active" : "square"}>
            {x === 1 && y === 3 ? "B" : ""}
            </div>
          <div className={x === 2 && y === 3 ? "square active" : "square"}>
            {x === 2 && y === 3 ? "B" : ""}
            </div>
          <div className={x === 3 && y === 3 ? "square active" : "square"}>
            {x === 3 && y === 3 ? "B" : ""}
            </div>
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.leftHandler} id="left">LEFT</button>
          <button onClick={this.upHandler} id="up">UP</button>
          <button onClick={this.rightHandler} id="right">RIGHT</button>
          <button onClick={this.downHandler} id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
