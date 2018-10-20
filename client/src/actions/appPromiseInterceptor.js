export default app => {
	app.interceptors.response.use(
		response => (response ),
		error => ( Promise.reject(error.response.data.err) )
	);
};
