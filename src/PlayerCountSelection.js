import React from 'react'
import Modal from 'react-bootstrap/Modal'

import PlayerCountButton from "./PlayerCountButton"

import './Modal.css'
import './PlayerCountSelection.css'

export default function PlayerCountSelection(props) {

    const header =
        <div className={"modal-header"}>
            <h4 className={"col-12 modal-title"}>
                Amount of Players
            </h4>
        </div>

    const body =
        <div className={"modal-body"} id={"player-count-selection-body"}>
            <PlayerCountButton count={2} onSubmit={(count) => props.onSubmit(count)}/>
            <PlayerCountButton count={3} onSubmit={(count) => props.onSubmit(count)}/>
            <PlayerCountButton count={4} onSubmit={(count) => props.onSubmit(count)}/>
        </div>

    const footer =
        <div className={"modal-footer"}>
        </div>

    return (
        <Modal show={props.show} size={"sm"} onHide={() => {}} centered>
            {header}
            {body}
            {footer}
        </Modal>
    )
}
