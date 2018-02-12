import React, { Component, Fragment } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { fetchPostCount } from '../../actions/postActionCreators';
import Blog from './Blog';
import NoItemsFound from '../../components/app/noItemsFound';
import RenderPagination from '../../components/blog/renderPagination';
import Spinner from '../../components/loaders/spinner';

class BlogPagination extends Component {
  state = { requestTimeout: false, isLoading: true };

  componentDidMount = () => {
    this.fetchBlogPostCount();
    this.timeout = setTimeout(this.timer, 5000);
  }

  componentWillUnmount = () => this.clearTimer();

  updateBlogPostCount = () => {
    this.setState({ isLoading: true, pageCount: null, postCount: null }, () => {
      this.fetchBlogPostCount();
    });
  };

  fetchBlogPostCount = () => {
    this.props.fetchPostCount().then(({data: { pageCount, postCount }}) => {
      this.setState({ pageCount: pageCount, postCount: postCount, isLoading: false });
    })
    .catch(err => console.error(err))
  };

  goTo = (requestedPage, postCount) => {
    if (requestedPage >= 1 && requestedPage * 10 <= postCount) {
      browserHistory.push({
        pathname: '/blog/page',
        query: { pageId: requestedPage }
      });
    }
  };

  clearTimer = () => clearTimeout(this.timeout);

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
      <Fragment>
        <Blog updateBlogPostCount={this.updateBlogPostCount} />
        <RenderPagination
          currentPage={currentPage}
          postCount={postCount}
          pageCount={pageCount}
          goTo={this.goTo}
        />
      </Fragment>
    );
  }
}

export default connect(null, { fetchPostCount })(withRouter(BlogPagination));
