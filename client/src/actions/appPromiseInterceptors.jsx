export default app => {
	app.interceptors.response.use(
		response => {
			return response;
		},
		error => {
			return Promise.reject(error.response.data.err);
		}
	);
};
