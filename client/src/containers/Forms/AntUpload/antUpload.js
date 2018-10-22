import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Form, Modal, Upload } from 'antd';

const FormItem = Form.Item;

const AntUpload = ({
  children,
  onHandleCancel,
  input,
  meta: { invalid, touched, error },
  label,
  imageUrl,
  previewImage,
  ...props
}) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      label={label}
      help={hasError && error}
      validateStatus={hasError ? 'error' : 'success'}
    >
      <Upload
        {...input}
        {...props}
        accept="image/*"
        className="avatar-uploader"
        customRequest={null}
        listType="picture-card"
        loading={false}
        showUploadList
      >
        {!imageUrl ? (
          <div>
            <Icon type="cloud-upload-o" style={{ fontSize: 48 }} />
            <div style={{ fontSize: 11 }}>
              File formats: JPEG, PNG, GIF (max size 2MB)
            </div>
          </div>
        ) : null}
      </Upload>
      <Modal visible={previewImage} footer={null} onCancel={onHandleCancel}>
        <img src={imageUrl} width="100%" alt="example" />
      </Modal>
    </FormItem>
  );
};

export default AntUpload;

AntUpload.propTypes = {
  children: PropTypes.node,
  onHandleCancel: PropTypes.func,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  imageUrl: PropTypes.string,
  previewImage: PropTypes.bool,
};
