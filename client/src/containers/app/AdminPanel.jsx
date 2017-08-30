import map from 'lodash/map';
import React, { PureComponent } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';

import { deletePost, redirectToBlog } from '../../actions/postActionCreators';
import {
	deleteProject,
	redirectToProject
} from '../../actions/projectActionCreators';
import { authError, signoutUser } from '../../actions/authActionCreators';

import ADMINBUTTONITEMS from '../../components/app/data/adminButtonData';
import RenderAdminButtons from '../../components/app/renderAdminButtons';
import RenderAlert from '../../components/app/RenderAlert';
import SignOut from '../auth/signout';

class AdminPanel extends PureComponent {
	onAddClick = () => {
		this.props.location.query.pageId
			? browserHistory.push(`/blog/post/new`)
			: browserHistory.push(`/projects/new`);
	};

	onDeleteClick = id => {
		this.props.location.query.pageId
			? deletePost(id).then(res => {
					res.err ? this.props.authError(res.err) : this.props.updateBlog();
					this.props.updatePostCount();
					redirectToBlog();
				})
			: deleteProject(id).then(res => {
					res.err
						? this.props.authError(res.err)
						: this.props.updateProjectItems();
					redirectToProject();
				});
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
		const { posts, projects, serverError } = this.props;
		const items = this.props.location.query.pageId ? posts : projects;

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
											items={items}
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
									className="signout-button">
									<SignOut />
								</Button>
							</ButtonGroup>
						</div>
					: null}
				{serverError
					? <RenderAlert
							resetNotifications={this.props.authError}
							errorMessage={serverError}
						/>
					: null}
			</span>
		);
	}
}

const mapStateToProps = state => {
	return {
		serverError: state.auth.error,
		username: state.auth.username,
		userIsGod: state.auth.isGod
	};
};

export default connect(mapStateToProps, { authError, signoutUser })(
	withRouter(AdminPanel)
);
