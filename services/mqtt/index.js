const mqtt = require('mqtt')
const client = mqtt.connect(process.env.MQTT_SERVER)


client.on('connect', () => {
    client.subscribe('/raspberry/5f84549779a52c8dc8ffcd35', err => {
        if(!err){
            console.log('Started')
        }else{
            console.error(err)
            console.log('Error on subscribe to topic')
        }
    })
})

//
// client.on('message', function (topic, message) {
//     console.log(topic);
//     console.log(JSON.parse(message.toString()))
// })


module.exports = client