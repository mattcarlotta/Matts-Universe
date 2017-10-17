import map from 'lodash/map';
import React, { PureComponent } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';

import { deletePost } from '../../actions/postActionCreators';
import { deleteProject } from '../../actions/projectActionCreators';
import { signoutUser } from '../../actions/authActionCreators';
import { deleteProjectById, deletePostById } from './data/deleteData';
import ADMINBUTTONITEMS from '../../components/app/data/adminButtonData';
import RenderAdminButtons from '../../components/app/renderAdminButtons';
import SignOut from '../auth/signout';

class AdminPanel extends PureComponent {
	onAddClick = () => {
		this.props.location.query.pageId
			? browserHistory.push(`/blog/post/new`)
			: browserHistory.push(`/projects/new`);
	};

	onDeleteClick = id => {
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

	onEditClick = navTitle => {
		const path = this.props.location.query.pageId
			? ['blog', 'post']
			: ['projects', 'project'];

		browserHistory.push({
			pathname: `/${path[0]}/edit/${path[1]}`,
			query: { titleId: `${navTitle}` }
		});
	};

	render() {
		return (
			<span>
				{this.props.username && this.props.userIsGod
					? <div className="admin-tools">
							<h1>Admin Control Panel</h1>
							<ButtonGroup>
								<Button bsStyle="primary" onClick={this.onAddClick}>
									<i className="fa fa-plus" aria-hidden="true" />
									{this.props.location.query.pageId
										? 'Add New Post'
										: 'Add New Project'}
								</Button>
								{map(ADMINBUTTONITEMS, ({ button }, key) => {
									return (
										<RenderAdminButtons
											key={key}
											bsStyle={button === 'edit' ? 'warning' : 'danger'}
											id={
												button === 'edit'
													? 'admin-tools-edit'
													: 'admin-tools-delete'
											}
											iconClassName={
												button === 'edit' ? 'fa-pencil-square-o' : 'fa-trash-o'
											}
											title={button === 'edit' ? 'Edit' : 'Delete'}
											items={
												this.props.location.query.pageId
													? this.props.posts
													: this.props.projects
											}
											button={button}
											onClickAction={
												button === 'edit'
													? this.onEditClick
													: this.onDeleteClick
											}
										/>
									);
								})}
								<Button
									onClick={() => this.props.signoutUser()}
									className="signout-button"
								>
									<SignOut />
								</Button>
							</ButtonGroup>
						</div>
					: null}
			</span>
		);
	}
}

export default connect(
	state => ({ username: state.auth.username, userIsGod: state.auth.isGod }),
	{ deletePost, deleteProject, signoutUser }
)(withRouter(AdminPanel));
