import styled from 'styled-components';
import { logoCornerHeight } from 'components/LogoCorner';

export const sidebarPaddingSides = '7.5%';

export const HomeSidebarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  background: ${({ theme }) => theme.gradients.vertical(theme.colors.primary, theme.colors.secondary)};

  .text_logo_wrapper {
    flex: 0 0 15.5%;
    padding: 10% ${sidebarPaddingSides} 0;
    width: 100%;
    box-sizing: border-box;

    img {
      display: block;
      border-bottom: 3px solid ${({ theme }) => theme.colors.white};
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      background-color: transparent;
      object-fit: contain;
    }
  }

  .certifications_wrapper {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    padding-bottom: ${logoCornerHeight};
    box-sizing: border-box;
  }
`;

export const Certification = styled.img.attrs(props => ({
  height: `${80 / props.numCertifications}%`,
}))`
  padding: 5% 0;
  width: 60%;
  height: ${props => props.height};
  box-sizing: border-box;

  object-fit: contain;
`;
