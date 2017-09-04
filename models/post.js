module.exports = mongoose => {
	const postSchema = new mongoose.Schema({
		navTitle: String,
		title: String,
		image: String,
		imageName: String,
		imageSize: Number,
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
