import React, { PureComponent } from 'react';
import { browserHistory, withRouter } from 'react-router';

import { fetchPostCount } from '../../actions/postActionCreators';
import Blog from '../../views/Blog';
import NoItemsFound from '../app/noItemsFound';
import Spinner from '../loaders/spinner';

class BlogPagination extends PureComponent {
	state = {
		pageCount: '',
		postCount: ''
	};

	componentDidMount() {
		this.fetchBlogPostCount();
	}

	fetchBlogPostCount = () => {
		fetchPostCount().then(res => {
			this.setState({
				pageCount: res.pageCount ? res.pageCount : '',
				postCount: res.postCount ? res.postCount : '',
				serverError: res.err ? res.err : ''
			});
		});
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
					{pageCount.slice(0).map(page => {
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

	render() {
		const { postCount, pageCount, serverError } = this.state;
		const currentPage = parseInt(this.props.location.query.pageId, 10);

		if (!postCount || !pageCount) {
			if (serverError)
				return (
					<NoItemsFound
						message={serverError ? serverError : 'No posts were found!'}
					/>
				);

			return <Spinner />;
		}

		return (
			<span>
				{this.renderPagination(currentPage, postCount, pageCount)}
				<Blog updatePostCount={this.fetchBlogPostCount} />
				{this.renderPagination(currentPage, postCount, pageCount)}
			</span>
		);
	}
}

export default withRouter(BlogPagination);
