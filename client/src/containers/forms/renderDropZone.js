import React, { Fragment } from 'react';
import DropZone from 'react-dropzone';

import RenderPreviewImage from './renderPreviewImage';

export default ({
	input,
	touched,
	error,
	handleOnDrop,
	imageOriginalName,
	imageSize,
	imageAPIURL,
	label,
	map,
	newImageFiles,
	origImageFile,
	useStoredImage
}) => (
	<Fragment>
		<DropZone
			accept="image/jpeg, image/png, image/gif, image/bmp"
			className="upload-container"
			onDrop={handleOnDrop}
			onChange={(filesToUpload) => {
				input.onChange(filesToUpload);
			}}
		>
			{newImageFiles.length > 0 || useStoredImage
				? <RenderPreviewImage
						imageAPIURL={imageAPIURL}
						imageOriginalName={imageOriginalName}
						imageSize={imageSize}
						newImageFiles={newImageFiles}
						useStoredImage={useStoredImage}
					/>
				: <Fragment>
						<i className="fa fa-upload" aria-hidden="true" />
						<p>Click or drag file to this area to upload.</p>
					</Fragment>
			}
		</DropZone>
		{touched && error &&
			<div className="error-handlers">
				{error}
			</div>}
		<label className="form-label">
			{label}
		</label>
	</Fragment>
);
