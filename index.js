const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user')

mongoose.connect('mongodb+srv://mongodb_myTravelGuide:Mongodb@123@react-mern-travel-blog-6kmg7.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser: true}).then(() => console.log("DB is connected"))
                         .catch(err => console.error(err));

app.get('/', (req, res)  => {
res.send("Hello World. This is my First mern boiler plate");
});

app.use(bodyParser.urlencoded({extended : true}) );
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req,res) => {
   const user = new User(req.body);

   user.save((err, userData) => {
       if(err) return res.json({success:false, err})
       return res.json({success: true, status:200})
   })
})

app.listen(port);

