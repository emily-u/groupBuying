// require in your controllers, if we have multiple controllers we require all of them!
var users = require('./../controllers/users.js');
var path = require('path');
var users = require('../controllers/users');

// routing exports a function that takes app
module.exports = function(app){

    app.post("/register", function (req, res) {
        users.register(req,res);
    })

    app.get("/activate_new/:token", function(req, res){
        users.activate(req, res);
    })


    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
    });
};