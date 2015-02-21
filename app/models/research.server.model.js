'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Research Schema
 */
var ResearchSchema = new Schema({
	python_id: {
		type: Number,
		default: 0
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	description: {
		type: String,
		default: '',
		trim: true,
	},
	duration: {
		type: Number,
		default: 1
	},
	created: {
		type: Date,
		default: Date.now
	},
	words: {
		type: Array,
		default: []
	},
	size: {
		type: Number,
		default: 0
	},
	positive_emotion: {
		type: Number,
		default: 0
	},
	negative_emotion: {
		type: Number,
		default: 0
	},
	neutral_emotion: {
		type: Number,
		default: 0
	},
	positive_dictio: {
		type: Array,
		default: []
	},
	negative_dictio: {
		type: Array,
		default: []
	},
	tweets: {
		type: Array,
		default: []
	}
});

mongoose.model('Research', ResearchSchema);
