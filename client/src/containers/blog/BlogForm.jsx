import { map } from 'lodash';
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
import {
	allowedCharacters,
	isRequired,
	maxLengthAllowed
} from '../forms/validateFormFields';
import FIELDS from './data/blogFormFields';
import NotFound from '../../components/notfound/notFound';
import RenderDropZone from '../forms/renderDropZone';
import RenderFormButtons from '../forms/renderFormButtons';
import RenderInputField from '../forms/renderInputField';
import RenderTextAreaField from '../forms/renderTextAreaField';
import showCharactersLeft from '../forms/showCharactersLeft';
import Spinner from '../../components/loaders/spinner';

class BlogPostForm extends Component {
	state = {
		isLoaded: false,
		requestTimeout: false,
		newImageFiles: [],
		useStoredImage: false
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

			this.initializeForm(foundPost);
			this.setState({
				isLoaded: true,
				imageOriginalName: foundPost.image.originalName,
				imageSize: foundPost.image.size,
				origImageFile: foundPost.image.fileName,
				useStoredImage: true
			});
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

	handleCreatePost = async (id, formData, config) => {
		try {
			await this.props.addNewPost(id, formData, config);
			redirectToBlog();
		} catch (err) {
			console.error(err);
		}
	};

	handleEditPost = async (id, formData, config) => {
		try {
			await this.props.editPost(id, formData, config);
			redirectToBlog();
		} catch (err) {
			console.error(err);
		}
	};

	handleOnDrop = newImage => {
		this.setState({ newImageFiles: newImage, useStoredImage: false });
	};

	resetForm = reset => {
		this.setState({
			newImageFiles: [],
			useStoredImage: this.props.location.query.titleId ? true : false
		});
		reset();
	};

	handleFormSubmit = formProps => {
		const id = formProps._id ? formProps._id : null;
		const formData = CreateFormData(formProps);
		const config = ConfigAuth();

		if (this.props.location.query.titleId) {
			this.handleEditPost(id, formData, config);
		} else {
			this.handleCreatePost(id, formData, config);
		}
	};

	renderDropZoneField = field => {
		const {
			imageOriginalName,
			imageSize,
			origImageFile,
			newImageFiles,
			useStoredImage
		} = this.state;
		return (
			<RenderDropZone
				field={field}
				handleOnDrop={this.handleOnDrop}
				imageOriginalName={imageOriginalName}
				imageSize={imageSize}
				label="Upload Image"
				origImageFile={origImageFile}
				map={map}
				newImageFiles={newImageFiles}
				useStoredImage={useStoredImage}
			/>
		);
	};

	imageIsRequired = value => {
		return !this.props.location.query.titleId && !value
			? 'Required'
			: undefined;
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
		const { isLoaded, origImageFile, requestTimeout } = this.state;
		const { titleId } = this.props.location.query;
		const characterValue = [titleValue, imgTitleValue, descriptionValue];

		if (titleId && !isLoaded && !origImageFile) {
			if (requestTimeout || serverError) return <NotFound />;

			return <Spinner />;
		}

		return (
			<div className="form-container col-xs-12">
				<h1>
					{titleId ? 'Edit Post Form' : 'Create New Post'}
				</h1>
				<hr />
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<Field
						name="file"
						component={this.renderDropZoneField}
						type="file"
						placeholder="Upload Image"
						validate={[this.imageIsRequired]}
					/>
					{map(FIELDS, ({ name, label, allowedLength }, key) => {
						return (
							<span key={key}>
								{showCharactersLeft(characterValue[key], allowedLength)}
								<Field
									name={name}
									type="text"
									component={
										name === 'title' || name === 'imgtitle'
											? RenderInputField
											: RenderTextAreaField
									}
									label={label}
									validate={[
										isRequired,
										allowedCharacters,
										maxLengthAllowed[key]
									]}
								/>
							</span>
						);
					})}
					<RenderFormButtons
						submitting={submitting}
						pristine={pristine}
						resetForm={() => this.resetForm(reset)}
					/>
				</form>
			</div>
		);
	}
}

const selector = formValueSelector('blogPostForm');

const mapStateToProps = state => {
	return {
		descriptionValue: selector(state, 'description'),
		imgTitleValue: selector(state, 'imgtitle'),
		titleValue: selector(state, 'title'),
		serverError: state.auth.error
	};
};

export default reduxForm({
	form: 'blogPostForm'
})(
	connect(mapStateToProps, {
		addNewPost,
		editPost,
		fetchPost
	})(BlogPostForm)
);
