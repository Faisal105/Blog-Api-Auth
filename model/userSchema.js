const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: String,
});
module.exports = mongoose.model('users', userSchema);
