const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			to = query.page * query.limit,
			from = to - query.limit,
			courses = server.db.getState().courses;
		
			if (!!query.textFragment) {
				courses = courses.filter((course) => course.name.concat(course.description).toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
			}

		if (courses.length < to || !to) {
			to = courses.length;
		}

		res.json({
			data: courses.slice(from, to),
			count: courses.length
		});
	});


	return router;
};
