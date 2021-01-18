const client = require('./index')

module.exports = (raspId, networkId) => {
    const topic = `/raspberry/join/${raspId}`
    console.log(topic)

    const message = {
        networkId
    }
    console.log(message)

    client.publish(topic, message)
}





