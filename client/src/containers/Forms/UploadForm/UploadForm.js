import { map } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { allowedCharacters, isRequired } from '../Validate/validateFormFields';
import RenderDropZone from '../DropZone/renderDropZone';
import RenderFormButtons from '../FormButtons/renderFormButtons';
import RenderInputField from '../InputField/renderInputField';
import RenderTextAreaField from '../TextAreaField/renderTextAreaField';
import showCharactersLeft from '../ShowCharactersLeft/showCharactersLeft';
import Loading from '../../App/Loading/Loading';
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
    newImageFiles: [],
    useStoredImage: false,
  };

  componentDidMount = () => this.props.queryId && this.fetchItemToEdit();

  fetchItemToEdit = () => {
    this.props
      .fetchItem(this.props.queryId)
      .then(({ data: { foundItem } }) => {
        this.initializeForm(foundItem);
        this.setState({
          isLoaded: true,
          imageOriginalName: foundItem.image.originalName,
          imageSize: foundItem.image.size,
          imageAPIURL: foundItem.image.apiURL,
          origImageFile: foundItem.image.path,
          useStoredImage: true,
        });
      })
      /* eslint-disable no-console */
      .catch(err => console.err(err));
    /* eslint-enable no-console */
  };

  initializeForm = foundItem => this.props.initialize(foundItem);

  handleOnDrop = newImage =>
    this.setState({ newImageFiles: newImage, useStoredImage: false });

  resetForm = reset => {
    this.setState({
      newImageFiles: [],
      useStoredImage: !!this.props.queryId,
    });
    reset();
  };

  imageIsRequired = value =>
    !this.props.queryId && !value ? 'Required' : undefined;

  render() {
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
      imageOriginalName,
      imageSize,
      imageAPIURL,
      isLoaded,
      origImageFile,
      newImageFiles,
      useStoredImage,
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
      <div className={`${formContainer} col-xs-12`}>
        <h1>{formTitle}</h1>
        <Form onSubmit={handleSubmit}>
          <Field
            name="file"
            component={({ input, meta: { error, touched } }) => (
              <RenderDropZone
                input={input}
                touched={touched}
                error={error}
                onHandleOnDrop={this.handleOnDrop}
                imageOriginalName={imageOriginalName}
                imageSize={imageSize}
                imageAPIURL={imageAPIURL}
                label="Upload Image"
                origImageFile={origImageFile}
                map={map}
                newImageFiles={newImageFiles}
                useStoredImage={useStoredImage}
              />
            )}
            type="file"
            placeholder="Upload Image"
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
  }
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
})(connect(mapStateToProps)(UploadForm));

UploadForm.propTypes = {
  allowedLength: PropTypes.number,
  descriptionValue: PropTypes.string,
  fetchItem: PropTypes.func,
  formTitle: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  imgTitleValue: PropTypes.number,
  initialize: PropTypes.func.isRequired,
  maxFieldLength: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  queryId: PropTypes.string,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
  titleValue: PropTypes.string,
};
