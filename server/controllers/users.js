// require mongoose + get User model
var mongoose = require('mongoose');
var User = mongoose.model('User');
const UserInfo = mongoose.model("UserInfo");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secret = 'groupBuying';

module.exports = {

  // attach methods to our object literal
  register: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log("register err: ", err);
      } else {
        if (!user) {
          var salt = bcrypt.genSaltSync(saltRounds);
          var hashed_password = bcrypt.hashSync(req.body.password, salt);
          var new_user = new User({
            name: req.body.name,
            email: req.body.email,
            isAdmin: false
          })
          new_user.token = jwt.sign({ email: new_user.email }, secret);
          new_user.save((err) => {
            if (err) {
              console.log("new user save err: ", err);
            }
            else {
              var userinfo = new UserInfo({
                password: hashed_password,
                userId: new_user.id
              })

              userinfo.save((err) => {
                if (err) {
                  console.log("userinfo save err:", err);
                } else {
                  var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: 'emilyyuproject@gmail.com',
                      pass: 'groupbuying'
                    }
                  });

                  var content = `
                    <h2>Hello ${new_user.name},</h2>
                    <p>You have opened a new account in group buying. </p><br>
                    <a href="http://localhost:8000/activate/${new_user.token}">Please activate your account here: Activate</a>
                    <h3>GroupBuying team</h3>
                    `
                  var mailOptions = {
                    from: 'emilyyuproject@gmail.com',
                    to: new_user.email,
                    subject: 'Your new GroupBuying account',
                    html: content
                  };
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Email sent: ", info.response);
                    }
                  });
                  res.json({success:'register pending'})
                }
              })
            }
          });
        } else {
          res.json({ error: "This email has been used for register" })
        }
      }
    })
  },

  activate: (req, res) => {
    User.findOne({token:req.params.token}, (err, user)=>{
      if(err){
        console.log(err);
      }else{
        user.activated = true;
        user.save((err) => {
          res.json({user: user});
        })
      }
    })
  },

  // blank method
  all: function (req, res) {
    // functionality goes here
  }
}