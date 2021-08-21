const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./user/user.router');
const chatRouter = require('./chat/chat.router');
const carInsuranceRouter  = require('./car-insurance/car-insurance.router');
require('dotenv').config();

app.set('port', process.env.Server_Port || 3001);

app.use(express.json());

app.use("/", express.static(path.join(__dirname, '/angular/chatbot-app')));
app.use("/images", express.static(path.join(__dirname, 'images')));

app.get('/', (req, res)=>{
    console.log("Inside /");
    res.sendFile(path.join(__dirname, "/angular/chatbot-app", "index.html"));
});

app.use("/chat", chatRouter);

app.use("/user", userRouter);

app.use("/car-insurance", carInsuranceRouter);

// Code to serve the same index.html file on entering any other route.
app.get("/*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/angular/chatbot-app", "index.html"));
});

//Code to create the local server
app.listen(app.get("port"), ()=>{
    console.log(process.env.Server_Port);
    console.log("Express server running on port "+app.get('port'));
});