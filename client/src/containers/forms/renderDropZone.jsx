import React, { Component } from 'react';
import DropZone from 'react-dropzone';

class RenderDropZone extends Component {
	state = {
		imageFileName: this.props.imageFileName,
		imageFiles: []
	};

	renderPreview = () => {
		const { map, imageOriginalName, imageSize } = this.props;
		const { imageFileName, imageFiles } = this.state;

		return imageFileName
			? <span key="imageFromDB">
					<li>
						<img
							src={process.env.PUBLIC_URL + '/uploads/' + imageFileName}
							alt="asd"
						/>
					</li>
					<li>
						{imageOriginalName} - {imageSize} bytes
					</li>
				</span>
			: map(imageFiles, ({ name, preview, size }) => {
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

	render() {
		return (
			<DropZone
				className="upload-container"
				accept="image/jpeg, image/png, image/gif, image/bmp"
				onDrop={newImage =>
					this.setState({ imageFiles: newImage, imageFileName: false })}
			>
				{this.state.imageFiles.length > 0 || this.state.imageFileName
					? <ul className="uploaded-images-container">
							{this.renderPreview()}
						</ul>
					: <span>
							<i className="fa fa-upload" aria-hidden="true" />
							<p>Click or drag file to this area to upload.</p>
						</span>}
			</DropZone>
		);
	}
}

export default RenderDropZone;
