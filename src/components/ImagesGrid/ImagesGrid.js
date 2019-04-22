import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ImagesGridRoot, ImageCell } from './ImagesGrid.styles';

const ImagesGrid = ({ images, onImageClick }) => (
  <ImagesGridRoot>
    {images.map((image, index) => {
      const handleClick = onImageClick && (e => onImageClick(e, index, image));

      return (
        <ImageCell
          key={image.image.url}
          src={image.image.url}
          onClick={handleClick}
          rowStart={image.row_start}
          rowEnd={image.row_end}
          colStart={image.column_start}
          colEnd={image.column_end}
        />
      );
    })}
  </ImagesGridRoot>
);

export const IMAGES_GRID_IMAGES_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      caption: PropTypes.string,
    }),
    row_start: PropTypes.string.isRequired,
    row_end: PropTypes.string.isRequired,
    column_start: PropTypes.string.isRequired,
    column_end: PropTypes.string.isRequired,
  }),
);

ImagesGrid.propTypes = {
  images: IMAGES_GRID_IMAGES_TYPE,
  onImageClick: PropTypes.func,
};

export default memo(ImagesGrid);
