import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../../../actions/postActionCreators';
import BlogHeader from '../../../components/Blog/BlogHeader/blogHeader';
import RenderPosts from '../../../components/Blog/RenderPosts/renderPosts';
import Loading from '../../App/Loading/Loading';
import { blogContainer } from '../../../styles/index.scss';

class BlogPosts extends Component {
  state = { foundItem: {}, serverError: '' };

  componentDidMount = () => this.fetchBlogPosts();

  fetchBlogPosts = () => {
    this.props
      .fetchPost(this.props.location.query.postId)
      .then(({ data: { foundItem } }) => this.setState({ foundItem }))
      .catch(err => this.setState({ serverError: err }));
  };

  render = () => {
    const { foundItem, serverError } = this.state;

    if (isEmpty(foundItem))
      return (
        <Loading
          items={foundItem}
          message="No blog posts were found that matched that title!"
          serverError={serverError}
        />
      );

    return (
      <div className={blogContainer}>
        <BlogHeader />
        <RenderPosts {...foundItem} singlePageIsLoaded />
      </div>
    );
  };
}

export default connect(
  null,
  { fetchPost },
)(BlogPosts);

BlogPosts.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }),
};
