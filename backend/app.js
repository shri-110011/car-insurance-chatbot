const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./user/user.router');
const chatRouter = require('./chat/chat.router');
const carInsuranceRouter  = require('./car-insurance/car-insurance.router');
require('dotenv').config();
const cookie = require('cookie');

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use((req, res, next)=> {
    console.log("Request Type: " + req.method);
    console.log("Request url: " + req.url);
    console.log(req.body);
    next();
})

/* When the angular app and the nodejs backend are on different server we need
this middleware which basically sets up 3 main response headers: 
Access-Control-Allow-Origin
Access-Control-Allow-Headers
Access-Control-Allow-Methods
This is beacuse in this case CORS is happening so browser will send a preflight request
in case of post, delete or patch requests inorder to check that the sever
allows such http methods and the origin of those requests is white listed in the server
or not.

The header Access-Control-Allow-Credentials is required when we want the cross domain 
sharing of cookies. That is if we send a cokkie from http://localhost:3000 to
http://localhost:4200 then when the http request is send from http://localhost:4200
to http://localhost:3000 then the cookie set by http://localhost:3000 won't be
sent along with the http request. In order to make that happen we need this header 
Access-Control-Allow-Credentials set to true.
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Credentials", true);

    /* For the preflight request the request method is of type options. That is why
    we are sending a 200 Ok response in that case because it is issued by browser to 
    see if the CORS protocol is understood and a server is aware using specific 
    methods and headers. */
    if(req.method === "Options") {
        return res.statusCode(200).json();
    }
    next();
})

app.use("/", express.static(path.join(__dirname, '/angular/chatbot-app')));

/* This middleware is used to set the resource path for the static resources that 
reside in the backend server's filesystem.
 */
app.use("/public/images", express.static(path.join(__dirname, 'images')));

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
    if(process.env.PORT) {
        console.log(process.env.PORT);
    }
    console.log("Express server running on port "+app.get('port'));
});