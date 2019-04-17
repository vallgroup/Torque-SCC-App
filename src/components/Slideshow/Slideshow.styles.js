import styled from 'styled-components';
import { HollowTriangle } from 'theme';

export const SlideshowRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  .caption {
    position: absolute;
    top: 5%;
    left: 0;
    padding: 2% 5%;
    max-width: 70%;
    box-sizing: border-box;

    font-weight: 900;
    font-size: 2vw;
    text-align: center;
    text-transform: uppercase;

    background: ${({ theme, primary, secondary }) => theme.gradients.horizontal(
    primary || theme.colors.primary,
    secondary || theme.colors.secondary,
  )};
  }
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
