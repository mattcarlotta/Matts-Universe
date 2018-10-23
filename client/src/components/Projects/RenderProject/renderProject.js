import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import DisplayProject from '../DisplayProject/displayProject';

class RenderProjects extends Component {
  state = {
    previewImage: false,
  };

  handleClick = () => this.setState({ previewImage: true });

  handleCancel = () => this.setState({ previewImage: false });

  render = () => (
    <Fragment>
      <DisplayProject {...this.props} onHandleClick={this.handleClick} />
      <Modal
        visible={this.state.previewImage}
        footer={null}
        onCancel={this.handleCancel}
        width="calc(75%)"
        style={{ margin: '0 auto', top: 30, padding: 10 }}
      >
        <DisplayProject {...this.props} onHandleCancel={this.handleCancel} />
      </Modal>
    </Fragment>
  );
}

export default RenderProjects;

RenderProjects.propTypes = {
  image: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
  imgtitle: PropTypes.string,
  description: PropTypes.string,
  githubLink: PropTypes.string,
};
