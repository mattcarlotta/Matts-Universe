import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {
	addNewProject,
	editProject,
	fetchProject,
	redirectToProject
} from '../../actions/ProjectActionCreators';
import { authError } from '../../actions/AuthActionCreators';

import NotFound from '../../components/notfound/NotFound';
import RenderAlert from '../../components/app/RenderAlert';
import Spinner from '../../components/loaders/Spinner';

const validate = values => {
	const errors = {};

	if (!values.image) errors.image = 'Required';

	if (!values.title) errors.title = 'Required';
	else if (values.title.length > 50)
		errors.title = 'Error! Must be 50 characters or less!';
	else if (/[~`@#$%&*+=[\]\\;/{}|\\":<>]/g.test(values.title))
		errors.title = 'Error! Please remove any special characters!';

	if (/[~`@#$%&*+=[\]\\;{}|\\"<>]/g.test(values.image))
		errors.image = 'Error! Please remove any special characters!';

	if (!values.imgtitle) errors.imgtitle = 'Required';
	else if (values.imgtitle.length > 50)
		errors.imgtitle = 'Error! Must be 50 characters or less!';
	else if (/[~`@#$%&*+=[\]\\;/{}|\\":<>]/g.test(values.imgtitle))
		errors.imgtitle = 'Error! Please remove any special characters!';

	if (!values.description) errors.description = 'Required';
	else if (/[~@#$%&*=[\]\\/{}|\\<>]/g.test(values.description))
		errors.description = 'Error! Please remove any special characters!';
	else if (values.description.length > 250)
		errors.description = 'Error! Must be 250 characters or less!';

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

class ProjectsForm extends Component {
	constructor() {
		super();

		this.state = {
			isLoaded: false,
			requestTimeout: false
		};
	}

	componentDidMount() {
		if (this.props.location.query.titleId) this.fetchProjectToEdit();
	}

	componentWillUnmount() {
		this.clearTimeout();
	}

	fetchProjectToEdit = () => {
		this.timeout = setInterval(this.timer, 5000);
		fetchProject(this.props.location.query.titleId).then(res => {
			if (res.foundProject) this.initializeForm(res.foundProject);
			if (res.err) this.props.authError(res.err);
			this.setState({
				isLoaded: res.foundProject ? true : false
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

	initializeForm = foundProject => {
		const initData = {
			id: foundProject._id,
			image: foundProject.image,
			title: foundProject.title,
			imgtitle: foundProject.imgtitle,
			description: foundProject.description
		};

		this.props.initialize(initData);
	};

	handleFormSubmit = formProps => {
		this.props.location.query.titleId
			? editProject(formProps).then(res => {
					res.err ? this.props.authError(res.err) : redirectToProject();
				})
			: addNewProject(formProps).then(res => {
					res.err ? this.props.authError(res.err) : redirectToProject();
				});
	};

	showCharactersLeft = (propValue, limitValue) => {
		if (propValue) {
			let postCharactersLeft =
				propValue.length < limitValue ? limitValue - propValue.length : 0;

			return (
				<p>
					{' '}Characters left: {postCharactersLeft}
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
			<div className="form-container">
				<h1>
					{this.props.location.query.titleId
						? 'Edit Project'
						: 'Add New Project'}
				</h1>
				<hr />
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<Field
						name="image"
						type="text"
						component={renderInputField}
						label="Image URL"
					/>
					<Field
						name="title"
						type="text"
						component={renderInputField}
						label="Project Title"
					/>
					{this.showCharactersLeft(titleValue, 50)}
					<Field
						name="imgtitle"
						component={renderInputField}
						label="Image Description"
					/>
					{this.showCharactersLeft(imgTitleValue, 50)}
					<Field
						name="description"
						component={renderAreaField}
						label="Description"
					/>
					{this.showCharactersLeft(descriptionValue, 250)}
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

const selector = formValueSelector('ProjectsForm');

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

ProjectsForm = reduxForm({
	form: 'ProjectsForm',
	validate,
	fields: ['image', 'title', 'imgtitle', 'description']
})(ProjectsForm);

export default (ProjectsForm = connect(mapStateToProps, { authError })(
	ProjectsForm
));
