import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './Modal.css'
import './GameOver.css'

export default function GameOver(props) {

    const winner = props.winner
    const color = props.color
    const show = props.show

    const header =
        <div className={"modal-header"}>
            <h4 className={"col-12 modal-title"}>
                Game over
            </h4>
        </div>

    const body =
        <div className={"modal-body"} id={"game-over-body"} style={{"backgroundColor": color}}>
            <p><b>{winner} won!</b></p>
        </div>

    const footer =
        <div className={"modal-footer"}>
            <Button className={"mr-auto"} variant={"secondary btn-block"} onClick={() => props.onSubmit()}>
                <b>Start a new game</b>
            </Button>
        </div>

    return (
        <Modal show={show} size={"sm"} onHide={() => {
        }} centered>
            {header}
            {body}
            {footer}
        </Modal>
    )
}