import styled from 'styled-components';

export const BlockRoot = styled.div`
  a {
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    background: ${({ theme, primary, secondary }) => theme.gradients.vertical(
    primary || theme.colors.primary,
    secondary || theme.colors.secondary,
  )};

    text-decoration: none;

    img.title_icon {
      position: relative;
      z-index: 2;

      margin-bottom: 10%;
      width: 30%;
      height: auto;
      max-width: 350px;
      max-height: 350px;
    }

    .block_heading {
      position: relative;
      z-index: 2;

      font-family: ${({ theme }) => theme.fonts.primary};
      font-size: 2vw;
      font-weight: 900;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-transform: uppercase;
      text-align: center;
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const BackgroundIcon = styled.div`
  position: absolute;
  z-index: 1;
  height: 125%;
  width: 125%;

  background: ${({ theme, primary, secondary }) => theme.gradients.horizontal(
    primary || theme.colors.primary,
    secondary || theme.colors.secondary,
  )};
  mask: ${({ src }) => `url(${src}) 0 0/100% 100%`};

  transform: rotate(20deg) translate(-10%, 10%);

  &:first-child {
    width: 250%;
    transform: rotate(20deg) translate(-5%, 5%);
  }
`;
