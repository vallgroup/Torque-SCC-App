import React, { memo } from 'react';
import { PageImagesGrid, ImageCell } from './PageImages.styles';

const PageImages = ({ images }) => (
  <PageImagesGrid>
    {images.map(image => (
      <ImageCell
        src={image.image}
        rowStart={image.row_start}
        rowEnd={image.row_end}
        colStart={image.column_start}
        colEnd={image.column_end}
      />
    ))}
  </PageImagesGrid>
);

export default memo(PageImages);
