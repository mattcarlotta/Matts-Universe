import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActionCreators';
import { deleteProject } from '../../actions/projectActionCreators';
import { signoutUser } from '../../actions/authActionCreators';
import RenderAdminPanel from '../../components/App/RenderAdminPanel/renderAdminPanel';

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
        .catch(err => console.error(err));
    } else {
      this.props.deleteProject(id).catch(err => console.error(err));
    }
  };

  onEditClick = ({ props: { navTitle } }) => {
    const path = this.props.location.query.pageId
      ? ['blog', 'post']
      : ['projects', 'project'];

    browserHistory.push({
      pathname: `/${path[0]}/edit/${path[1]}`,
      query: { titleId: `${navTitle}` },
    });
  };

  render = () => (
    <RenderAdminPanel
      {...this.props}
      BUTTONS={['pencil-square-o', 'trash-o']}
      onAddClick={this.onAddClick}
      onDeleteClick={this.onDeleteClick}
      onEditClick={this.onEditClick}
      pageId={this.props.location.query.pageId}
    />
  );
}

export default connect(
  state => ({ username: state.auth.username, userIsGod: state.auth.isGod }),
  { deletePost, deleteProject, signoutUser },
)(withRouter(AdminPanel));

AdminPanel.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      pageId: PropTypes.string,
    }),
  }),
  deletePost: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
  username: PropTypes.string,
  userIsGod: PropTypes.string,
};
