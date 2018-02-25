const map = require('lodash').map;

module.exports = {
	manipNavTitle: (title) => (title = title.replace(/[^\w\s]/gi, '').replace(/ /g, '-')),
	covertToArray: (int) => {
		const arr = [];
		for (var i = 0; i < int; i++) {
			arr.push(i);
		}
		return arr;
	},
	stripDescription: (allPosts) => (
		map(allPosts, post => {
			post.description.length >= 497 && (post.description = post.description.substring(0, 496) + '...')
			return post;
		})
	)
};
