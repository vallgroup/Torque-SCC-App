import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { PageImagesGrid, ImageCell } from './PageImages.styles';

const PageImages = ({ images }) => (
  <PageImagesGrid>
    {images.map(image => (
      <ImageCell
        key={image.image}
        src={image.image}
        rowStart={image.row_start}
        rowEnd={image.row_end}
        colStart={image.column_start}
        colEnd={image.column_end}
      />
    ))}
  </PageImagesGrid>
);

PageImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      row_start: PropTypes.string.isRequired,
      row_end: PropTypes.string.isRequired,
      column_start: PropTypes.string.isRequired,
      column_end: PropTypes.string.isRequired,
    }),
  ),
};

export default memo(PageImages);
