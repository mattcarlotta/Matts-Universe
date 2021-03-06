const createFormData = ({
  file,
  image,
  title,
  imgtitle,
  description,
  githubLink,
}) => {
  const fd = new FormData();
  if (file) {
    fd.append('file', file.fileList[0].originFileObj);
    if (image) fd.append('oldImage', image.path);
  }
  fd.append('title', title);
  fd.append('imgtitle', imgtitle);
  fd.append('description', description);
  if (githubLink !== undefined) fd.append('githubLink', githubLink);
  return fd;
};

export default createFormData;
