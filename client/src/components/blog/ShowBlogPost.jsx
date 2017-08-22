import _ from 'lodash';
import React, { Component } from 'react';

import { fetchPost } from '../../actions/PostActionCreators';
import NotFound from '../notfound/NotFound';
import RenderPosts from './RenderPosts';
import Spinner from '../loaders/Spinner';

class ShowBlogPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			foundPost: {},
			requestTimeout: false
		};
	}

	componentDidMount() {
		this.fetchBlogPosts();
		this.timeout = setInterval(this.timer, 5000);
	}

	fetchBlogPosts = () => {
		fetchPost(this.props.location.query.postId).then(res => {
			this.setState({
				foundPost: res.foundPost ? res.foundPost : '',
				serverError: res.err ? res.err : ''
			});
		});
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
		const { foundPost, requestTimeout, serverError } = this.state;
		const singlePageIsLoaded = true;

		if (_.isEmpty(foundPost)) {
			if (serverError || requestTimeout) return <NotFound />;

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

export default ShowBlogPost;
