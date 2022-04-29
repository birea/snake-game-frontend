import React from 'react'

import Square from "./Square"
import * as Constants from './constants'

import './Board.css'

export default function Board(props) {

    const squares = props.squares.map((color, index) => {
        return <Square key={index} index={index} color={color}/>
    })

    return (
        <div className={"board"}>
            <svg viewBox={"0 0 " + Constants.BOARD_COLS + " " + Constants.BOARD_ROWS}>
                <g>
                    {squares}
                </g>
            </svg>
        </div>
    )
}