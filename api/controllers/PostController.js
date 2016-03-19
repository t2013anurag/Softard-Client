/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create' : function(req, res) {
		if(req.session.authenticated) {
			var title = req.param('title');
			var shortdesc = req.param('shortdesc');
			var platform = req.param('platform');
			var allsteps = req.param('allsteps');
			var tags = req.param('tags');
			var username = req.session.User.username;
			var name = req.session.User.name;
			name = name.replace(/ /g, '-');
			var http = require('http'), options = {
				host: "localhost",
				port: 1337,
				path: "/post/createpost?title="+title+"&shortdesc="+shortdesc+"&platform="+platform+"&allsteps="+allsteps+"&tags="+tags+"&username="+username+"&name="+name,
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
					req.session.Post = reply.post;
					if(reply.status === 302){
						var reply = {
							'status' : 800,
							'message' : 'Successfully created the post',
							'post' : reply.post
						};
						res.status(200).json(reply);
					} else {
						var reply = {
						 'status' : 101,
						 'message' : 'Could not create the post'
					 };
					 res.status(200).json(reply);
					}
				});
			}); // request finished

		} else {
			var reply = {
				'status' : 2,
				'message' : 'You are not logged in'
			};
			res.status(200).json(reply);
		}
	},

	'edit' : function(req, res) {
		if(req.session.authenticated) {
			var title = req.param('title');
			var shortdesc = req.param('shortdesc');
			var platform = req.param('platform');
			var allsteps = req.param('allsteps');
			var tags = req.param('tags');
			var username = req.session.User.username;
			var name = req.session.User.name;
			var id = req.param('id');
			name = name.replace(/ /g, '-'); // escape sequence resolving
			var http = require('http'), options = {
				host: "localhost",
				port: 1337,
				path: "/post/edit?title="+title+"&shortdesc="+shortdesc+"&platform="+platform+"&allsteps="+allsteps+"&tags="+tags+"&username="+username+"&name="+name+"&id="+id,
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
					req.session.Post = reply.post[0];
					req.session.Post.id = req.session.Post.id;
					if(reply.status === 213){
						var reply = {
							'status' : 802,
							'message' : 'Successfully edited the post',
							'post' : reply.post
						};
						res.status(200).json(reply);
					} else {
						var reply = {
						 'status' : 803,
						 'message' : 'Could not edit the post'
					 };
					 res.status(200).json(reply);
					}
				});
			}); // request finished
		} else {
			var reply = {
				'status' : 804,
				'message' : 'You are not logged in'
			};
			res.status(200).json(reply);
		}
	},
};
