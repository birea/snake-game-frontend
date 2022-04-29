import React from 'react'
import Button from 'react-bootstrap/Button'

import './PlayerCountButton.css'

export default function PlayerCountButton(props) {

    const count = props.count

    return (
       <Button className={"playerCountButton"} onClick={() => props.onSubmit(count)}>
           {count}
       </Button>
    )

}
