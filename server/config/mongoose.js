// mongoose connect file starts up all our models
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

// and connects to the proper DB
mongoose.connect('mongodb://localhost/groupbuying');

// make sure we point to the proper location of models
var models_path = __dirname + '/../models'

fs.readdirSync(models_path).forEach(function (file) {
	if (file.indexOf('.js') > 0) {
		require(models_path + '/' + file);
	}
})

const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'Dojo2017';

// IMPORT dummy users data FROM 'dummy_users' file IN THIS DIRECTORY:
const users = require('./dummy_users');

const User = mongoose.model('User');
const userInfo = mongoose.model('UserInfo');
function addAccount(user) {
	bcrypt.hash(user.password, saltRounds).then((hash) => {
		User.create({
			name: "Emily Yu",
			email: user.email,
			isAdmin: true,
			activated: true
		}).then(result =>
			userInfo.create({
				password: hash,
				userId: result._id,
			}));
	});
}

function addDummyAccounts(dummyUsers) {
	dummyUsers.forEach((user) => {
		addAccount(user);
	});
}

User.findOne({ email: 'emilyyuproject@gmail.com' }, (error, result) => {
	if (error) {
		console.log("In mongoose file with error on find user email method:", error);
	} else if (!result) {
		addDummyAccounts(users);
	}
});
