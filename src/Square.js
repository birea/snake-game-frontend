import React, {Component} from 'react'

import * as Constants from './constants'

import './Square.css'

export default class Square extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.color !== nextProps.color
    }

    render() {
        const index = this.props.index
        const color = this.props.color
        const x = index % Constants.BOARD_COLS
        const y = (index - (index % Constants.BOARD_COLS)) / Constants.BOARD_COLS

        return (
            <rect className={"square"} x={x} y={y} width={1} height={1} style={{fill: color}}/>
        )
    }
}