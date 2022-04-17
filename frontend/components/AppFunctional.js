import React, { useState } from 'react'

export default function AppFunctional(props) {

  const [state, setState] = useState({
    currentTurn: 'X',
    totalMoves: 0,
    X: 0,
    O: 0,
    board: ["", "", "", "", "", "", "", "", ""],
    message: '',
  })

  const handleTurn = (idx) => {
    if (state.board[idx]) {
      setState({
        ...state, 
        message: "Square already selected, TRY AGAIN!"
      })
    } else {
      const updatedArray = [...state.board];
      updatedArray[idx] = state.currentTurn;
      const winner = determineWinner(updatedArray);
      setState({
        ...state,
        board: updatedArray,
        currentTurn: toggleTurn(state.currentTurn),
        totalMoves: state.totalMoves + 1,
        X: state.currentTurn === 'X' ? state.X + 1 : state.X,
        O: state.currentTurn === 'O' ? state.O + 1 : state.O,
        message: winner ? `The Winner is ${winner}` : '',
      });
    };
  };

  const determineWinner = (board) => {
    let winner;
    board.forEach((val, idx) => {
      if(idx === 0){
        if(board[1] === val && board[2] === val){
          winner = val;
        }
        if(board[4] === val && board[8] === val){
          winner = val;
        }
        if(board[3] === val && board[8] === val){
          winner = val;
        }
      }
      if(idx === 1){
        if(board[4] === val && board[7] === val){
          winner = val;
        }
      }
      if(idx === 2){
        if(board[4] === val && board[6] === val){
          winner = val;
        }
        if(board[5] === val && board[8] === val){
          winner = val;
        }
      }
      if(idx === 3){
        if(board[4] === val && board[5] === val){
          winner = val;
        }
      }
      if(idx === 6){
        if(board[7] === val && board[8] === val){
          winner = val;
        }
      }
    })
    return winner;
  }

  const toggleTurn = (val) => {
    if (val === 'X') {
      return 'O';
    } else {
      return 'X';
    }
  }

  const reset = () => {
    setState({
      currentTurn: 'X',
      totalMoves: 0,
      X: 0,
      O: 0,
      board: ["", "", "", "", "", "", "", "", ""],
      message: '',
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">{`It is ${state.currentTurn}'s Turn`}</h3>
          <h3 id="steps">Players moved {state.totalMoves} times</h3>
          <h3>X moves: {state.X}</h3>
          <h3>O moves: {state.O}</h3>
        </div>
        <div id="grid">
          {state.board.map((val, idx) => {
            return (<div key={idx} onClick={() => handleTurn(idx)} className="square">{val}</div>)
          })}
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={reset} id="reset">reset</button>
        </div>
        <form>
          <input
            id="email"
            type="email"
            placeholder="type email"
          >
          </input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}