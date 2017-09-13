import { map, isEmpty } from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { fetchPosts } from '../../actions/postActionCreators';
import AdminPanel from '../app/AdminPanel';
import NoItemsFound from '../../components/app/noItemsFound';
import RenderPosts from '../../components/blog/renderPosts';
import Spinner from '../../components/loaders/spinner';

class Blog extends Component {
	state = {
		currentPage: parseInt(this.props.location.query.pageId, 10),
		requestTimeout: false,
		isLoading: true
	};

	componentDidMount() {
		this.fetchBlogPosts(this.state.currentPage - 1);
		this.timeout = setTimeout(this.timer, 5000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	componentDidUpdate(nextProps, nextState) {
		const currentLoadedPage = parseInt(this.props.location.query.pageId, 10);
		if (this.state.currentPage !== currentLoadedPage) {
			this.setState({ currentPage: currentLoadedPage, isLoading: true }, () => {
				this.fetchBlogPosts(this.state.currentPage - 1);
			});
		}
	}

	fetchBlogPosts = async requestedPage => {
		try {
			const skipCount = requestedPage ? requestedPage * 10 : 0;
			const { data: { posts } } = await this.props.fetchPosts(skipCount);
			this.setState({ posts, isLoading: false });
		} catch (err) {
			console.error(err);
		}
	};

	clearTimer = () => {
		clearTimeout(this.timeout);
	};

	timer = () => {
		this.clearTimer();
		this.setState({ requestTimeout: true });
	};

	render() {
		const {
			currentPage,
			isLoading,
			posts,
			serverError,
			requestTimeout
		} = this.state;
		const loadedPage = parseInt(this.props.location.query.pageId, 10);

		if (isEmpty(posts) || isLoading || currentPage !== loadedPage) {
			if (serverError || requestTimeout)
				return <NoItemsFound message={'No blog content was found!'} />;

			return <Spinner container={'blog-container'} />;
		}

		this.clearTimer();

		return (
			<div className="post-container">
				<AdminPanel
					updateBlogPostCount={this.props.updateBlogPostCount}
					updateBlog={this.fetchBlogPosts}
					posts={posts}
				/>
				{map(posts, (post, key) => {
					return <RenderPosts key={key} {...post} />;
				})}
			</div>
		);
	}
}

export default connect(null, { fetchPosts })(withRouter(Blog));
