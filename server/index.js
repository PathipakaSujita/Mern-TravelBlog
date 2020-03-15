
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user')
const config =require('./config/keys.js');
const { auth } = require('./middleware/auth.js');

mongoose.connect(config.mongoURI,
 { useNewUrlParser: true,  useUnifiedTopology: true}).then(() => console.log("DB IS connected"))
                         .catch(err => console.error(err));

                         app.use(bodyParser.urlencoded({extended : true}) );
                         app.use(bodyParser.json());
                         app.use(cookieParser());
                         

app.get('/', (req, res)  => {
res.send("Hello World. This is my First mern boiler plate");
});


app.get('/api/user/auth', auth , (req, res) => {
    res.status(200).json({
        _id : req._id,
        isAuth : true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role
    })
})

app.post('/api/users/register', (req,res) => {
   const user = new User(req.body);

   user.save((err, userData) => {
       if(err) return res.json({success:false, err});
        res.status(200).json({success: true, userData:userData})
   });
});


app.post('/api/user/login', (req,res) => {
    // find email in db
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) 
        return res.json({
            loginSuccess : false, 
            message: 'Auth Failed- Email not found'
        });
            //compare Password

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
            return res.json({
                loginSuccess: false,
                message:'Auth Failed - wrong password'
            })

            //Generate Token
        user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);
            res
                .cookie("x_auth", user.token)
                .status(200)
                .json({
                        loginSuccess: true,
                        userId: user._id
                });
        });
        });
    });
});


app.get("/api/user/logout", auth, (req, res)=> {
    User.findOneAndUpdate({_id: req.user._id},{token:""}, (err,doc)=> {
        if(err) return res.json({success: false, err});
        return res.status(200).send({success: true});
  });
});

app.listen(port, ()=> {
    console.log(`Server is running at  ${port}`);
});

