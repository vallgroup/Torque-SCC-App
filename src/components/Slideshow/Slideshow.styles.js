import styled from 'styled-components';
import { HollowTriangle } from 'theme';

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

export const ButtonLeft = styled(HollowTriangle).attrs(({ theme }) => ({
  sideLength: '3vw',
  thickness: '0.25vw',
  color: theme.colors.white,
  orientation: 'left',
}))`
  position: absolute;
  left: 5%;
  top: 45%;
`;

export const ButtonRight = styled(HollowTriangle).attrs(({ theme }) => ({
  sideLength: '3vw',
  thickness: '0.25vw',
  color: theme.colors.white,
  orientation: 'right',
}))`
  position: absolute;
  right: 5%;
  top: 45%;
`;
