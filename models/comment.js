module.exports = mongoose => {
	const commentSchema = mongoose.Schema({
		text: String,
		postedAt: String,
		updated: {
			type: Boolean,
			default: false
		},
		updatedAt: String,
		author: String,
		campground: String
	});

	mongoose.model('comments', commentSchema);
};
