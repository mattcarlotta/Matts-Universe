import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {
	addNewPost,
	editPost,
	fetchPost,
	redirectToBlog
} from '../../actions/PostActionCreators';
import { authError } from '../../actions/AuthActionCreators';

import NotFound from '../../components/notfound/NotFound';
import RenderAlert from '../../components/app/RenderAlert';
import Spinner from '../../components/loaders/Spinner';

const validate = values => {
	const errors = {};

	if (!values.title) errors.title = 'Required';
	else if (values.title.length > 50)
		errors.title = 'Error! Must be 50 characters or less!';
	else if (/[~`@#$%&*+=[\]\\;/{}|\\":<>]/g.test(values.title))
		errors.title = 'Error! Please remove any special characters!';

	if (/[~`@#$%&*+=[\]\\;{}|\\"<>]/g.test(values.image))
		errors.image = 'Error! Please remove any special characters!';

	if (values.imgtitle) {
		if (values.imgtitle.length > 100)
			errors.imgtitle = 'Error! Must be 50 characters or less!';
		else if (/[~`@#$%&*+=[\]\\;/{}|\\":<>]/g.test(values.imgtitle))
			errors.imgtitle = 'Error! Please remove any special characters!';
	}

	if (!values.description) errors.description = 'Required';
	else if (values.description.length > 5000)
		errors.description = 'Error! Must be 5,000 characters or less!';
	else if (/[~@#$%&*=[\]\\/{}|\\<>]/g.test(values.description))
		errors.description = 'Error! Please remove any special characters!';

	return errors;
};

const renderInputField = ({ input, label, type, meta: { touched, error } }) =>
	<div>
		<label>
			{label}
		</label>
		<div>
			<input
				{...input}
				className="form-details"
				placeholder={label}
				type={type}
			/>
			{touched &&
				error &&
				<div className="error-handlers ">
					<i className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{error}
				</div>}
		</div>
	</div>;

const renderAreaField = ({
	textarea,
	input,
	label,
	type,
	meta: { touched, error }
}) =>
	<div>
		<label>
			{label}
		</label>
		<div>
			<textarea
				{...input}
				className="form-details"
				placeholder={label}
				type={type}
			/>
			{touched &&
				error &&
				<div className="error-handlers">
					<i className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{error}
				</div>}
		</div>
	</div>;

class BlogPostForm extends Component {
	constructor() {
		super();

		this.state = {
			isLoaded: false,
			requestTimeout: false
		};
	}

	componentDidMount() {
		if (this.props.location.query.titleId) this.fetchPostToEdit();
	}

	componentWillUnmount() {
		this.clearTimeout();
	}

	fetchPostToEdit = () => {
		this.timeout = setInterval(this.timer, 5000);
		fetchPost(this.props.location.query.titleId).then(res => {
			if (res.foundPost) this.initializeForm(res.foundPost);
			if (res.err) this.props.authError(res.err);
			this.setState({
				isLoaded: res.foundPost ? true : false
			});
		});
	};

	timer = () => {
		this.setState({ requestTimeout: true });
		this.clearTimeout();
	};

	clearTimeout = () => {
		clearInterval(this.timeout);
	};

	initializeForm = foundPost => {
		const initData = {
			id: foundPost._id,
			title: foundPost.title,
			image: foundPost.image,
			imgtitle: foundPost.imgtitle,
			description: foundPost.description
		};

		this.props.initialize(initData);
	};

	handleFormSubmit = formProps => {
		this.props.location.query.titleId
			? editPost(formProps).then(res => {
					res.err ? this.props.authError(res.err) : redirectToBlog();
				})
			: addNewPost(formProps).then(res => {
					res.err ? this.props.authError(res.err) : redirectToBlog();
				});
	};

	showCharactersLeft = (propValue, limitValue) => {
		if (propValue) {
			let postCharactersLeft =
				propValue.length < limitValue ? limitValue - propValue.length : 0;

			return (
				<p>
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
			if (serverError)
				return (
					<RenderAlert
						resetError={this.props.authError}
						errorMessage={serverError}
					/>
				);
			if (requestTimeout) return <NotFound />;

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
						name="title"
						type="text"
						component={renderInputField}
						label="Post Title"
					/>
					{this.showCharactersLeft(titleValue, 50)}
					<Field
						name="image"
						type="text"
						component={renderInputField}
						label="Image URL"
					/>
					<Field
						name="imgtitle"
						component={renderInputField}
						label="Image Description"
					/>
					{this.showCharactersLeft(imgTitleValue, 100)}
					<Field
						name="description"
						component={renderAreaField}
						label="Description"
					/>
					{this.showCharactersLeft(descriptionValue, 5000)}
					<div>
						<button
							type="submit"
							className="btn btn-primary partial-expand rounded"
							disabled={submitting}>
							Submit
						</button>
						<button
							type="button"
							className="btn btn-danger partial-expand rounded f-r"
							disabled={pristine || submitting}
							onClick={reset}>
							Clear Values
						</button>
					</div>
				</form>
				{serverError
					? <RenderAlert
							resetError={this.props.authError}
							errorMessage={serverError}
						/>
					: null}
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
	fields: ['title', 'image', 'imgtitle', 'description']
})(BlogPostForm);

export default (BlogPostForm = connect(mapStateToProps, { authError })(
	BlogPostForm
));
