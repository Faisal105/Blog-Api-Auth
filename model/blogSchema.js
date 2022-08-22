const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	title: String,
	content: String,
	authorDetail: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	PostedAt: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model('blogs', blogSchema);
