import { map, isEmpty } from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { fetchPosts } from '../../actions/postActionCreators';
import AdminPanel from '../app/AdminPanel';
import RenderPosts from '../../components/blog/renderPosts';
import Loading from '../app/Loading';

class Blog extends Component {
	state = {
		currentPage: parseInt(this.props.location.query.pageId, 10),
		isLoading: true
	};

	componentDidMount = () =>	this.fetchBlogPosts(this.state.currentPage - 1);

	componentDidUpdate = (nextProps, nextState) => {
		const currentLoadedPage = parseInt(this.props.location.query.pageId, 10);
		if (this.state.currentPage !== currentLoadedPage) {
			this.setState({ currentPage: currentLoadedPage, isLoading: true }, () => {
				this.fetchBlogPosts(this.state.currentPage - 1);
			});
		}
	}

	fetchBlogPosts = requestedPage => {
		this.props.fetchPosts(requestedPage ? requestedPage * 10 : 0)
		.then(({data: { posts }}) => this.setState({ posts, isLoading: false }))
		.catch(err => console.error(err))
	};

	render = () => {
		const { currentPage, isLoading, posts, serverError } = this.state;
		const loadedPage = parseInt(this.props.location.query.pageId, 10);

		if (isEmpty(posts) || isLoading || currentPage !== loadedPage) {
			return (
				<Loading
					container={'blog-container'}
					items={posts}
					message={'No blog content was found!'}
					serverError={serverError}
				/>
			)
		}

		return (
			<div className="post-container">
				<AdminPanel posts={posts} updateBlogPostCount={this.props.updateBlogPostCount} />
				{map(posts, (post, key) => (
					<RenderPosts key={key} {...post} />
				))}
			</div>
		);
	}
}

export default connect(null, { fetchPosts })(withRouter(Blog));
