import React, { Component, Fragment } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { fetchPostCount } from '../../actions/postActionCreators';
import Blog from './Blog';
import RenderPagination from '../../components/blog/renderPagination';
import Loading from '../app/Loading';

class BlogPagination extends Component {
  state = { isLoading: true };

  componentDidMount = () => this.fetchBlogPostCount();

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

  render = () => {
    const { isLoading, postCount, pageCount } = this.state;
    const currentPage = parseInt(this.props.location.query.pageId, 10);

    if (isLoading || !postCount || !pageCount) return <Loading items={[postCount, pageCount]} message={'No blog posts were found!'} />

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
