import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../../actions/postActionCreators';
import BlogHeader from '../../components/blog/blogHeader';
import RenderPosts from '../../components/blog/renderPosts';
import Loading from '../app/Loading';

class BlogPosts extends Component {
  state = { foundItem: {}, serverError: '' };

  componentDidMount = () => this.fetchBlogPosts();

  fetchBlogPosts = () => {
    this.props.fetchPost(this.props.location.query.postId)
    .then(({data: { foundItem }}) => this.setState({foundItem}))
    .catch(err => this.setState({ serverError: err }))
  };

  render = () => {
    const { foundItem, serverError } = this.state;

    if (isEmpty(foundItem)) return (
      <Loading
        items={foundItem}
        message={'No blog posts were found that matched that title!'}
        serverError={serverError}
      />
    )

    return (
      <div className="blog-container">
        <BlogHeader />
        <RenderPosts {...foundItem} singlePageIsLoaded={true} />
      </div>
    );
  }
}

export default connect(null, { fetchPost })(BlogPosts);
