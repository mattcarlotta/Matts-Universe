import React, { Component } from 'react';
import DropZone from 'react-dropzone';

class RenderDropZone extends Component {
	state = {
		image: this.props.image,
		imageFiles: []
	};

	renderPreview = () => {
		const { imageName, imageSize, map } = this.props;
		const { image, imageFiles } = this.state;

		return image
			? <span key="imageFromDB">
					<li>
						<img src={image} alt={imageName} />
					</li>
					<li>
						{imageName} - {imageSize} bytes
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
					this.setState({ imageFiles: newImage, image: false })}
			>
				{this.state.imageFiles.length > 0 || this.state.image
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
