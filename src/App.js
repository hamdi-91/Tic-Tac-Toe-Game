import React, { Component } from 'react';
import './App.css';
import { getNodeText } from '@testing-library/react';
import Status from './Status'


class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: Array(9).fill(null),
      player: null,
      winner: null,
    }
  }

  checkhWinner() {
    let winLiness = [
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['0', '4', '8'],
      ['2', '4', '6'],
    ]

    this.checkMatch(winLiness)
  }
  checkMatch(winLiness) {
    for (let index = 0; index < winLiness.length; index++) {
      const [a, b, c] = winLiness[index]
      let board = this.state.board
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert('You won');

        this.setState({
          winner: this.state.player
        })
      }
    }
  }
  handleClick(index) {
    if (this.state.player && !this.state.winner) {
      let newBoard = this.state.board
      if (this.state.board[index] === null) {
        newBoard[index] = this.state.player
        this.setState({
          board: newBoard,
          player: this.state.player === "X" ? "O" : "X"
        })
      }

      this.checkhWinner()
    }
  }

  setPlayer(player) {
    this.setState({
      player
    })
  }

  renderBoxes() {

    return this.state.board.map(
      (box, index) => <div className="box"
        key={index} onClick={() => this.handleClick(index)}>
        {box}</div>)
  }
  reset() {
    this.setState({

      board: Array(9).fill(null),
      player: null,
      winner: null,

    })
  }
  render() {

    return (
      <div className="container">
        <h1>Tic Tac Toe Game</h1>
        <Status player={this.state.player}
          setPlayer={(e) => { this.setPlayer(e) }}
          winner={this.state.winner}
        />
        <div className="board">
          {this.renderBoxes()}
        </div>
        <button onClick={() => this.reset()}> Reset</button>
      </div>
    );
  }
}
export default Square;