import styled from 'styled-components';
import ImageOnLoaded from 'components/ImageOnLoaded';

export const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .slideshow_switch {
    display: flex;
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 25%;
    height: 7%;

    .slideshow,
    .grid {
      margin-right: 5%;
      width: 50%;
      height: 100%;

      opacity: 0.5;
    }

    .slideshow {
      background-color: ${({ theme }) => theme.colors.white};
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 5%;

      .grid_cell {
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

export const PageImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ImageCell = styled(ImageOnLoaded).attrs(props => ({
  rowStart: parseInt(props.rowStart, 10) + 1,
  rowEnd: parseInt(props.rowEnd, 10) + 1,
  colStart: parseInt(props.colStart, 10) + 1,
  colEnd: parseInt(props.colEnd, 10) + 1,
}))`
  grid-area: ${props => `${props.rowStart} / ${props.colStart} / ${props.rowEnd} / ${props.colEnd}`};

  width: 100%;
  height: 100%;

  object-fit: cover;

  &[class*='fade-enter'] {
    width: 80%;
    height: 80%;
  }

  &[class*='fade-enter-active'] {
    width: 100%;
    height: 100%;
    transition-property: opacity, width, height;
  }

  &[class*='fade-enter-done'] {
    width: 100%;
    height: 100%;
  }
`;
