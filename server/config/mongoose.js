// mongoose connect file starts up all our models
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

// and connects to the proper DB
mongoose.connect('mongodb://localhost/groupbuying');

// make sure we point to the proper location of models
var models_path = __dirname + '/../models'

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})