module.exports = mongoose => {
	const projectSchema = new mongoose.Schema({
		navTitle: String,
		title: String,
		image: String,
		imgtitle: String,
		description: String
	});

	mongoose.model('projects', projectSchema);
};
