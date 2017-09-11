const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(request, file, callback) {
		callback(null, 'public/uploads/');
	},
	limits: { fileSize: 10485760 },
	filename: function(request, file, callback) {
		callback(null, Date.now() + '-' + file.originalname);
	}
});

const uploadImage = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (!/\.(jpe?g|png|gif|bmp)$/i.test(file.originalname)) {
			req.fileValidationError = 'That file extension is not accepted!';
			return cb(null, false);
		}
		cb(null, true);
	}
}).single('file');

module.exports = uploadImage;
