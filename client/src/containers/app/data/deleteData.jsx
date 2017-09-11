export const deleteProjectById = async (
	deleteProject,
	updateProjectItems,
	id
) => {
	try {
		await deleteProject(id);
		await updateProjectItems();
	} catch (err) {
		console.error(err);
	}
};

export const deletePostById = async (
	deletePost,
	updateBlogPostCount,
	updateBlog,
	id
) => {
	try {
		await deletePost(id);
		await updateBlogPostCount();
	} catch (err) {
		console.error(err);
	}
};
