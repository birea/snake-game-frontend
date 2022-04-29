import SockJS from 'sockjs-client'
import Stomp from 'stomp-websocket'

import Message from './message'

const serverIP = "lorenzjosten.de"
// const serverPort = "7070"
// const serverAddress = "http://" + serverIP + ":" + serverPort + "/sockjs"
const serverAddress = "https://" + serverIP + "/sockjs"

const sockJS = new SockJS(serverAddress)
const stompSocket = Stomp.over(sockJS)

class Client {
    connect = (updateSquares, gameOver, setPlayerColor, countdown) => {
        stompSocket.connect({}, (frame) => {

            stompSocket.subscribe('/user/client/update_squares', (message) => {
                const squares = JSON.parse(message.body)
                updateSquares(squares)
            });

            stompSocket.subscribe('/user/client/game_over', (message) => {
                const {name, color} = JSON.parse(message.body)
                gameOver(name, color)
            })

            stompSocket.subscribe('/user/client/get_color', (message) => {
                const {color} = JSON.parse(message.body)
                setPlayerColor(color)
            })

            stompSocket.subscribe('/user/client/countdown', (message) => {
                const {count} = JSON.parse(message.body)
                countdown(parseInt(count, 10))
            })
        })
    }

    sendJoinGame = (playerName, playerCount) => {
        let message = new Message().append({playerName: playerName}).append({playerCount: playerCount}).asJson()
        stompSocket.send('/server/join', {credentials: 'include'}, message)
    }

    sendDirection = (direction) => {
        if (stompSocket.connected) {
            let message = new Message()
                .append({direction: direction})
                .asJson()
            stompSocket.send("/server/direction", {credentials: 'include'}, message)
        }
    }
}

let client = new Client()
Object.freeze(client)

export default client
