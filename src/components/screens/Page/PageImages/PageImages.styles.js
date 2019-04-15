import styled from 'styled-components';

export const PageImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: stretch;
  align-items: stretch;
`;

export const ImageCell = styled.img.attrs(props => ({
  rowStart: parseInt(props.rowStart, 10) + 1,
  rowEnd: parseInt(props.rowEnd, 10) + 1,
  colStart: parseInt(props.colStart, 10) + 1,
  colEnd: parseInt(props.colEnd, 10) + 1,
}))`
  grid-area: ${props => `${props.rowStart} / ${props.colStart} / ${props.rowEnd} / ${props.colEnd}`};

  object-fit: cover;
`;
