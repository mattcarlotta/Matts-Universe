import { map, isEmpty } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../actions/postActionCreators';
import AdminPanel from '../../App/AdminPanel/AdminPanel';
import RenderPosts from '../../../components/Blog/RenderPosts/renderPosts';
import Loading from '../../App/Loading/Loading';
import { blogContainer, postContainer } from '../../../styles/index.scss';

class Blog extends Component {
  state = {
    currentPage: parseInt(this.props.location.query.pageId, 10),
    isLoading: true,
    serverError: '',
  };

  componentDidMount = () => this.fetchBlogPosts(this.state.currentPage - 1);

  componentDidUpdate = () => {
    const currentLoadedPage = parseInt(this.props.location.query.pageId, 10);
    if (this.state.currentPage !== currentLoadedPage) {
      this.setState({ currentPage: currentLoadedPage, isLoading: true }, () => {
        this.fetchBlogPosts(this.state.currentPage - 1);
      });
    }
  };

  fetchBlogPosts = requestedPage => {
    this.props
      .fetchPosts(requestedPage ? requestedPage * 10 : 0)
      .then(({ data: { posts } }) => this.setState({ posts, isLoading: false }))
      .catch(err => this.setState({ serverError: err }));
  };

  render = () => {
    const { currentPage, isLoading, posts, serverError } = this.state;
    const loadedPage = parseInt(this.props.location.query.pageId, 10);

    return isEmpty(posts) || isLoading || currentPage !== loadedPage ? (
      <Loading
        container={blogContainer}
        items={posts}
        message="No blog content was found!"
        serverError={serverError}
      />
    ) : (
      <div className={postContainer}>
        <AdminPanel
          posts={posts}
          updateBlogPostCount={this.props.updateBlogPostCount}
        />
        {map(posts, (post, key) => (
          <RenderPosts key={key} {...post} />
        ))}
      </div>
    );
  };
}

export default connect(
  null,
  { fetchPosts },
)(withRouter(Blog));

Blog.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      pageId: PropTypes.string,
    }),
  }),
  fetchPosts: PropTypes.func.isRequired,
  updateBlogPostCount: PropTypes.func,
};
