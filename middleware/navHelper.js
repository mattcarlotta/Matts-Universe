const _ = require('lodash');

module.exports = {
	manipNavTitle: function(title) {
		return (title = title.replace(/[^\w\s]/gi, '').replace(/ /g, '-'));
	},
	covertToArray: function(int) {
		const arr = [];
		for (var i = 0; i < int; i++) {
			arr.push(i);
		}
		return arr;
	},
	stripDescription: function(allPosts) {
		return _.map(allPosts, post => {
			post.description.length >= 497
				? (post.description = post.description.substring(0, 496) + '...')
				: null;
			return post;
		});
	}
};
