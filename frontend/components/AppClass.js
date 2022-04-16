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
    if (this.state.x < 3) {
      this.setState({
        ...this.state,
        x: this.state.x + 1,
        totalMoves: this.state.totalMoves + 1,
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go right",
      })
    }
  }

  leftHandler = () => {
    if (this.state.x > 1) {
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
    if (this.state.y > 1) {
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
    if (this.state.y < 3) {
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

  resetHandler = () => {
    this.setState(initialState);
  }

  submitHandler = (e) => {
    e.preventDefault();
    const newPost = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.totalMoves,
      email: this.state.email,
    };
    axios.post(URL, newPost)
      .then(res => {
        this.setState({
          ...this.state,
          message: [...this.state.message,
          res.data.message]
        })
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          message: err.response.data.message
        })
      })
    this.setState({
      email: "",
    })
  }

  emailHandler = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value
    });
  }

  render() {

    const { className } = this.props
    const { x, y, totalMoves, message, email } = this.state

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">{totalMoves === 1 ? `You moved ${totalMoves} time` : `You moved ${totalMoves} times`}</h3>
        </div>
        <div id="grid">
          {x === 1 && y === 1 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 2 && y === 1 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 3 && y === 1 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 1 && y === 2 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 2 && y === 2 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 3 && y === 2 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 1 && y === 3 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 2 && y === 3 ? <div className="square active">B</div> : <div className="square"></div>}
          {x === 3 && y === 3 ? <div className="square active">B</div> : <div className="square"></div>}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.leftHandler} id="left">LEFT</button>
          <button onClick={this.upHandler} id="up">UP</button>
          <button onClick={this.rightHandler} id="right">RIGHT</button>
          <button onClick={this.downHandler} id="down">DOWN</button>
          <button onClick={this.resetHandler} id="reset">reset</button>
        </div>
        <form onSubmit={this.submitHandler}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.emailHandler}
            value={email}
          >
          </input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
