const multer = require('multer');

// exports.multerUpload = (req, res, next) => {
// storage = multer.diskStorage({
// 	destination: function(request, file, callback) {
// 		callback(null, 'uploads/');
// 	},
// 	limits: { fileSize: 10000000, files: 1 },
// 	filename: function(request, file, callback) {
// 		callback(null, Date.now() + '-' + file.originalname);
// 	},
// 	fileFilter: (req, file, callback) => {
// 		if (!file.originalname.match(/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/)) {
// 			return callback(new Error('Only images are allowed!'), false);
// 		}
//
// 		callback(null, true);
// 	}
// });
//
// const upload = multer({ storage: storage }).single('file');
// };
