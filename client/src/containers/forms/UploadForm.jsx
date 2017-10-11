import { map } from 'lodash';
import React, { Component } from 'react';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { allowedCharacters, isRequired } from '../forms/validateFormFields';
import FIELDS from './formFields';
import NotFound from '../../components/notfound/notFound';
import RenderDropZone from '../forms/renderDropZone';
import RenderFormButtons from '../forms/renderFormButtons';
import RenderInputField from '../forms/renderInputField';
import RenderTextAreaField from '../forms/renderTextAreaField';
import showCharactersLeft from '../forms/showCharactersLeft';
import Spinner from '../../components/loaders/spinner';

class UploadForm extends Component {
	state = {
		isLoaded: false,
		requestTimeout: false,
		newImageFiles: [],
		useStoredImage: false
	};

	componentDidMount() {
		if (this.props.queryId) this.fetchItemToEdit();
	}

	componentWillUnmount() {
		this.clearTimeout();
	}

	fetchItemToEdit = async () => {
		this.timeout = setInterval(this.timer, 5000);
		try {
			const { data: { foundItem } } = await this.props.fetchItem(
				this.props.queryId
			);

			this.initializeForm(foundItem);
			this.setState({
				isLoaded: true,
				imageOriginalName: foundItem.image.originalName,
				imageSize: foundItem.image.size,
				imageAPIURL: foundItem.image.apiURL,
				origImageFile: foundItem.image.path,
				useStoredImage: true
			});
		} catch (err) {
			console.error(err);
		}
	};

	initializeForm = foundItem => {
		this.props.initialize(foundItem);
	};

	timer = () => {
		this.setState({ requestTimeout: true });
		this.clearTimeout();
	};

	clearTimeout = () => {
		clearInterval(this.timeout);
	};

	handleOnDrop = newImage => {
		this.setState({ newImageFiles: newImage, useStoredImage: false });
	};

	resetForm = reset => {
		this.setState({
			newImageFiles: [],
			useStoredImage: this.props.queryId ? true : false
		});
		reset();
	};

	renderDropZoneField = field => {
		const {
			imageOriginalName,
			imageSize,
			imageAPIURL,
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
				imageAPIURL={imageAPIURL}
				label="Upload Image"
				origImageFile={origImageFile}
				map={map}
				newImageFiles={newImageFiles}
				useStoredImage={useStoredImage}
			/>
		);
	};

	imageIsRequired = value => {
		return !this.props.queryId && !value ? 'Required' : undefined;
	};

	render() {
		const {
			allowedLength,
			descriptionValue,
			formTitle,
			handleSubmit,
			imgTitleValue,
			maxFieldLength,
			pristine,
			queryId,
			reset,
			submitting,
			serverError,
			titleValue
		} = this.props;
		const { isLoaded, origImageFile, requestTimeout } = this.state;
		const characterValue = [titleValue, imgTitleValue, descriptionValue];

		if (queryId && !isLoaded && !origImageFile) {
			if (requestTimeout || serverError) return <NotFound />;

			return <Spinner />;
		}

		return (
			<div className="form-container col-xs-12">
				<h1>{formTitle}</h1>
				<hr />
				<Form onSubmit={handleSubmit}>
					<Field
						name="file"
						component={this.renderDropZoneField}
						type="file"
						placeholder="Upload Image"
						validate={[this.imageIsRequired]}
					/>
					{map(FIELDS, ({ name, label }, key) => {
						return (
							<span key={key}>
								{showCharactersLeft(characterValue[key], allowedLength[key])}
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
										maxFieldLength[key]
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
				</Form>
			</div>
		);
	}
}

const selector = formValueSelector('uploadForm');

const mapStateToProps = state => {
	return {
		descriptionValue: selector(state, 'description'),
		imgTitleValue: selector(state, 'imgtitle'),
		titleValue: selector(state, 'title'),
		serverError: state.auth.error
	};
};

export default reduxForm({
	form: 'uploadForm'
})(connect(mapStateToProps)(UploadForm));
