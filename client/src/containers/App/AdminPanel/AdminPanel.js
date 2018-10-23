import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { deleteProject } from '../../../actions/projectActionCreators';
import { authError, signoutUser } from '../../../actions/authActionCreators';
import RenderAdminPanel from '../../../components/App/RenderAdminPanel/renderAdminPanel';

class AdminPanel extends PureComponent {
  onAddClick = () => browserHistory.push('/projects/new');

  onDeleteClick = ({ props: { id } }) => {
    this.props
      .deleteProject(id)
      .then(() => this.props.updateProjects())
      .catch(err => this.props.authError(err));
  };

  onEditClick = ({ props: { navtitle } }) => {
    browserHistory.push({
      pathname: `/projects/edit/project`,
      query: { titleId: `${navtitle}` },
    });
  };

  render = () => (
    <RenderAdminPanel
      {...this.props}
      BUTTONS={['pencil-square-o', 'trash-o']}
      handleOnAddClick={this.onAddClick}
      handleOnDeleteClick={this.onDeleteClick}
      handleOnEditClick={this.onEditClick}
    />
  );
}

export default connect(
  state => ({ username: state.auth.username, userIsGod: state.auth.isGod }),
  { authError, deleteProject, signoutUser },
)(withRouter(AdminPanel));

AdminPanel.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      pageId: PropTypes.string,
    }),
  }),
  authError: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
  username: PropTypes.string,
  updateProjects: PropTypes.func,
  userIsGod: PropTypes.bool,
};
