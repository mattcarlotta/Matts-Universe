const multer = require('multer');
const sharp = require('sharp');

const uploadImage = multer({
	fileFilter: (req, file, next) => {
		if (!/\.(jpe?g|png|gif|bmp)$/i.test(file.originalname)) {
			req.fileValidationError = 'That file extension is not accepted!';
			return next(null, false);
		}
		next(null, true);
	}
}).single('file');

module.exports = (req, res, done) => {
	uploadImage(req, res, () => {
		if (req.fileValidationError || !req.file) return done(null, false, req.fileValidationError);

		const filename = Date.now() + '-' + req.file.originalname;
		const filepath = `uploads/${filename}`;

		sharp(req.file.buffer)
			.resize(800, 600)
			.min()
			.toFile(filepath)
			.then(() => {
				req.file.filename = filename;
				req.file.path = filepath;
				return done(null, true);
			});
	});
};
