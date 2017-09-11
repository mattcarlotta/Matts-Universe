module.exports = (res, err) => {
	res.status(500).json({ err: err.toString() });
};
