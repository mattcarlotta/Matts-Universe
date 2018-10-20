import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';
import { resetNotifications } from '../../../actions/authActionCreators';

class RenderNotifications extends PureComponent {
  componentDidUpdate = () => {
    const { errorMessage, successMessage } = this.props;
    message.config({ top: 75 });
    if (errorMessage)
      message.error(errorMessage, 2, this.props.resetNotifications());
    if (successMessage)
      message.success(successMessage, 2, this.props.resetNotifications());
  };

  render = () => null;
}

export default connect(
  state => ({
    errorMessage: state.auth.error,
    successMessage: state.auth.success,
  }),
  { resetNotifications },
)(RenderNotifications);

RenderNotifications.propTypes = {
  errorMessage: PropTypes.string,
  resetNotifications: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
};
