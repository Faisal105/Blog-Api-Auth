const express = require('express');
const router = express.Router();

const Blog = require('../model/blogSchema');
const { result } = require('lodash');

//create Blog
router.post('/create_blog', async (req, res, next) => {
	console.log(req.body);
	const { title, content } = req.body;
	const id = req.user.id;
	console.log(id);
	try {
		const blog = await Blog.create({ title, content, authorDetail: id });
		console.log(blog);
		res.json({ blog });
	} catch (error) {
		console.log(error.message);
		next({ status: 500, message: error.message });
	}
});

//get all blog by user info
router.get('/get_all', async (req, res, next) => {
	try {
		const id = req.user.id;
		const blogPost = await Blog.find({ authorDetail: id }).populate(
			'authorDetail',
			'-email -password',
		);
		res.json({ blogPost });
	} catch (error) {
		console.log(error.message);
		next({ status: 500, message: error.message });
	}
});
router.delete('/delet_blog', async (req, res, next) => {
	const blogId = parseInt(req.params.taskId);
	console.log(blogId);
	const newBlog = User.filter((blog) => blog.id != blogId);
	User = newBlog;
	console.log(users);
	res.json({ success: 1, message: 'Task deleted ' });
});
module.exports = router;
