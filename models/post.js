module.exports = mongoose => {
	const postSchema = new mongoose.Schema({
		navTitle: String,
		title: String,
		image: {
			originalName: String,
			fileName: String,
			path: String,
			size: String
		},
		imgtitle: String,
		description: String,
		timestamp: String,
		createdAt: String
		// uploadedImagePath: String
		// comments: [
		//   {
		//     type: mongoose.Schema.Types.ObjectId,
		//     ref: "Comment"
		//   }
		// ]
	});

	mongoose.model('posts', postSchema);
};
