export default class Message {
    constructor() {
        this.content = {}
    }

    append = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.content[key] = obj[key]
            }
        }
        return this
    }

    asJson = () => {
        return JSON.stringify(this.content)
    }
}