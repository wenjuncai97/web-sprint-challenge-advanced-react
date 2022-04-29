import React, { useState } from 'react'
import axios from 'axios';

const URL = "http://localhost:9000/api/result"

export default function AppFunctional(props) {

  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [totalMoves, setTotalMoves] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const rightHandler = () => {
    if (x < 3) {
      setX(x + 1);
      setTotalMoves(totalMoves + 1);
      setMessage("");
    } else {
      setMessage("You can't go right")
    }
  }

  const leftHandler = () => {
    if (x > 1) {
      setX(x - 1);
      setTotalMoves(totalMoves + 1)
      setMessage("");
    } else {
      setMessage("You can't go left")
    }
  }

  const upHandler = () => {
    if (y > 1) {
      setY(y - 1);
      setTotalMoves(totalMoves + 1);
      setMessage("");
    } else {
      setMessage("You can't go up");
    }
  }

  const downHandler = () => {
    if (y < 3) {
      setY(y + 1);
      setTotalMoves(totalMoves + 1);
      setMessage("");
    } else {
      setMessage("You can't go down");
    }
  }

  const resetHandler = () => {
    setX(2);
    setY(2);
    setTotalMoves(0);
    setEmail("");
    setMessage("");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const newPost = {
      x,
      y,
      steps: totalMoves,
      email,
    };
    axios.post(URL, newPost)
      .then(res => {
        setMessage(res.data.message)
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      })
    setEmail("");
  }

  const emailHandler = (evt) => {
    setEmail(evt.target.value)
  }

  return (
    <div id="wrapper" className={props.className}>
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
        <button onClick={leftHandler} id="left">LEFT</button>
        <button onClick={upHandler} id="up">UP</button>
        <button onClick={rightHandler} id="right">RIGHT</button>
        <button onClick={downHandler} id="down">DOWN</button>
        <button onClick={resetHandler} id="reset">reset</button>
      </div>
      <form onSubmit={submitHandler}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={emailHandler}
          value={email}
        >
        </input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}