import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/postActionCreators';
import NotFound from '../notfound/notFound';
import RenderPosts from './renderPosts';
import Spinner from '../loaders/spinner';

class ShowBlogPost extends Component {
	state = {
		foundPost: {},
		requestTimeout: false
	};

	componentDidMount() {
		this.fetchBlogPosts();
		this.timeout = setInterval(this.timer, 5000);
	}

	fetchBlogPosts = async () => {
		try {
			const { data: { post } } = await this.props.fetchPost(
				this.props.location.query.postId
			);

			this.setState({
				foundPost: post
			});
		} catch (e) {
			console.warn(e);
		}
	};

	componentWillUnmount() {
		this.clearTimeout();
	}

	timer = () => {
		this.setState({ requestTimeout: true });
		this.clearTimeout();
	};

	clearTimeout = () => {
		clearInterval(this.timeout);
	};

	render() {
		const { foundPost, requestTimeout } = this.state;
		const singlePageIsLoaded = true;

		if (_.isEmpty(foundPost)) {
			if (requestTimeout) return <NotFound />;

			return <Spinner />;
		}

		this.clearTimeout();

		const singleBlogPost = { ...foundPost, singlePageIsLoaded };

		return (
			<div className="blog-container">
				<h1 className="title">Blog</h1>
				<RenderPosts {...singleBlogPost} />
			</div>
		);
	}
}

export default connect(null, { fetchPost })(ShowBlogPost);
