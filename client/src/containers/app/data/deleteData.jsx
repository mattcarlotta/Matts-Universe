export const deleteProjectById = async (
	deleteProject,
	updateProjectItems,
	id,
	redirectToProject
) => {
	try {
		await deleteProject(id);
		await updateProjectItems();
		redirectToProject();
	} catch (err) {
		console.error(err);
	}
};

export const deletePostById = async (
	deletePost,
	updateBlog,
	updatePostCount,
	id,
	redirectToBlog
) => {
	try {
		await deletePost(id);
		await updateBlog();
		await updatePostCount();
		redirectToBlog();
	} catch (err) {
		console.error(err);
	}
};
