module.exports = mongoose => {
	const projectSchema = new mongoose.Schema({
		navTitle: String,
		title: String,
		image: {
			originalName: String,
			fileName: String,
			path: String,
			apiURL: String,
			size: String
		},
		imgtitle: String,
		description: String,
		githubLink: String
	});

	mongoose.model('projects', projectSchema);
};
