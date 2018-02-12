import React, { PureComponent } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { deletePost } from '../../actions/postActionCreators';
import { deleteProject } from '../../actions/projectActionCreators';
import { signoutUser } from '../../actions/authActionCreators';
import { deleteProjectById, deletePostById } from './deleteData';
import RenderAdminPanel from '../../components/app/renderAdminPanel';

class AdminPanel extends PureComponent {
	onAddClick = () => {
		this.props.location.query.pageId
			? browserHistory.push(`/blog/post/new`)
			: browserHistory.push(`/projects/new`);
	};

	onDeleteClick = ({props: {id}}) => {
		if (this.props.location.query.pageId) {
			deletePostById(
				this.props.deletePost,
				this.props.updateBlogPostCount,
				this.props.updateBlog,
				id
			);
		} else {
			deleteProjectById(
				this.props.deleteProject,
				this.props.updateProjectItems,
				id
			);
		}
	};

	onEditClick = ({props: {navTitle}}) => {
		const path = this.props.location.query.pageId
			? ['blog', 'post']
			: ['projects', 'project'];

		browserHistory.push({
			pathname: `/${path[0]}/edit/${path[1]}`,
			query: { titleId: `${navTitle}` }
		});
	};

	render = () => (
		<RenderAdminPanel
			{...this.props}
			BUTTONS={['pencil-square-o','trash-o']}
			onAddClick={this.onAddClick}
			onDeleteClick={this.onDeleteClick}
			onEditClick={this.onEditClick}
			pageId={this.props.location.query.pageId}
		/>
	)
}

export default connect(
	state => ({ username: state.auth.username, userIsGod: state.auth.isGod }),
	{ deletePost, deleteProject, signoutUser }
)(withRouter(AdminPanel));
