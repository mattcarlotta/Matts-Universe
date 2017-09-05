const CreateFormData = async ({ file, title, imgtitle, description }) => {
	const fd = await new FormData();
	if (file) await fd.append('file', file[0]);
	await fd.append('title', title);
	await fd.append('imgtitle', imgtitle);
	await fd.append('description', description);
	return fd;
};

export default CreateFormData;
