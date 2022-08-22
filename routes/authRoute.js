const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Login routes
router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			next({ status: 404, message: 'Username or password is wrong' });
		}

		const dbPwd = user.password;
		const isSamePassword = await bcrypt.compare(password, dbPwd);

		if (isSamePassword) {
			const jsonPayload = {
				name: user.name,
				id: user._id,
				email: user.email,
			};
			const token = jwt.sign(jsonPayload, process.env.SECRET_KEY, {
				expiresIn: '3d',
			});
			res.json({ message: 'Login successful', token });
		} else {
			next({ status: 404, message: 'Username or password is wrong' });
		}
	} catch (error) {
		console.log(error.message);
		next({ status: 500, message: error.message });
	}
});

//register users route
router.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;
	let emailExist = await User.findOne({ email });
	if (emailExist) {
		return res.status(400).send('User already registered.');
	}

	const encPassword = bcrypt.hashSync(password, 10);

	try {
		const newUser = await User.create({ name, email, password: encPassword });
		res.json({ users: newUser });
	} catch (error) {
		console.log(error.message);
		next({ status: 500, message: error.message });
	}
});

module.exports = router;
