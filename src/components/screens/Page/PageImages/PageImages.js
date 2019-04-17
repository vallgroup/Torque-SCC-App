import React, { memo, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Slideshow from 'components/Slideshow';
import { Root, PageImagesGrid, ImageCell } from './PageImages.styles';

const PageImages = ({ images }) => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const switchToSlideshow = () => setShowSlideshow(true);
  const switchToGrid = () => setShowSlideshow(false);

  const slideshowImages = useMemo(() => images.map(image => image.image), [images]);

  return (
    <Root>
      {showSlideshow ? (
        <Slideshow images={slideshowImages} interval={0} timeout={500} />
      ) : (
        <PageImagesGrid>
          {images.map(image => (
            <ImageCell
              key={image.image.url}
              src={image.image.url}
              rowStart={image.row_start}
              rowEnd={image.row_end}
              colStart={image.column_start}
              colEnd={image.column_end}
            />
          ))}
        </PageImagesGrid>
      )}

      {images.length > 1 && (
        <div className="slideshow_switch">
          <div className="slideshow" onClick={switchToSlideshow} />
          <div className="grid" onClick={switchToGrid}>
            <div className="grid_cell" />
            <div className="grid_cell" />
            <div className="grid_cell" />
            <div className="grid_cell" />
          </div>
        </div>
      )}
    </Root>
  );
};

PageImages.propTypes = {
  images: PropTypes.arrayOf(
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
  ),
};

export default memo(PageImages);
