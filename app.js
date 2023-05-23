const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./dbconnection");
const rabbitMQ = require("./api/services/rabbitmq");
connectDB();
const cors = require("cors");
app.use(cors());
try {
  rabbitMQ.connectQueue(); // call the connect function
} catch (error) {
  console.log("connection error",error)
}


const http = require("http").createServer(app);

const port = process.env.PORT || 5002;

const io = require("socket.io")(http, {
  cors: {
    origins: "*",
  },
});
var sockets_buckets = [];
function getSocketBucketByUserID(user_id) {
  if (Array.isArray(sockets_buckets) && user_id) {
    var socket_bucket = sockets_buckets.find(function (socket_bucket) {
      return socket_bucket._id.toString() === user_id.toString();
    });
    return socket_bucket;
  } else {
    sockets_buckets = [];
  }
}

function getSocketBucketByUserID(user_id) {
  if (Array.isArray(sockets_buckets) && user_id) {
    var socket_bucket = sockets_buckets.find(function (socket_bucket) {
      return socket_bucket._id.toString() === user_id.toString();
    });
    return socket_bucket;
  } else {
    sockets_buckets = [];
  }
}

function getSocketBucketBySocketID(socket_id) {
  var socket_bucket = sockets_buckets.find(function (socket_bucket) {
    var index = socket_bucket.sockets.indexOf(socket_id);
    if (index > -1) {
      return true;
    }
  });
  return socket_bucket;
}

io.on("connection", (socket) => {
  // Disconnection of socket
  socket.on("disconnect", () => {
    sockets_buckets.find(function (socket_bucket) {
      var index = socket_bucket.sockets.indexOf(socket.id);
      if (index > -1) {
        socket_bucket.sockets.splice(index, 1);
        return true;
      }
    });
  });

  socket.on("register", (payload) => {
    var socketBucket = getSocketBucketByUserID(payload._id);
    if (!socketBucket) {
      socketBucket = {
        _id: payload._id,
        rooms: [],
        sockets: [socket.id],
      };
      sockets_buckets.push(socketBucket);
    } else {
      if (!Array.isArray(socketBucket.sockets)) {
        socketBucket.sockets = [];
      }
      socketBucket.sockets.push(socket.id);
    }
  });
});

process.on("notification", async (payload) => {
  var recipientSocket = getSocketBucketByUserID(payload.user);
  if (recipientSocket && Array.isArray(recipientSocket.sockets)) {
    recipientSocket.sockets.forEach((socket_id) => {
      io.to(socket_id).emit("notification", payload.notification);
    });
  }
});
http.listen(port, () => {
  console.log("listening on :" + port);
});
