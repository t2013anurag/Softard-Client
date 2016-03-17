/**
 * LogoutController
 *
 * @description :: Server-side logic for managing logouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 module.exports = {
 	'index' : function(req, res) {
 		if(req.session.authenticated){
 			req.session.destroy();
 			res.redirect('/'); // If there is an active user session present
 		} else {
 			res.redirect('/'); // If no user session exists
 		}
 	}
 };
