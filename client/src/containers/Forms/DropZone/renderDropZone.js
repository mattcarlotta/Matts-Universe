import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';
import RenderPreviewImage from '../PreviewImage/renderPreviewImage';
import RenderFormErrors from '../FormErrors/renderFormErrors';

const RenderDropZone = ({
  input,
  touched,
  error,
  onHandleOnDrop,
  imageOriginalName,
  imageSize,
  imageAPIURL,
  label,
  newImageFiles,
  useStoredImage,
}) => (
  <div style={{ marginBottom: 20 }}>
    <DropZone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="upload-container"
      onDrop={onHandleOnDrop}
      onChange={filesToUpload => {
        input.onChange(filesToUpload);
      }}
    >
      {newImageFiles.length > 0 || useStoredImage ? (
        <RenderPreviewImage
          imageAPIURL={imageAPIURL}
          imageOriginalName={imageOriginalName}
          imageSize={imageSize}
          newImageFiles={newImageFiles}
          useStoredImage={useStoredImage}
        />
      ) : (
        <Fragment>
          <i className="fa fa-upload" aria-hidden="true" />
          <p>Click or drag file to this area to upload.</p>
        </Fragment>
      )}
    </DropZone>
    <RenderFormErrors error={error} label={label} touched={touched} />
  </div>
);

export default RenderDropZone;

RenderDropZone.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  touched: PropTypes.bool,
  error: PropTypes.string,
  onHandleOnDrop: PropTypes.func.isRequired,
  imageOriginalName: PropTypes.string,
  imageSize: PropTypes.number,
  imageAPIURL: PropTypes.string,
  label: PropTypes.string,
  newImageFiles: PropTypes.arrayOf(PropTypes.object),
  useStoredImage: PropTypes.string,
};
