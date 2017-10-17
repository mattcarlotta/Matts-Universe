const createFormData = ({ file, image, title, imgtitle, description }) => {
	const fd = new FormData();
	if (file) {
		fd.append('file', file[0]);
		if (image) fd.append('oldImage', image.path);
	}
	fd.append('title', title);
	fd.append('imgtitle', imgtitle);
	fd.append('description', description);
	return fd;
};

export default createFormData;
