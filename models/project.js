module.exports = mongoose => {
	const projectSchema = new mongoose.Schema({
		navTitle: String,
		title: String,
		image: String,
		imageName: String,
		imageSize: Number,
		imgtitle: String,
		description: String
	});

	mongoose.model('projects', projectSchema);
};
