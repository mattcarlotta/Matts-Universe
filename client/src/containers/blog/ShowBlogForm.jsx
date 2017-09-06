import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BlogForm from './BlogForm';
import ConfigAuth from '../../actions/configAuth';
import CreateFormData from '../forms/configFormData';
import {
	addNewPost,
	editPost,
	redirectToBlog
} from '../../actions/postActionCreators';

class ShowBlogForm extends Component {
	handleFormSubmit = formProps => {
		try {
			const config = ConfigAuth();
			const formData = CreateFormData(formProps);
			const id = formProps._id || null;
			this.props.location.query.titleId
				? this.props.editPost(id, formData, config)
				: this.props.addNewPost(id, formData, config);
			redirectToBlog();
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		return (
			<BlogForm onSubmit={formProps => this.handleFormSubmit(formProps)} />
		);
	}
}

export default reduxForm({
	form: 'BlogPostForm'
})(
	connect(null, {
		addNewPost,
		editPost
	})(withRouter(ShowBlogForm))
);
