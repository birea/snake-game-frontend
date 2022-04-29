import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './Modal.css'
import './PlayerNameSelection.css';

export default function PlayerNameSelection(props) {

    const show = props.show
    const name = props.name

    const header =
        <div className={"modal-header"}>
            <h4 className={"col-12 modal-title"}>
                Instructions
            </h4>
        </div>

    const body =
        <div className={"modal-body"} id={"player-name-selection-body"}>
            <p id={"game-description"}>
                <b>
                    Use the arrow keys.<br/>
                    Beware of other snakes.
                </b>
            </p>
            <input type={"text"} id={"text-input-name"} className={"form-control shadow-none"} autoFocus={true}
                   value={name} placeholder={"Enter name"} onKeyDown={(e) => props.checkEnter(e)} onChange={(e) => {
                let val = e.target.value
                val = val.length > 15 ? val.substr(0, 15) : val
                props.onChange(val)
            }}/>
        </div>

    const footer =
        <div className={"modal-footer"} id={"welcome-footer"}>
            <Button className={"mr-auto btn"} variant={"secondary btn-block"} onClick={() => props.onSubmit()}>
                <b>Join Game</b>
            </Button>
        </div>

    return (
        <Modal centered show={show} size={"sm"} onHide={() => {
        }}>
            {header}
            {body}
            {footer}
        </Modal>
    )
}
