'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	researches = require('../../app/controllers/researches.server.controller');

module.exports = function(app) {
	// Research Routes
	app.route('/researches')
		.get(researches.list)
		.post(users.requiresLogin, researches.create);

	app.route('/researches/:researcheId')
		.get(researches.read)
		.put(users.requiresLogin, researches.hasAuthorization, researches.update)
		.delete(users.requiresLogin, researches.hasAuthorization, researches.delete);
	
	// Finish by binding the researche middleware
	app.param('researchId', researches.researchByID);
};