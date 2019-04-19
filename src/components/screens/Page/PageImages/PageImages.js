import React, { memo, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import Slideshow from 'components/Slideshow';
import ImagesGrid, { IMAGES_GRID_IMAGES_TYPE } from 'components/ImagesGrid';
import { Root, SlideshowGridSwitch } from './PageImages.styles';

const mapState = (state, props) => ({
  images: pageSelectors.getImages(state, props),
  colors: pageSelectors.getColors(state, props),
});

const PageImages = ({ images, colors }) => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const switchToSlideshow = () => setShowSlideshow(true);
  const switchToGrid = () => setShowSlideshow(false);

  const slideshowImages = useMemo(() => images.map(image => image.image), [images]);

  if (!images?.length) return null;
  return (
    <Root>
      {showSlideshow ? (
        <Slideshow
          images={slideshowImages}
          interval={0}
          timeout={500}
          primary={colors.primary}
          secondary={colors.secondary}
        />
      ) : (
        <ImagesGrid images={images} />
      )}

      {images.length > 1 && (
        <SlideshowGridSwitch>
          <div className="slideshow" onClick={switchToSlideshow} />
          <div className="grid" onClick={switchToGrid}>
            <div className="grid_cell" />
            <div className="grid_cell" />
            <div className="grid_cell" />
            <div className="grid_cell" />
          </div>
        </SlideshowGridSwitch>
      )}
    </Root>
  );
};

PageImages.propTypes = {
  images: IMAGES_GRID_IMAGES_TYPE,
  colors: PropTypes.object,
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(PageImages);
