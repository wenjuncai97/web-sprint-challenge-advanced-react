import React from 'react';

export default class AppClass extends React.Component {
  state = {
    currentTurn: 'X',
    totalMoves: 0,
    X: 0,
    O: 0,
    board: ["", "", "", "", "", "", "", "", ""],
    message: '',
  }

  handleTurn = (idx) => {
    if (this.state.board[idx]) {
      this.setState({
        ...this.state, 
        message: "Square already selected, TRY AGAIN!"
      })
    } else {
      const updatedArray = [...this.state.board];
      updatedArray[idx] = this.state.currentTurn;
      const winner = this.determineWinner(updatedArray);
      this.setState({
        ...this.state,
        board: updatedArray,
        currentTurn: this.toggleTurn(this.state.currentTurn),
        totalMoves: this.state.totalMoves + 1,
        X: this.state.currentTurn === 'X' ? this.state.X + 1 : this.state.X,
        O: this.state.currentTurn === 'O' ? this.state.O + 1 : this.state.O,
        message: winner ? `The Winner is ${winner}` : '',
      });
    };
  };

  determineWinner = (board) => {
    let winner;
    board.forEach((val, idx) => {
      if(idx === 0){
        if(board[1] === val && board[2] === val){
          winner = val;
        }
        if(board[4] === val && board[8] === val){
          winner = val;
        }
        if(board[3] === val && board[6] === val){
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

  toggleTurn = (val) => {
    if (val === 'X') {
      return 'O';
    } else {
      return 'X';
    }
  }

  reset = () => {
    this.setState({
      currentTurn: 'X',
      totalMoves: 0,
      X: 0,
      O: 0,
      board: ["", "", "", "", "", "", "", "", ""],
      message: '',
    })
  }

  render() {
    const { className } = this.props

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`It is ${this.state.currentTurn}'s Turn`}</h3>
          <h3 id="steps">Players moved {this.state.totalMoves} times</h3>
          <h3>X moves: {this.state.X}</h3>
          <h3>O moves: {this.state.O}</h3>
        </div>
        <div id="grid">
          {this.state.board.map((val, idx) => {
            return (<div key={idx} onClick={() => this.handleTurn(idx)} className="square">{val}</div>)
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.reset} id="reset">reset</button>
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
}
