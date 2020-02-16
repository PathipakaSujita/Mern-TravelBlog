const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user')
const config =require('./config/keys.js');

mongoose.connect(config.mongoURI,
 { useNewUrlParser: true,  useUnifiedTopology: true}).then(() => console.log("DB IS connected"))
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

