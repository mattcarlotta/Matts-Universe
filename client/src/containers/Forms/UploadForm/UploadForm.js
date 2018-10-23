import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
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
import Spinner from '../../../components/Loaders/spinner';
import NoItemsFound from '../../../components/App/NoItemsFound/noItemsFound';
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
    foundItem: false,
    isLoading: true,
    imageUrl: '',
    previewImage: false,
  };

  componentDidMount = () => {
    if (this.props.queryId) this.fetchItemToEdit();
    window.scrollTo({ top: 0 });
  };

  fetchItemToEdit = () => {
    this.props
      .fetchItem(this.props.queryId)
      .then(({ data: { foundItem } }) => {
        this.setState(
          {
            isLoading: false,
            foundItem: true,
          },
          () => this.initializeForm(foundItem),
        );
      })
      .catch(err =>
        this.setState(
          {
            isLoading: false,
            foundItem: false,
          },
          () => this.props.authError(err.toString()),
        ),
      );
  };

  initializeForm = foundItem => this.props.initialize(foundItem);

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    const isLt2MB = file.size / 10240000 <= 1;

    if ((isJPG || isPNG || isGIF) && isLt2MB) {
      this.getBase64(file, imageUrl => this.setState({ imageUrl }));
      return false;
    }

    return new Promise((resolve, reject) => {
      this.props.authError(
        `Only 10MB jpg/png/gif files are accepted! Instead, received a ${(
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

  imageIsRequired = value =>
    !this.props.queryId && !value ? 'Required' : undefined;

  fileListIsRequired = value =>
    !this.props.queryId && value && isEmpty(value.fileList)
      ? 'Required'
      : undefined;

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
      titleValue,
    } = this.props;
    const { isLoading, foundItem } = this.state;
    const characterValue = [titleValue, imgTitleValue, descriptionValue];

    if (queryId && isLoading) return <Spinner />;
    if (queryId && !isLoading && !foundItem)
      return <NoItemsFound style={{ height: '100vh', marginTop: '65px' }} />;

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
            validate={[this.imageIsRequired, this.fileListIsRequired]}
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
            reset={reset}
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
  titleValue: PropTypes.string,
};
