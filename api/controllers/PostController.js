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
			var postid = req.session.id;
			console.log(title);
			console.log(shortdesc);
			console.log(tags);
			console.log(platform);
			console.log(allsteps);
			console.log(username);
			console.log(name);
			console.log(postid);

			// var reply = {
			// 	'status' : 1,
			// 	'message' : 'Sexy'
			// };
			// res.status(200).json(reply);
			var http = require('http'), options = {
				host: "localhost",
				port: 1337,
				path: "/post/createpost?title="+title+"&shortdesc="+shortdesc+"&platform="+platform+"&allsteps="+allsteps+"&tags="+tags+"&username="+username+"&name="+name+"&postid="+postid,
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
					console.log(reply);
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
	}
};
