import map from 'lodash/map';
import React from 'react';

export default ({
  imageAPIURL,
  imageOriginalName,
  imageSize,
  newImageFiles,
  useStoredImage
}) => (
  <ul className="uploaded-images-container">
    {useStoredImage
      ? [<li key="imagefromDB">
          <img
            src={imageAPIURL}
            alt={imageOriginalName}
          />
        </li>,
        <li key="imagefromDBDetails">
          {imageOriginalName} - {imageSize} bytes
        </li>]
      : map(newImageFiles, ({ name, preview, size }) => [
          <li key="previewImage">
            <img src={preview} alt={name} />
          </li>,
          <li key="previewImageDetails">
            {name} - {size} bytes
          </li>
        ])
    }
  </ul>
)
