import React from 'react';
import DropZone from 'react-dropzone';

const RenderDropZone = ({
	field,
	handleOnDrop,
	fileError,
	imageOriginalName,
	imageSize,
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
							src={process.env.PUBLIC_URL + '/uploads/' + origImageFile}
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
				className="upload-container"
				accept="image/jpeg, image/png, image/gif, image/bmp"
				onDrop={handleOnDrop}
				onChange={(filesToUpload, e) => field.input.onChange(filesToUpload)}
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
			{field.meta.touched &&
				field.meta.error &&
				<div className="error-handlers">
					{field.meta.error}
				</div>}
			<label className="form-label">
				{label}
			</label>
		</div>
	);
};

export default RenderDropZone;
