export const deleteProjectById = async (
	deleteProject,
	updateProjectItems,
	id
) => {
	try {
		await deleteProject(id);
		updateProjectItems();
	} catch (err) {
		console.error(err);
	}
};

export const deletePostById = async (
	deletePost,
	updateBlog,
	updatePostCount,
	id
) => {
	try {
		await deletePost(id);
		updateBlog();
		updatePostCount();
	} catch (err) {
		console.error(err);
	}
};
