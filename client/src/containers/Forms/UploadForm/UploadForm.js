import map from 'lodash/map';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { allowedCharacters, isRequired } from '../Validate/validateFormFields';
import AntUpload from '../AntUpload/antUpload';
import RenderFormButtons from '../FormButtons/renderFormButtons';
import RenderInputField from '../InputField/renderInputField';
import RenderTextAreaField from '../TextAreaField/renderTextAreaField';
import showCharactersLeft from '../ShowCharactersLeft/showCharactersLeft';
import Loading from '../../App/Loading/Loading';
import { authError } from '../../../actions/authActionCreators';
import { formContainer } from './UploadForm.scss';

const FIELDS = [
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'imgtitle',
    label: 'Image Title',
  },
  {
    name: 'description',
    label: 'Description',
  },
];

class UploadForm extends Component {
  state = {
    isLoaded: false,
    // newImageFiles: [],
    // useStoredImage: false,
    imageUrl: '',
    previewImage: false,
  };

  componentDidMount = () => this.props.queryId && this.fetchItemToEdit();

  fetchItemToEdit = () => {
    this.props
      .fetchItem(this.props.queryId)
      .then(({ data: { foundItem } }) => {
        this.initializeForm(foundItem);
        this.setState({
          isLoaded: true,
          // imageOriginalName: foundItem.image.originalName,
          // imageSize: foundItem.image.size,
          // imageUrl: foundItem.image.apiURL,
          // origImageFile: foundItem.image.path,
          // useStoredImage: true,
        });
      })
      /* eslint-disable no-console */
      .catch(err => console.log(err.toString()));
    /* eslint-enable no-console */
  };

  initializeForm = foundItem => this.props.initialize(foundItem);

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    const isLt2MB = file.size / 2048000 <= 1;

    if ((isJPG || isPNG || isGIF) && isLt2MB) {
      this.getBase64(file, imageUrl => this.setState({ imageUrl }));
      return false;
    }

    return new Promise((resolve, reject) => {
      this.props.authError(
        `Only 2MB jpg/png/gif files are accepted! Instead, received a ${(
          file.size / 1024000
        ).toFixed(1)}MB (${file.type})!`,
        5,
      );
      reject(file);
    });
  };

  getBase64 = img => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      this.setState({ imageUrl: reader.result }),
    );
    reader.readAsDataURL(img);
  };

  handleCancel = () => this.setState({ previewImage: false });

  handlePreview = () => this.setState({ previewImage: true });

  handleRemove = () => this.setState({ imageUrl: '' });

  // handleOnDrop = newImage => {
  //   console.log('triggered');
  //   this.setState({ newImageFiles: newImage, useStoredImage: false });
  // };

  // resetForm = reset => {
  //   this.setState({
  //     newImageFiles: [],
  //     useStoredImage: !!this.props.queryId,
  //   });
  //   reset();
  // };

  imageIsRequired = value =>
    !this.props.queryId && !value ? 'Required' : undefined;

  render = () => {
    const {
      allowedLength,
      descriptionValue,
      formTitle,
      handleSubmit,
      imgTitleValue,
      maxFieldLength,
      pristine,
      queryId,
      reset,
      submitting,
      serverError,
      titleValue,
    } = this.props;
    const {
      // imageOriginalName,
      // imageSize,
      // imageAPIURL,
      isLoaded,
      origImageFile,
      // newImageFiles,
      // useStoredImage,
    } = this.state;
    const characterValue = [titleValue, imgTitleValue, descriptionValue];

    if (queryId && !isLoaded && !origImageFile) {
      return (
        <Loading
          items={origImageFile}
          message="Unable to locate the project or post!"
          serverError={serverError}
        />
      );
    }

    return (
      <div className={formContainer}>
        <h1>{formTitle}</h1>
        <Form onSubmit={handleSubmit}>
          <Field
            name="file"
            beforeUpload={this.beforeUpload}
            disabled={submitting}
            component={AntUpload}
            onHandleCancel={this.handleCancel}
            imageUrl={this.state.imageUrl}
            onPreview={this.handlePreview}
            onRemove={this.handleRemove}
            previewImage={this.state.previewImage}
            validate={[this.imageIsRequired]}
          />
          {map(FIELDS, ({ name, label }, key) => (
            <div style={{ marginBottom: 20 }} key={key}>
              {showCharactersLeft(characterValue[key], allowedLength[key])}
              <Field
                name={name}
                type="text"
                component={
                  name === 'title' || name === 'imgtitle'
                    ? RenderInputField
                    : RenderTextAreaField
                }
                label={label}
                validate={[isRequired, allowedCharacters, maxFieldLength[key]]}
              />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <Field
              name="githubLink"
              type="text"
              component={RenderInputField}
              label="GitHub Link"
              validate={[allowedCharacters]}
            />
          </div>
          <RenderFormButtons
            submitting={submitting}
            pristine={pristine}
            reset={() => this.resetForm(reset)}
          />
        </Form>
      </div>
    );
  };
}

const selector = formValueSelector('uploadForm');

const mapStateToProps = state => ({
  descriptionValue: selector(state, 'description'),
  imgTitleValue: selector(state, 'imgtitle'),
  titleValue: selector(state, 'title'),
  serverError: state.auth.error,
});

export default reduxForm({
  form: 'uploadForm',
})(
  connect(
    mapStateToProps,
    { authError },
  )(UploadForm),
);

UploadForm.propTypes = {
  allowedLength: PropTypes.arrayOf(PropTypes.number), // eslint-disable-line no-use-before-define
  authError: PropTypes.func.isRequired,
  descriptionValue: PropTypes.string,
  fetchItem: PropTypes.func,
  formTitle: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  imgTitleValue: PropTypes.string,
  initialize: PropTypes.func.isRequired,
  maxFieldLength: PropTypes.arrayOf(PropTypes.func),
  pristine: PropTypes.bool.isRequired,
  queryId: PropTypes.string,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
  titleValue: PropTypes.string,
};
