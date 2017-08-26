import _ from 'lodash';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { fetchPosts } from '../actions/postActionCreators';
import AdminPanel from '../containers/app/AdminPanel';
import NoItemsFound from '../components/app/noItemsFound';
import RenderPosts from '../components/blog/renderPosts';
import Spinner from '../components/loaders/spinner';

class Blog extends PureComponent {
	state = {
		currentPage: parseInt(this.props.location.query.pageId, 10),
		requestTimeout: false
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
			this.setState({ currentPage: currentLoadedPage }, () => {
				this.fetchBlogPosts(this.state.currentPage - 1);
			});
		}
	}

	fetchBlogPosts = requestedPage => {
		const skipCount = requestedPage ? requestedPage * 10 : 0;
		fetchPosts(skipCount).then(res => {
			this.setState({
				posts: res.posts ? res.posts : '',
				serverError: res.err ? res.err : ''
			});
		});
	};

	clearTimer = () => {
		clearTimeout(this.timeout);
	};

	timer = () => {
		this.clearTimer();
		this.setState({ requestTimeout: true });
	};

	render() {
		const { currentPage, posts, serverError, requestTimeout } = this.state;
		const loadedPage = parseInt(this.props.location.query.pageId, 10);

		if (_.isEmpty(posts) || currentPage !== loadedPage) {
			if (serverError || requestTimeout)
				return (
					<NoItemsFound
						message={serverError ? serverError : 'No posts were found!'}
					/>
				);

			return <Spinner container={'blog-container'} />;
		}

		this.clearTimer();

		return (
			<div className="post-container">
				<AdminPanel
					updatePostCount={this.props.updatePostCount}
					updateBlog={this.fetchBlogPosts}
					posts={posts}
				/>
				{posts.slice(0).map(post => {
					return <RenderPosts key={post._id} {...post} />;
				})}
			</div>
		);
	}
}

export default withRouter(Blog);
