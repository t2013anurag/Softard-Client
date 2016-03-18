/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'authenticate' : function(req, res) {
		if(!req.session.authenticated){

/******************Checking if the user session is valid or not****************/
		 if(req.param('username') && req.param('password')){
			 var username = req.param('username');
			 var password = req.param('password');
/**********************Preparing for the HTTP Request**************************/
			 var http = require('http'), options = {
				 host: "localhost",
				 port: 1337,
				 path: "/user/login?username="+username+"&password="+password,
				 method: "GET"
			 };
			 // To save data received from the http request
			 var data = "";
/***************************Sending the HTTP Request***************************/
			 var request = http.get(options, function(response){
				 response.on('error', function(){
					 console.log('error');
				 });
				 response.on('data', function(chunk){
					 data += chunk;
				 });
				 response.on('end', function(){
					 var reply = data;
					 reply = JSON.parse(reply);
/******************Checking for the status of reply received*******************/
					 // Status code : 105 means users is valid
					 if(reply.status === 105){
						 var user = reply.user;
						 req.session.authenticated = true;
						 req.session.User = user;
						 req.session.reply = reply;
						 //console.log(req.session.User.name);
						 res.redirect('/');
					 } else {
						 req.session.flash = {
							err :	"Sorry, we may've encountered a problem. We are on it!"
						 }
						 res.locals.flash = _.clone(req.session.flash);
						 res.redirect('/login');
					 }
				 });
			 }); // request finished
		 } else { //if improper parameters are passed or parameters not passed
			 console.log("error");
			 res.redirect('/');

		 }
	 } else { // i.e. valid user who is already authenticated
		 res.redirect('/');
	 }
 },

'signup' : function(req, res) {
	if(req.param('username') && req.param('email') && req.param('password') && req.param('name')) {
		var username = req.param('username');
		var email = req.param('email');
		var name = req.param('name');
		var password = req.param('password');
		console.log(username + email + password + name);

		var http = require('http'), options = {
			host: "localhost",
			port: 1337,
			path: "/user/signup?username="+username+"&password="+password+"&email="+email+"&name="+name,
			method: "GET"
		};
		var data = "";
		var request = http.get(options, function(response){
			response.on('error', function(){
				console.log('error');
			});
			response.on('data', function(chunk){
				data += chunk;
			});
			response.on('end', function(){
				var reply = data;
				console.log(reply);
				reply = JSON.parse(reply);
				if(reply.status === 111){
					var user = reply.user;
					req.session.authenticated = true;
					req.session.user = reply.user;
					req.session.User = user;
					res.redirect('/');
				} else {
					res.redirect('/');
				}
			});
		});
	} else {
		res.redirect('/');
	}
},

 'uploadphoto' : function(req, res) {
		if(req.session.authenticated){
		 var username = req.session.User.username;
		 var file = req.param('avatar');
		 var avatarimg = '/assets/images/'+username;
		 var avatarUrl =  require('util').format('%s/user/%s', sails.getBaseUrl(),req.session.User.username);
		 res.setTimeout(0);
			 req.file('avatar')
			 .upload({
				 dirname : '../.../../../assets/images/'+username,
				 saveAs : 'avatar',
				 // You can apply a file upload limit (in bytes)
				 maxBytes: 1000000
			 }, function whenDone(err, uploadedFiles) {
				 if (err) {
					 var reply = {
						 'status' : 120,
						 'message' : 'error'
					 };
					 res.status(200).json(reply);
				 }
			 else {
				 User.update({
				 'username' : username
				 }, {'avatar' : avatarimg, 'avatarUrl' : avatarUrl}, function userUpdated(err, updatedUser){
					 if(err) {
						 var reply = {
							 'status' : 121,
							 'message' : 'An error occured while uploading the photo'
						 };
						 res.status(200).json(reply);
					 } else {
						 var reply = {
							 'status' : 122,
							 'message' : 'Done',
							 'files' : uploadedFiles
						 };
						 res.status(200).json(reply);
					 }
				 });
				 }
			 });
	 } else {
		 var reply = {
			 'status' : 123,
			 'message' : 'oops login'
		 };
		 res.status(200).json(reply);
	 }
 },



 'complain' : function(req, res) {
	 if(req.param('email') && req.param('query') && req.param('name')) {
		 var email = req.param('email');
		 var query = req.param('query');
		 var name = req.param('name');
		 var http = require('http'), options = {
			 host: "localhost",
			 port: 1337,
			 path: "/complain/complain?email="+email+"&query="+query+"&name="+name,
			 method: "GET"
		 };
		 var data = "";
		 var request = http.get(options, function(response){
			 response.on('error', function(){
				 console.log('error');
			 });
			 response.on('data', function(chunk){
				 data += chunk;
			 });
			 response.on('end', function(){
				 var reply = data;
				 reply = JSON.parse(reply);
/******************Checking for the status of reply received*******************/
				 // Status code : 105 means users is valid
				 if(reply.status === 125){
					 //console.log(req.session.User.name);
					 var reply = {
						 'status' : 100,
						 'message' : 'Successfully registered te complain'
					 };
					 res.status(200).json(reply);
				 } else {
					 var reply = {
						'status' : 101,
						'message' : 'Could not register the complain'
					};
					res.status(200).json(reply);
				 }
			 });
		 }); // request finished
	 } else {
		 var reply = {
			 'status' : 102,
			 'message' : 'Please make sure you fill all the fields'
		 };
		 res.status(200).json(reply);
	 }
 },


	 'update' : function(req, res) {
		 if(req.session.authenticated) {
			 var name = req.param('name');
			 console.log(name);
			 var email = req.param('email');
			 var website = req.param('website');
			 var mobile = req.param('mobile');
			 var about = req.param('about');
			 var username = req.session.User.username;

			 var http = require('http'), options = {
				 host : "localhost",
				 port : 1337,
				 path : "/user/updateprofile?username="+username+"&name="+name+"&email="+email+"&website="+website+"&mobile="+mobile+"&about="+about,
				 method : "GET"
			 };
			 var data = "";
			 var request = http.get(options, function(response){
				 response.on('error', function(){
					 console.log('error');
				 });
				 response.on('data' , function(chunk){
					 data += chunk;
				 });
				 response.on('end', function(){
					 var reply = data;
					 reply = JSON.parse(reply);
					  console.log(reply);
					 if(reply.status === 130) {
						 req.session.authenticated = true;
						 req.session.User = reply.user[0];
						 var callerreply = {
							 'status' : 100,
							 'message' : 'Successfully updated the user details'
						 };
						 res.status(200).json(callerreply);
					 }  else {
						 var callerreply = {
							 'status' : 202,
							 'message' : 'An error occured while updating the user details'
						 };
						 res.status(200).json(callerreply);
					 }
				 });
			 });
		 } else {
			 var callerreply = {
				 'status' : 103,
				 'message' : 'Please login'
			 };
			 res.status(200).json(callerreply);
		 }
	 }



};
