import styled from 'styled-components';
import ImageOnLoaded from 'components/ImageOnLoaded';

export const ImagesGridRoot = styled.div`
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
