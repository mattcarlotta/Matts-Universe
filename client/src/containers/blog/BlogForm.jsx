import { each, map } from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import ConfigAuth from '../../actions/configAuth';
import CreateFormData from '../forms/configFormData';
import {
	addNewPost,
	editPost,
	fetchPost,
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
					imageFileName: foundPost.image.fileName,
					imageOriginalName: foundPost.image.originalName,
					imageSize: foundPost.image.size
				},
				() => this.initializeForm(foundPost)
			);
		} catch (err) {
			console.error(err);
		}
	};

	initializeForm = foundPost => {
		this.props.initialize(foundPost);
	};

	timer = () => {
		this.setState({ requestTimeout: true });
		this.clearTimeout();
	};

	clearTimeout = () => {
		clearInterval(this.timeout);
	};

	handleCreatePost = (id, formData, config) => {
		try {
			// const config = ConfigAuth();
			// const formData = CreateFormData(formProps);
			// const id = formProps._id ? formProps._id : null;
			this.props.addNewPost(id, formData, config);
			// this.props.editPost(id, formData, config);
			redirectToBlog();
		} catch (err) {
			console.error(err);
		}
	};

	handleEditPost = (id, formData, config) => {
		try {
			// const config = ConfigAuth();
			// const formData = CreateFormData(formProps);
			// const id = formProps._id ? formProps._id : null;
			this.props.editPost(id, formData, config);
			// this.props.editPost(id, formData, config);
			redirectToBlog();
		} catch (err) {
			console.error(err);
		}
	};

	// submitToDB = async (action, id, formData, config) => {
	// 	try {
	// 		await action(id, formData, config);
	// 		redirectToBlog();
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	handleFormSubmit = formProps => {
		const id = formProps._id ? formProps._id : null;
		const formData = CreateFormData(formProps);
		const config = ConfigAuth();

		if (this.props.location.query.titleId) {
			this.handleEditPost(id, formData, config);
		} else {
			this.handleCreatePost(id, formData, config);
		}
		// try {
		// 	this.props.addNewPost(id, formData, config);
		// 	// this.props.editPost(id, formData, config);
		// 	redirectToBlog();
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	showCharactersLeft = (propValue, limitValue) => {
		if (propValue) {
			let postCharactersLeft =
				propValue.length < limitValue
					? limitValue - propValue.length
					: 'Too many characters!';

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
			imageFileName,
			imageOriginalName,
			imageSize
		} = this.state;

		if (this.props.location.query.titleId && !isLoaded && !imageFileName) {
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
							imageFileName={imageFileName}
							imageOriginalName={imageOriginalName}
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
					{this.showCharactersLeft(descriptionValue, 10000)}
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
	addNewPost,
	editPost,
	fetchPost
})(BlogPostForm);
