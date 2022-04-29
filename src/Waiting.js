import React from 'react'
import Modal from 'react-bootstrap/Modal'

import './Modal.css'
import './Waiting.css'

export default function Waiting(props) {

    const show = props.show
    const color = props.color
    const countdown = props.countdown
    const hideCountDown = countdown < 0

    const headertext = hideCountDown ?
        "Waiting for players" :
        "Get ready!"


    const header =
        <div className={"modal-header"}>
            <h4 className={"col-12 modal-title"}>
                {headertext}
            </h4>
        </div>

    const body =
        <div className={"modal-body"} id={"waiting-body"} style={{"backgroundColor": color}}>
            <b>Your color is <span style={{"color": color}}>{color}</span></b>
        </div>

    const footer =
        <div className={"modal-footer container"}>
            <p className={"col-12 countdown"} hidden={hideCountDown}>
                Game starts in {countdown} seconds.
            </p>
        </div>

    return (
        <Modal show={show} size={"sm"} centered onHide={() => {
        }}>
            {header}
            {body}
            {footer}
        </Modal>
    )
}