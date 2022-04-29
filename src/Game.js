import React, {Component} from 'react'

import PlayerNameSelection from "./PlayerNameSelection";
import PlayerCountSelection from "./PlayerCountSelection";
import Waiting from "./Waiting";
import GameOver from "./GameOver";
import Client from './comm/client'
import Board from './Board'

import * as Constants from './constants'

import './Game.css'

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.keyPressed = null
        this.sendKeyPressed = false
        this.state = {
            showPlayerNameSelection: true,
            showPlayerCountSelection: false,
            showWaiting: false,
            showGameOver: false,
            playerColor: "",
            playerName: "",
            winner: "",
            winnerColor: "",
            countdown: -1,
            squares: Array(Constants.BOARD_ROWS * Constants.BOARD_COLS).fill('white'),
        }
        this.defaultState = this.state;
    }

    componentDidMount() {
        Client.connect(
            (squares) => this.updateSquares(squares),
            (name, color) => this.gameOver(name, color),
            (color) => this.setPlayerColor(color),
            (count) => this.countdown(count)
        )

        document.addEventListener("keydown", this.onKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown)
    }

    updateSquares = (squares) => {
        const update = this.state.squares.slice()
        squares.map(sq => update[sq.index] = sq.color)
        this.setState({
            squares: update,
        })
    }

    onKeyDown = (event) => {
        const keyPressed = event.key
        const direction = keyPressed.split("Arrow")[1]

        if (this.sendKeyPressed && direction !== undefined && keyPressed !== this.keyPressed) {
            this.keyPressed = keyPressed
            Client.sendDirection(direction.toUpperCase())
        }
    }

    selectPlayerName = () => {
        this.setState({
            showPlayerNameSelection: false,
            showPlayerCountSelection: true,
        })
    }

    selectPlayerCount = (count) => {
        this.setState({
            showPlayerCountSelection: false,
            showWaiting: true,
        })
        Client.sendJoinGame(this.state.playerName, count)
    }

    setPlayerName = (name) => {
        this.setState({
            playerName: name,
        })
    }

    checkEnter = (event) => {
        if(event.key === "Enter") {
            this.selectPlayerName()
        }
    }

    setPlayerColor = (color) => {
        this.setState({
            playerColor: color,
        })
    }

    countdown = (count) => {
        this.setState({
            countdown: count,
            showWaiting: count > 0,
        })
        this.sendKeyPressed = count === 0;
    }

    gameOver = (playerName, color) => {
        this.sendKeyPressed = false
        this.setState({
            showGameOver: true,
            winner: playerName,
            winnerColor: color,
            countdown: -1,
        })
    }

    showWelcome = () => {
        this.setState(
            {...this.defaultState}
        )
    }

    render() {
        const squares = this.state.squares.slice()
        const showPlayerNameSelection = this.state.showPlayerNameSelection
        const showPlayerCountSelection = this.state.showPlayerCountSelection
        const showWaiting = this.state.showWaiting
        const showGameOver = this.state.showGameOver
        const playerColor = this.state.playerColor
        const playerName = this.state.playerName
        const countdown = this.state.countdown
        const winner = this.state.winner
        const winnerColor = this.state.winnerColor

        return (
            <div className={"Game container"}>
                <PlayerNameSelection show={showPlayerNameSelection} name={playerName}
                                     onChange={(name) => this.setPlayerName(name)}
                                     checkEnter={(event) => this.checkEnter(event)}
                                     onSubmit={() => this.selectPlayerName()}/>
                <PlayerCountSelection show={showPlayerCountSelection}
                                      onSubmit={(count) => this.selectPlayerCount(count)}/>
                <Waiting show={showWaiting} color={playerColor} countdown={countdown}/>
                <Board squares={squares}/>
                <GameOver show={showGameOver} winner={winner} color={winnerColor} onSubmit={() => this.showWelcome()}/>
            </div>
        )
    }
}
