import _ from 'lodash';
import React, { PureComponent } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPostCount } from '../../actions/postActionCreators';
import Blog from '../../views/Blog';
import NoItemsFound from '../app/noItemsFound';
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

	renderPagination(currentPage, postCount, pageCount) {
		return (
			<span>
				<ul className="pagination-container text-center">
					<li className={currentPage === 1 ? 'disable-chevron' : ''}>
						<button onClick={this.goTo.bind(this, currentPage - 1, postCount)}>
							<span className="small-font">&#60;</span>
						</button>
					</li>
					{_.map(pageCount, page => {
						return (
							<li
								key={page}
								className={currentPage === page + 1 ? 'active-page' : ''}>
								<button onClick={this.goTo.bind(this, page + 1, postCount)}>
									{page + 1}
								</button>
							</li>
						);
					})}
					<li
						className={
							(currentPage + 1) * 10 <= postCount ? '' : 'disable-chevron'
						}>
						<button onClick={this.goTo.bind(this, currentPage + 1, postCount)}>
							<span className="small-font">&#62;</span>
						</button>
					</li>
					<hr />
				</ul>
			</span>
		);
	}

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
				{this.renderPagination(currentPage, postCount, pageCount)}
				<Blog updatePostCount={this.fetchBlogPostCount} />
				{this.renderPagination(currentPage, postCount, pageCount)}
			</span>
		);
	}
}

export default withRouter(connect(null, { fetchPostCount })(BlogPagination));
