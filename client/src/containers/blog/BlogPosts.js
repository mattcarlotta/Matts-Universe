import { isEmpty } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../../actions/postActionCreators';
import BlogHeader from '../../components/blog/blogHeader';
import NotFound from '../../components/notfound/notFound';
import RenderPosts from '../../components/blog/renderPosts';
import Spinner from '../../components/loaders/spinner';

class BlogPosts extends Component {
  state = { foundItem: {}, requestTimeout: false };

  componentDidMount() {
    this.fetchBlogPosts();
    this.timeout = setInterval(this.timer, 5000);
  }

  fetchBlogPosts = () => {
    this.props.fetchPost(this.props.location.query.postId)
    .then(({data: { foundItem }}) => this.setState({foundItem}))
    .catch(err => console.error(err))
  };

  componentWillUnmount() {
    this.clearTimeout();
  }

  timer = () => {
    this.setState({ requestTimeout: true });
    this.clearTimeout();
  };

  clearTimeout = () => clearInterval(this.timeout);

  render = () => {
    const { foundItem, requestTimeout } = this.state;
    const singlePageIsLoaded = true;

    if (isEmpty(foundItem)) {
      if (requestTimeout) return <NotFound />;

      return <Spinner />;
    }

    this.clearTimeout();

    const singleBlogPost = { ...foundItem, singlePageIsLoaded };

    return (
      <div className="blog-container">
        <BlogHeader />
        <RenderPosts {...singleBlogPost} />
      </div>
    );
  }
}

export default connect(null, { fetchPost })(BlogPosts);
