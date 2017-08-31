import { each, map } from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {
	addNewProject,
	editProject,
	fetchProject
} from '../../actions/projectActionCreators';
import FIELDS from './data/blogFormFields';
import NotFound from '../../components/notfound/notFound';
import RenderInputField from '../forms/renderInputField';
import RenderFormButtons from '../forms/renderFormButtons';
import RenderTextAreaField from '../forms/renderTextAreaField';
import Spinner from '../../components/loaders/spinner';
import ValidateFormFields from './data/validateFormFields';

const validate = values => {
	const errors = {};

	if (!values.image) errors.image = 'Required';
	else if (/[~`@#$%&*+=[\]\\;{}|\\"<>]/g.test(values.image))
		errors.image = 'Error! Please remove any special characters!';

	each(ValidateFormFields, ({ label, length }) => {
		if (!values[label]) errors[label] = 'Required';
		else if (values[label].length > length)
			errors[label] = `Error! Must be ${length} characters or less!`;
		else if (/[~`@#$%&*+=[\]\\;/{}|\\":<>]/g.test(values[label]))
			errors[label] = 'Error! Please remove any special characters!';
	});

	return errors;
};

class ProjectsForm extends Component {
	state = {
		isLoaded: false,
		requestTimeout: false
	};

	componentDidMount() {
		if (this.props.location.query.titleId) this.fetchProjectToEdit();
	}

	componentWillUnmount() {
		this.clearTimeout();
	}

	fetchProjectToEdit = async () => {
		this.timeout = setInterval(this.timer, 5000);
		try {
			const { data: { foundProject } } = await this.props.fetchProject(
				this.props.location.query.titleId
			);

			this.setState({ isLoaded: true }, () =>
				this.initializeForm(foundProject)
			);
		} catch (err) {
			console.error(err);
		}
	};

	timer = () => {
		this.setState({ requestTimeout: true });
		this.clearTimeout();
	};

	clearTimeout = () => {
		clearInterval(this.timeout);
	};

	initializeForm = foundProject => {
		this.props.initialize(foundProject);
	};

	handleFormSubmit = async formProps => {
		try {
			this.props.location.query.titleId
				? await this.props.editProject(formProps)
				: await this.props.addNewProject(formProps);
		} catch (e) {
			console.error(e);
		}
	};

	showCharactersLeft = (propValue, limitValue) => {
		if (propValue) {
			let postCharactersLeft =
				propValue.length < limitValue
					? limitValue - propValue.length
					: 'Too many characters!';

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
			submitting
		} = this.props;
		const { isLoaded, requestTimeout } = this.state;
		const { serverError } = this.props;

		if (this.props.location.query.titleId && !isLoaded) {
			if (requestTimeout || serverError) return <NotFound />;

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
						component={RenderInputField}
						label="Image URL"
					/>
					{map(FIELDS, ({ name, type, label }, key) => {
						const characterValue =
							name === 'title' ? titleValue : imgTitleValue;
						return (
							<span key={key}>
								{this.showCharactersLeft(characterValue, 50)}
								<Field
									name={name}
									type="text"
									component={RenderInputField}
									label={
										name === 'title' ? 'Project Title' : 'Image Description'
									}
								/>
							</span>
						);
					})}
					{this.showCharactersLeft(descriptionValue, 250)}
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

export default connect(mapStateToProps, {
	addNewProject,
	editProject,
	fetchProject
})(ProjectsForm);
