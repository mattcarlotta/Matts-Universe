import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import createFormData from '../../Forms/FromData/configFormData';
import {
  addNewPost,
  editPost,
  fetchPost,
} from '../../../actions/postActionCreators';
import { postMaxLengthAllowed } from '../../Forms/Validate/validateFormFields';
import UploadForm from '../../Forms/UploadForm/UploadForm';

class ShowBlogForm extends Component {
  handleFormSubmit = formProps => {
    const formData = createFormData(formProps);
    const id = formProps._id || null;

    if (this.props.location.query.titleId) {
      this.props.editPost(id, formData);
    } else {
      this.props.addNewPost(formData);
    }
  };

  render = () => {
    const { titleId } = this.props.location.query;

    return (
      <UploadForm
        onSubmit={formProps => this.handleFormSubmit(formProps)}
        allowedLength={[50, 100, 20000]}
        fetchItem={this.props.fetchPost}
        formTitle={titleId ? 'Edit Post' : 'Add Post'}
        maxFieldLength={postMaxLengthAllowed}
        queryId={titleId ? titleId : ''}
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
      addNewPost,
      editPost,
      fetchPost,
    },
  )(withRouter(ShowBlogForm)),
);

ShowBlogForm.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      titleId: PropTypes.string,
    }),
  }),
  addNewPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
};
