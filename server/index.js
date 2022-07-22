const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./config/config");
const MongoDBConnect = require("./MongoDBConnect");
require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { Server } = require("socket.io");

const corsOptions = {
  origin: "*",
  credential: true,
  optionsSuccessStatus: 200,
};
MongoDBConnect();
app.use(cors(corsOptions));
app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/user"));
app.use(require("./routes/posts"));

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server has been started on port ${PORT}`.yellow.bold)
);

const io = new Server(server, {
  pingTimeout: 1000,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io", socket.id);
  // socket.on("setup", (userData) => {
  //   console.log(userData);
  //   socket.emit("connected");
  // });
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
