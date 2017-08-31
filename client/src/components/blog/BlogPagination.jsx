import React, { PureComponent } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { fetchPostCount } from '../../actions/postActionCreators';
import Blog from '../../containers/blog/Blog';
import NoItemsFound from '../app/noItemsFound';
import RenderPagination from './renderPagination';
import Spinner from '../loaders/spinner';

class BlogPagination extends PureComponent {
	state = {
		pageCount: '',
		postCount: '',
		requestTimeout: false
	};

	componentDidMount() {
		this.fetchBlogPostCount();
		this.timeout = setTimeout(this.timer, 5000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	fetchBlogPostCount = async () => {
		try {
			const {
				data: { pageCount, postCount }
			} = await this.props.fetchPostCount();

			this.setState({
				pageCount: pageCount,
				postCount: postCount
			});
		} catch (e) {
			console.warn(e);
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
		const { postCount, pageCount, requestTimeout } = this.state;
		const currentPage = parseInt(this.props.location.query.pageId, 10);

		if (!postCount || !pageCount) {
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
				<Blog updatePostCount={this.fetchBlogPostCount} />
				<RenderPagination
					currentPage={currentPage}
					postCount={postCount}
					pageCount={pageCount}
					goTo={this.goTo}
				/>
			</span>
		);
	}
}

export default connect(null, { fetchPostCount })(withRouter(BlogPagination));
