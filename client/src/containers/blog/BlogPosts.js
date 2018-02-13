import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../../actions/postActionCreators';
import BlogHeader from '../../components/blog/blogHeader';
import RenderPosts from '../../components/blog/renderPosts';
import Loading from '../app/Loading';

class BlogPosts extends Component {
  state = { foundItem: {} };

  componentDidMount = () => this.fetchBlogPosts();

  fetchBlogPosts = () => {
    this.props.fetchPost(this.props.location.query.postId)
    .then(({data: { foundItem }}) => this.setState({foundItem}))
    .catch(err => console.error(err))
  };

  render = () => {
    const { foundItem } = this.state;

    if (isEmpty(foundItem)) return <Loading items={foundItem} message={'No blog posts were found!'} />

    return (
      <div className="blog-container">
        <BlogHeader />
        <RenderPosts {...foundItem} singlePageIsLoaded={true} />
      </div>
    );
  }
}

export default connect(null, { fetchPost })(BlogPosts);
