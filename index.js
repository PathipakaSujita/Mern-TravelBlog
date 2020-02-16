const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://mongodb_myTravelGuide:Mongodb@123@react-mern-travel-blog-6kmg7.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser: true}).then(() => console.log("DB is connected"))
                         .catch(err => console.error(err));

app.get('/', (req, res)  => {
res.send("Hello World. This is my First mern boiler plate");
});

app.listen(port);