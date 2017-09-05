import { map, each } from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import ConfigAuth from '../../actions/configAuth';
import CreateFormData from '../forms/configFormData';
import {
	fetchPost,
	addNewPost,
	editPost,
	redirectToBlog
} from '../../actions/postActionCreators';
import FIELDS from './data/blogFormFields';
import NotFound from '../../components/notfound/notFound';
import RenderDropZone from '../forms/renderDropZone';
import RenderFormButtons from '../forms/renderFormButtons';
import RenderInputField from '../forms/renderInputField';
import RenderTextAreaField from '../forms/renderTextAreaField';
import Spinner from '../../components/loaders/spinner';
import ValidateFormFields from './data/validateFormFields';

const validate = values => {
	const errors = {};

	each(ValidateFormFields, ({ label, length }) => {
		if (!values[label]) errors[label] = 'Required';
		else if (values[label].length > length)
			errors[label] = `Error! Must be ${length} characters or less!`;
		else if (/[~`@#$%&*+=[\]\\/{}|\\":<>]/g.test(values[label]))
			errors[label] = 'Error! Please remove any special characters!';
	});

	return errors;
};

class BlogPostForm extends Component {
	state = {
		isLoaded: false,
		requestTimeout: false
	};

	componentDidMount() {
		if (this.props.location.query.titleId) this.fetchPostToEdit();
	}

	componentWillUnmount() {
		this.clearTimeout();
	}

	fetchPostToEdit = async () => {
		this.timeout = setInterval(this.timer, 5000);
		try {
			const { data: { foundPost } } = await this.props.fetchPost(
				this.props.location.query.titleId
			);

			this.setState(
				{
					isLoaded: true,
					image: foundPost.image,
					imageName: foundPost.imageName,
					imageSize: foundPost.imageSize
				},
				() => this.initializeForm(foundPost)
			);
		} catch (e) {
			console.log(e);
		}
	};

	timer = () => {
		this.setState({ requestTimeout: true });
		this.clearTimeout();
	};

	clearTimeout = () => {
		clearInterval(this.timeout);
	};

	initializeForm = foundPost => {
		this.props.initialize(foundPost);
	};

	ajaxRequestToDB = async (ajaxAction, formProps) => {
		try {
			const config = await ConfigAuth();
			const formData = await CreateFormData(formProps);
			const _id = formProps._id || null;
			await ajaxAction(_id, formData, config);
		} catch (err) {
			console.error(err);
		}
	};

	handleFormSubmit = formProps => {
		this.props.location.query.titleId
			? this.ajaxRequestToDB(this.props.editPost, formProps)
			: this.ajaxRequestToDB(this.props.addNewPost, formProps);
	};

	showCharactersLeft = (propValue, limitValue) => {
		if (propValue) {
			let postCharactersLeft =
				propValue.length < limitValue ? limitValue - propValue.length : 0;

			return (
				<p className="characters-left">
					Characters left: {postCharactersLeft}
				</p>
			);
		}
	};

	render() {
		const {
			descriptionValue,
			imgTitleValue,
			titleValue,
			handleSubmit,
			pristine,
			reset,
			submitting,
			serverError
		} = this.props;
		const {
			isLoaded,
			requestTimeout,
			image,
			imageName,
			imageSize
		} = this.state;

		if (this.props.location.query.titleId && !isLoaded && !image) {
			if (requestTimeout || serverError) return <NotFound />;

			return <Spinner />;
		}
		this.clearTimeout();

		return (
			<div className="form-container col-xs-12">
				<h1>
					{this.props.location.query.titleId
						? 'Edit Post Form'
						: 'Create New Post'}
				</h1>
				<hr />
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<Field
						name="file"
						component="file"
						type="file"
						placeholder="Upload Image"
					>
						<RenderDropZone
							map={map}
							image={image}
							imageName={imageName}
							imageSize={imageSize}
						/>
					</Field>
					{map(FIELDS, ({ name, type, label }, key) => {
						const characterValue =
							name === 'title' ? titleValue : imgTitleValue;
						const allowedLength = name === 'title' ? 50 : 100;
						return (
							<span key={key}>
								{this.showCharactersLeft(characterValue, allowedLength)}
								<Field
									name={name}
									type="text"
									component={RenderInputField}
									label={name === 'title' ? 'Post Title' : 'Image Description'}
								/>
							</span>
						);
					})}
					{this.showCharactersLeft(descriptionValue, 5000)}
					<Field
						name={'description'}
						type={'text'}
						component={RenderTextAreaField}
						label={'Description'}
					/>
					<RenderFormButtons
						submitting={submitting}
						pristine={pristine}
						reset={reset}
					/>
				</form>
			</div>
		);
	}
}

const selector = formValueSelector('BlogPostForm');

const mapStateToProps = state => {
	const descriptionValue = selector(state, 'description');
	const imgTitleValue = selector(state, 'imgtitle');
	const titleValue = selector(state, 'title');

	return {
		descriptionValue,
		imgTitleValue,
		titleValue,
		serverError: state.auth.error
	};
};

BlogPostForm = reduxForm({
	form: 'BlogPostForm',
	validate
})(BlogPostForm);

export default connect(mapStateToProps, {
	fetchPost,
	addNewPost,
	editPost,
	redirectToBlog
})(BlogPostForm);
