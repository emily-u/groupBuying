// require mongoose + get User model
var mongoose = require('mongoose');
var User = mongoose.model('User');
const UserInfo = mongoose.model("UserInfo");
const Plan = mongoose.model("Plan");
const Group = mongoose.model("Group");

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

  login: (req, res) => {
    User.findOne({email: req.body.email},(err, login_user) => {
      console.log('req.body.email: ', req.body.email);
      if(err){
        console.log("err from login", err);
      }else{
        if(login_user === null){
          res.json({error: "Your Email is invalid, please try again."})
        }else if(login_user.activated == false){
          res.json({error: "Please activate your email by Email.", errorCode:404})
        }else{
          UserInfo.findOne({userId:login_user._id}, (err, userinfo) => {
            if(err){
              console.log("user info err", err);
            }else{
              bcrypt.compare(req.body.password, userinfo.password, (err, resp) => {
                if(resp === true){
                  res.json(login_user)
                }else{
                  res.json({error: "Your password is invalid. Plesse try again"})
                }
              })
            }
          })
        }
      }
    })
  },

  createPlan:(req, res) => {
    User.findOne({_id: req.params.id }, (err, user) => {
      console.log("createPlan in users",req.params.id);
      let newplan = new Plan({
        company: req.body.company,
        costPerMonth: req.body.costPerMonth,
        line: req.body.line,
        withContract: req.body.withContract,
        description: req.body.description,
      });
      newplan.createdBy = user._id;
      newplan.save((err) => {
        if(err){
          console.log(err);
          res.json('can not save user');
        }else{
          res.json({success: "success"});
        }
      })
    })

  },

  getPlans:(req, res) => {
    Plan.find({}, function(err, results){
      if(err){
        res.json({message:"error"});
      }else{
        res.json(results);
      }
    })

  },

  // blank method
  all: function (req, res) {
    // functionality goes here
  }
}