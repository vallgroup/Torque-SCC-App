import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const logoCornerHeight = '12.5vw';

export const LogoCornerTriangle = styled(Link)`
  position: absolute;
  bottom: 0;
  right: 0;
  height: ${logoCornerHeight};
  width: ${logoCornerHeight};

  clip-path: polygon(100% 0, 100% 0, 100% 100%, 0% 100%);
  background: ${({ theme, primaryColor, secondaryColor }) => theme.gradients.vertical(primaryColor, secondaryColor)};

  img {
    position: absolute;
    bottom: 0;
    right: 0;

    padding: 1% 5% 5% 1%;
    width: 50%;
    height: 50%;
    box-sizing: border-box;

    object-fit: contain;
  }
`;
