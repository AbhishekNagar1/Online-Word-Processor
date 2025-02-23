const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const authRouter = require("./routes/auth");
const documentRouter = require("./routes/document");
const Document = require("./models/document");

const PORT = process.env.PORT || 3001;

const app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(authRouter);
app.use(documentRouter);

const DB = "mongodb+srv://AbhishekNagar1:hello12@cluster0.qw9psgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(DB)
    .then(() => {
        console.log("Connection successful!");
    })
    .catch((err) => {
        console.log(err);
    });

io.on("connection", (socket) => {
    socket.on("join", (documentId) => {
        socket.join(documentId);
        console.log("joined!");
    });

    socket.on("typing", (data) => {
        socket.broadcast.to(data.room).emit("changes", data);
    });

    socket.on("save", (data) => {
        saveData(data);
    });

});

const saveData = async (data) => {
  let document = await Document.findById(data.room);
  document.content = data.delta;
  document = await document.save();
};

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected at port ${PORT}`);
});
