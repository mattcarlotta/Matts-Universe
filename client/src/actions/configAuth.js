// configure user authentication for API
export default () => ({
	user: localStorage.getItem('token'),
	headers: {
		authorization: localStorage.getItem('token')
	}
})
