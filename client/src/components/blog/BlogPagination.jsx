import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { fetchPostCount } from '../../actions/postActionCreators';
import Blog from '../../containers/blog/Blog';
import NoItemsFound from '../app/noItemsFound';
import RenderPagination from './renderPagination';
import Spinner from '../loaders/spinner';

class BlogPagination extends Component {
	state = {
		requestTimeout: false,
		isLoading: true
	};

	componentDidMount() {
		this.fetchBlogPostCount();
		this.timeout = setTimeout(this.timer, 5000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	updateBlogPostCount = () => {
		this.setState({ isLoading: true, pageCount: null, postCount: null }, () => {
			this.fetchBlogPostCount();
		});
	};

	fetchBlogPostCount = async () => {
		try {
			const {
				data: { pageCount, postCount }
			} = await this.props.fetchPostCount();

			this.setState({
				pageCount: pageCount,
				postCount: postCount,
				isLoading: false
			});
		} catch (err) {
			console.error(err);
		}
	};

	goTo = (requestedPage, postCount) => {
		if (requestedPage >= 1 && requestedPage * 10 <= postCount) {
			browserHistory.push({
				pathname: '/blog/page',
				query: { pageId: requestedPage }
			});
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
		const { isLoading, postCount, pageCount, requestTimeout } = this.state;
		const currentPage = parseInt(this.props.location.query.pageId, 10);

		if (isLoading || !postCount || !pageCount) {
			if (requestTimeout)
				return <NoItemsFound message={'No blog content was found!'} />;

			return <Spinner />;
		}

		this.clearTimer();

		return (
			<span>
				<RenderPagination
					currentPage={currentPage}
					postCount={postCount}
					pageCount={pageCount}
					goTo={this.goTo}
				/>
				<Blog updateBlogPostCount={this.updateBlogPostCount} />
			</span>
		);
	}
}

export default connect(null, { fetchPostCount })(withRouter(BlogPagination));
