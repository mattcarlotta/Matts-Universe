import map from 'lodash/map';
import React, { PureComponent, Fragment } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { deletePost } from '../../actions/postActionCreators';
import { deleteProject } from '../../actions/projectActionCreators';
import { signoutUser } from '../../actions/authActionCreators';
import { deleteProjectById, deletePostById } from './data/deleteData';
import RenderAdminButtons from '../../components/app/renderAdminButtons';
import SignOut from '../auth/signout';

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

	render = () => {
		const { pageId } = this.props.location.query;
		const addNewTitle = pageId ? 'Add New Post' : 'Add New Project';
		const items = pageId ? this.props.posts : this.props.projects;
		const BUTTONS = ['pencil-square-o','trash-o'];
		return (
			<Fragment>
				{this.props.username && this.props.userIsGod
					? <div className="admin-tools">
							<h1>Admin Control Panel</h1>
								<Button type="primary" onClick={this.onAddClick}>
									<i className="fa fa-plus" aria-hidden="true" />
									{addNewTitle}
								</Button>
								{map(BUTTONS, (icon, key) => {
									const title = icon === "trash-o" ? "Delete" : "Edit";
									return(
										<RenderAdminButtons
												key={key}
												iconClassName={`fa-${icon}`}
												items={items}
												onClickAction={ icon === "trash-o" ? this.onDeleteClick : this.onEditClick}
												title={`${title} Projects`}
										/>
									)})
								}
								<Button
									onClick={() => this.props.signoutUser()}
									className="signout-button"
								>
									<SignOut />
								</Button>
						</div>
					: null
				}
			</Fragment>
		)
	}
}

export default connect(
	state => ({ username: state.auth.username, userIsGod: state.auth.isGod }),
	{ deletePost, deleteProject, signoutUser }
)(withRouter(AdminPanel));
