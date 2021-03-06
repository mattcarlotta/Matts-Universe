module.exports = app => async (req, res, next) => {
  const { sendError } = app.shared.helpers;
  const fs = app.get('fs');
  const sharp = app.get('sharp');

  if (req.err) return sendError(req.err, res, next);

  if (!req.file) return next();

  const filename = `${Date.now()}-${req.file.originalname}`;
  const filepath = `uploads/${filename}`;

  const setFile = () => {
    req.file.filename = filename;
    req.file.path = filepath;
    return next();
  };

  return /\.(gif|bmp)$/i.test(req.file.originalname)
    ? fs.writeFile(filepath, req.file.buffer, (err) => {
      if (err) {
        return sendError('There was a problem saving the image.', res, next);
      }
      return setFile();
    })
    : sharp(req.file.buffer)
      .resize(1600, 1200)
    // .max()
    // .withoutEnlargement()
      .resize({ fit: 'inside', withoutEnlargement: true })
      .toFile(filepath)
      .then(() => setFile());
};
