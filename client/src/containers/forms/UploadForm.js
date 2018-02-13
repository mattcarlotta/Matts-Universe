import { map } from 'lodash';
import React, { Component } from 'react';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { allowedCharacters, isRequired } from '../forms/validateFormFields';
import FIELDS from './formFields';
import RenderDropZone from './renderDropZone';
import RenderFormButtons from './renderFormButtons';
import RenderInputField from './renderInputField';
import RenderTextAreaField from './renderTextAreaField';
import showCharactersLeft from './showCharactersLeft';
import Loading from '../app/Loading';

class UploadForm extends Component {
	state = {
		isLoaded: false,
		newImageFiles: [],
		useStoredImage: false
	};

	componentDidMount = () => this.props.queryId && this.fetchItemToEdit();

	fetchItemToEdit = () => {
		this.props.fetchItem(this.props.queryId)
		.then(({data: { foundItem }}) => {
			this.initializeForm(foundItem);
			this.setState({
				isLoaded: true,
				imageOriginalName: foundItem.image.originalName,
				imageSize: foundItem.image.size,
				imageAPIURL: foundItem.image.apiURL,
				origImageFile: foundItem.image.path,
				useStoredImage: true
			});
		})
		.catch(err => console.err(err))
	};

	initializeForm = foundItem => this.props.initialize(foundItem);

	handleOnDrop = newImage => this.setState({ newImageFiles: newImage, useStoredImage: false });

	resetForm = reset => {
		this.setState({
			newImageFiles: [],
			useStoredImage: this.props.queryId ? true : false
		});
		reset();
	};

	imageIsRequired = value => ( !this.props.queryId && !value ? 'Required' : undefined )

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
		const {
			imageOriginalName,
			imageSize,
			imageAPIURL,
			isLoaded,
			origImageFile,
			newImageFiles,
			useStoredImage
		} = this.state;
		const characterValue = [titleValue, imgTitleValue, descriptionValue];

		if (queryId && !isLoaded && !origImageFile) {
			return <Loading items={origImageFile} message={'Unable to locate the project or post!'} serverError={serverError} />
		}

		return (
			<div className="form-container col-xs-12">
				<h1>{formTitle}</h1>
				<Form onSubmit={handleSubmit}>
					<Field
						name="file"
						component={({ input, meta: { error, touched } }) =>
							<RenderDropZone
								input={input}
								touched={touched}
								error={error}
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
						}
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
