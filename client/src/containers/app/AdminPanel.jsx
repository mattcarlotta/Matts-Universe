import React, { PureComponent } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

import { deletePost, redirectToBlog } from '../../actions/PostActionCreators';
import {
	deleteProject,
	redirectToProject
} from '../../actions/ProjectActionCreators';
import { authError, signoutUser } from '../../actions/AuthActionCreators';

import RenderAlert from '../../components/app/RenderAlert';
import SignOut from '../auth/SignOut';

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

	renderButton = (button, items) => {
		if (!items)
			return (
				<span>
					<p>No posts were found!</p>
				</span>
			);

		return items.slice(0).map(item => {
			return button
				? <MenuItem
						key={item._id}
						onClick={this.onDeleteClick.bind(this, item._id)}>
						<i className="fa fa-trash-o" aria-hidden="true" />
						{item.navTitle}
					</MenuItem>
				: <MenuItem
						key={item._id}
						onClick={this.onEditClick.bind(this, item.navTitle)}>
						<i className="fa fa-pencil-square-o" aria-hidden="true" />
						{item.navTitle}
					</MenuItem>;
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
								<Button bsStyle="primary" onClick={this.onAddClick.bind(this)}>
									<i className="fa fa-plus" aria-hidden="true" />
									{this.props.location.query.pageId
										? 'Add New Post'
										: 'Add New Project'}
								</Button>
								<DropdownButton
									bsStyle="warning"
									id="admin-tools-edit"
									title={
										<span>
											<i className="fa fa-pencil-square-o" aria-hidden="true" />
											<span>Edit</span>
										</span>
									}>
									{this.renderButton('', items)}
								</DropdownButton>
								<DropdownButton
									className="m-r"
									bsStyle="danger"
									id="admin-tools-delete"
									title={
										<span>
											<i className="fa fa-trash-o" aria-hidden="true" />
											<span>Delete</span>
										</span>
									}>
									{this.renderButton('deleteButton', items)}
								</DropdownButton>
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
							resetError={this.props.authError}
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

export default withRouter(
	connect(mapStateToProps, { authError, signoutUser })(AdminPanel)
);
