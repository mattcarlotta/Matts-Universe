import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/postActionCreators';
import { deleteProject } from '../../../actions/projectActionCreators';
import { authError, signoutUser } from '../../../actions/authActionCreators';
import RenderAdminPanel from '../../../components/App/RenderAdminPanel/renderAdminPanel';

class AdminPanel extends PureComponent {
  onAddClick = () =>
    browserHistory.push(
      this.props.location.query.pageId ? '/blog/post/new' : '/projects/new',
    );

  onDeleteClick = ({ props: { id } }) => {
    if (this.props.location.query.pageId) {
      this.props
        .deletePost(id)
        .then(() => this.props.updateBlogPostCount())
        .catch(err => this.props.authError(err));
    } else {
      this.props
        .deleteProject(id)
        .then(() => this.props.updateProjects())
        .catch(err => this.props.authError(err));
    }
  };

  onEditClick = ({ props: { navtitle } }) => {
    const path = this.props.location.query.pageId
      ? ['blog', 'post']
      : ['projects', 'project'];

    browserHistory.push({
      pathname: `/${path[0]}/edit/${path[1]}`,
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
      pageId={this.props.location.query.pageId}
    />
  );
}

export default connect(
  state => ({ username: state.auth.username, userIsGod: state.auth.isGod }),
  { authError, deletePost, deleteProject, signoutUser },
)(withRouter(AdminPanel));

AdminPanel.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      pageId: PropTypes.string,
    }),
  }),
  authError: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
  username: PropTypes.string,
  updateProjects: PropTypes.func,
  userIsGod: PropTypes.bool,
};
