'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Research = mongoose.model('Research'),
	_ = require('lodash');

/**
 * Create a research
 */
exports.create = function(req, res) {
	var research = new Research(req.body);
	research.user = req.user;

	research.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(research);
		}
	});
};

/**
 * Show the current research
 */
exports.read = function(req, res) {
	res.json(req.research);
};

/**
 * Update a research
 */
exports.update = function(req, res) {
	var research = req.research;

	research = _.extend(research, req.body);

	research.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(research);
		}
	});
};

/**
 * Delete an research
 */
exports.delete = function(req, res) {
	var research = req.research;

	research.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(research);
		}
	});
};

/**
 * List of Researches
 */
exports.list = function(req, res) {
	Research.find().sort('-created').populate('user', 'displayName').exec(function(err, researches) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(researches);
		}
	});
};

/**
 * Research middleware
 */
exports.researchByID = function(req, res, next, id) {
	Research.findById(id).populate('user', 'displayName').exec(function(err, research) {
		if (err) return next(err);
		if (!research) return next(new Error('Failed to load research ' + id));
		req.research = research;
		next();
	});
};

/**
 * Research authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.research.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};