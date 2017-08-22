const ConfigAuth = () => {
	return {
		user: localStorage.getItem('token'),
		headers: {
			authorization: localStorage.getItem('token')
		}
	};
};

export default ConfigAuth;
