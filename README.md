
# Notification Service

this server is user for generation the notification in real time using socket.io and we are using rabbit mq for message broker 

## Setup of brew on Mac

install RabitMQ
you can install it through brew 

brew install rabbitmq 

brew services start rabbitmq


## Setup of brew on  Window

for window installation please follow this link 
https://www.rabbitmq.com/install-windows.html



after installation of bre please follow next step 

for local add your rabbit mq url in rabbitmq js file 
by default it should be => amqp://127.0.0.1

then run npm i commmand to install the node modules 

then npm run start to run the project 


## Tech Stack


**Server:** Node, Express ,Socket.io ,mongoose

