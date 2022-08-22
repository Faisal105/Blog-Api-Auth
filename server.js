const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const blogRoute = require('./routes/blogRoute');
const authRoute = require('./routes/authRoute');
const jwt = require('jsonwebtoken');
app.use(cors());
const dotenv = require('dotenv');
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());

//midleware to authorize token

const authmiddleware = (req, res, next) => {
	const secretKey = process.env.SECRET_KEY;
	const token = req.header('Authorization') || '';
	if (!token) {
		res.json({ message: 'unautgorized token' });
	}
	const decode = jwt.decode(token, secretKey);
	if (!decode) {
		res.json({ message: 'unautgorized token' });
	}
	console.log(decode);
	req.user = decode;
	next();
};

app.use('/blog', authmiddleware, blogRoute);
app.use('/auth', authRoute);

app.use((err, req, res, next) => {
	console.log('Error callback', err);
	res.status(err.status).json({ error: true, message: err.message });
});
mongoose
	.connect('mongodb://localhost/training')
	.then(() => {
		app.listen(PORT, () => {
			console.log(`listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log('Error connecting to DB', err);
	});
