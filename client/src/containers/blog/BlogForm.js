import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import configAuth from '../../actions/configAuth';
import createFormData from '../forms/configFormData';
import { addNewPost, editPost, fetchPost } from '../../actions/postActionCreators';
import { postMaxLengthAllowed } from '../forms/validateFormFields';
import UploadForm from '../forms/UploadForm';

class ShowBlogForm extends Component {
	handleFormSubmit = formProps => {
		const config = configAuth();
		const formData = createFormData(formProps);
		const id = formProps._id || null;

		this.props.location.query.titleId
			? this.props.editPost(id, formData, config)
			: this.props.addNewPost(formData, config);
	};

	render = () => {
		const { titleId } = this.props.location.query;
		const { fetchPost } = this.props;

		return (
			<UploadForm
				onSubmit={formProps => this.handleFormSubmit(formProps)}
				allowedLength={[50, 100, 20000]}
				fetchItem={fetchPost}
				formTitle={titleId ? 'Edit Post' : 'Add Post'}
				maxFieldLength={postMaxLengthAllowed}
				queryId={titleId ? titleId : undefined}
			/>
		);
	}
}

export default reduxForm({
	form: 'uploadForm'
})(
	connect(null, {
		addNewPost,
		editPost,
		fetchPost
	})(withRouter(ShowBlogForm))
);
