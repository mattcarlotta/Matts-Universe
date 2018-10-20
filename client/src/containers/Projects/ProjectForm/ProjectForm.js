import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import createFormData from '../../Forms/FormData/configFormData';
import {
  addNewProject,
  editProject,
  fetchProject,
} from '../../../actions/projectActionCreators';
import { projectMaxLengthAllowed } from '../../Forms/Validate/validateFormFields';
import UploadForm from '../../Forms/UploadForm/UploadForm';

class ProjectForm extends Component {
  handleFormSubmit = formProps => {
    const formData = createFormData(formProps);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    const id = formProps._id || null;

    if (this.props.location.query.titleId) {
      this.props.editProject(id, formData);
    } else {
      this.props.addNewProject(formData);
    }
  };

  render = () => {
    const { titleId } = this.props.location.query;
    return (
      <UploadForm
        onSubmit={formProps => this.handleFormSubmit(formProps)}
        allowedLength={[30, 50, 250]}
        fetchItem={this.props.fetchProject}
        formTitle={titleId ? 'Edit Project' : 'Add Project'}
        maxFieldLength={projectMaxLengthAllowed}
        queryId={titleId || ''}
      />
    );
  };
}

export default reduxForm({
  form: 'uploadForm',
})(
  connect(
    null,
    {
      addNewProject,
      editProject,
      fetchProject,
    },
  )(withRouter(ProjectForm)),
);

ProjectForm.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      titleId: PropTypes.string,
    }),
  }),
  addNewProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
};
