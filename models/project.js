module.exports = mongoose => {
	const projectSchema = new mongoose.Schema({
		navTitle: String,
		title: String,
		image: {
			originalName: String,
			fileName: String,
			path: String,
			size: String
		},
		imgtitle: String,
		description: String
	});

	mongoose.model('projects', projectSchema);
};
