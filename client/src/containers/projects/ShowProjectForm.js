import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import configAuth from '../../actions/configAuth';
import createFormData from '../forms/configFormData';
import {
	addNewProject,
	editProject,
	fetchProject
} from '../../actions/projectActionCreators';
import { projectMaxLengthAllowed } from '../forms/validateFormFields';
import UploadForm from '../forms/UploadForm';

class ShowProjectForm extends Component {
	handleFormSubmit = formProps => {
		const config = configAuth();
		const formData = createFormData(formProps);
		const id = formProps._id || null;

		this.props.location.query.titleId
			? this.props.editProject(id, formData, config)
			: this.props.addNewProject(formData, config);
	};

	render = () => {
		const { titleId } = this.props.location.query;
		const { fetchProject } = this.props;

		return (
			<UploadForm
				onSubmit={formProps => this.handleFormSubmit(formProps)}
				allowedLength={[30, 50, 250]}
				fetchItem={fetchProject}
				formTitle={titleId ? 'Edit Project' : 'Add Project'}
				maxFieldLength={projectMaxLengthAllowed}
				queryId={titleId ? titleId : undefined}
			/>
		);
	}
}

export default reduxForm({
	form: 'uploadForm'
})(
	connect(null, {
		addNewProject,
		editProject,
		fetchProject
	})(withRouter(ShowProjectForm))
);
