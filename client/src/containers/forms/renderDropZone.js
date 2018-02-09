import React from 'react';
import DropZone from 'react-dropzone';

const RenderDropZone = ({
	input,
	touched,
	error,
	// field,
	handleOnDrop,
	imageOriginalName,
	imageSize,
	imageAPIURL,
	label,
	map,
	newImageFiles,
	origImageFile,
	useStoredImage
}) => {
	const renderPreview = () => {
		return useStoredImage
			? <span key="imageFromDB">
					<li>
						<img
							src={imageAPIURL}
							alt={imageOriginalName}
						/>
					</li>
					<li>
						{imageOriginalName} - {imageSize} bytes
					</li>
				</span>
			: map(newImageFiles, ({ name, preview, size }) => {
					return (
						<span key="imageFromDrop">
							<li>
								<img src={preview} alt={name} />
							</li>
							<li>
								{name} - {size} bytes
							</li>
						</span>
					);
				});
	};

	return (
		<div>
			<DropZone
				accept="image/jpeg, image/png, image/gif, image/bmp"
				className="upload-container"
				onDrop={handleOnDrop}
				onChange={(filesToUpload) => {
					input.onChange(filesToUpload);
				}}
			>
				{newImageFiles.length > 0 || useStoredImage
					? <ul className="uploaded-images-container">
							{renderPreview()}
						</ul>
					: <span>
							<i className="fa fa-upload" aria-hidden="true" />
							<p>Click or drag file to this area to upload.</p>
						</span>}
			</DropZone>
			{touched && error &&
				<div className="error-handlers">
					{error}
				</div>}
			<label className="form-label">
				{label}
			</label>
		</div>
	);
};

export default RenderDropZone;
