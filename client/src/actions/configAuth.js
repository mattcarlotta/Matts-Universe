// configure user authentication for API
const configAuth = () => {
	return {
		user: localStorage.getItem('token'),
		headers: {
			authorization: localStorage.getItem('token')
		}
	};
};

export default configAuth;
