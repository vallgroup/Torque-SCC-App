import styled from 'styled-components';

export const SlideshowRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
`;
