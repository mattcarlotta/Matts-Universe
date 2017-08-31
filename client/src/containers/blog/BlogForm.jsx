import { map, each } from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';

// addNewPost,
// editPost,
// redirectToBlog
import { fetchPost } from '../../actions/postActionCreators';
import FIELDS from './data/blogFormFields';
import NotFound from '../../components/notfound/notFound';
import RenderInputField from '../forms/renderInputField';
import RenderFormButtons from '../forms/renderFormButtons';
import RenderTextAreaField from '../forms/renderTextAreaField';
import Spinner from '../../components/loaders/spinner';
import ValidateFormFields from './data/validateFormFields';

const validate = values => {
	const errors = {};

	each(ValidateFormFields, ({ label, length }) => {
		if (!values[label]) errors[label] = 'Required';
		else if (values[label].length > length)
			errors[label] = `Error! Must be ${length} characters or less!`;
		else if (/[~`@#$%&*+=[\]\\;/{}|\\":<>]/g.test(values[label]))
			errors[label] = 'Error! Please remove any special characters!';
	});

	return errors;
};

class BlogPostForm extends Component {
	state = {
		isLoaded: false,
		requestTimeout: false,
		imageFiles: []
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

			this.setState({ isLoaded: true }, () => this.initializeForm(foundPost));
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

	onDrop = files => {
		this.setState({
			imageFiles: files
		});
	};

	handleFormSubmit = formProps => {
		console.log(formProps);
		// this.props.location.query.titleId
		// 	? editPost(formProps).then(res => {
		// 			res.err ? this.props.authError(res.err) : redirectToBlog();
		// 		})
		// 	: addNewPost(formProps).then(res => {
		// 			res.err ? this.props.authError(res.err) : redirectToBlog();
		// 		});
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
		const { isLoaded, requestTimeout } = this.state;

		if (this.props.location.query.titleId && !isLoaded) {
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
						name="upload-image"
						component="file"
						type="file"
						placeholder="Upload Image">
						<DropZone
							className="upload-container"
							accept="image/jpeg, image/png"
							onDrop={this.onDrop}>
							{this.state.imageFiles.length > 0
								? <ul className="uploaded-images-container">
										{map(this.state.imageFiles, ({ name, preview, size }) => [
											<span key={name}>
												<li>
													<img src={preview} alt="{preview}" />
												</li>
												<li>
													{name} - {size} bytes
												</li>
											</span>
										])}
									</ul>
								: <span>
										<i className="fa fa-upload" aria-hidden="true" />
										<p>Click or drag file to this area to upload.</p>
									</span>}
						</DropZone>
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
	validate,
	enableReinitialize: true,
	fields: ['upload-image', 'title', 'imgtitle', 'description']
})(BlogPostForm);

export default connect(mapStateToProps, { fetchPost })(BlogPostForm);
