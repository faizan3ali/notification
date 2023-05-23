const amqp = require("amqplib");
const notifications = require("../controller/notifications")

/**
 * connectQueue
 *
 *connection to the main server  
 */
 exports.connectQueue = async () => {
    try {
        connection = await amqp.connect("amqp://127.0.0.1");
        channel    = await connection.createChannel()
        
        await channel.assertQueue("notifications")
        
        channel.consume("notifications", data => {
            let message= `${Buffer.from(data.content)}`
            channel.ack(data);//acknowledge the main server
             message=JSON.parse(data.content)

            switch (message.category) {
                case "task":
                    notifications.addTaskNotifications(message)
                    break;
            
                default:
                    break;
            }

        })
    } catch (error) {
        console.log(error);
    }
}