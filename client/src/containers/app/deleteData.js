export const deleteProjectById = (deleteProject, updateProjectItems, id) => {
	deleteProject(id)
	.then(() => updateProjectItems())
	.catch(err => console.error(err))
}

export const deletePostById = (deletePost, updateBlogPostCount, updateBlog, id) => {
	deletePost(id)
	.then(() => updateBlogPostCount())
	.catch(err => console.error(err))
};
