import styled from 'styled-components';

export const HomeBlocksRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "first third fourth"
    "first second fifth";
  height: 100%;
  width: 100%;

  div {
    &:nth-child(1) {
      grid-area: first;
    }

    &:nth-child(2) {
      grid-area: second;
    }

    &:nth-child(3) {
      grid-area: third;
    }

    &:nth-child(4) {
      grid-area: fourth;
    }

    &:nth-child(5) {
      grid-area: fifth;
    }

    &:nth-child(n + 6) {
      display: none;
    }
  }
}
`;

export const PageBlock = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme, primary, secondary }) => theme.gradients.vertical(primary || theme.colors.primary, secondary || theme.colors.secondary)};

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
    font-size: 5em;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
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
