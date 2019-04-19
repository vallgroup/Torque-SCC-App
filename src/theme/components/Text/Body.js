import styled, { createGlobalStyle, css } from 'styled-components';

const BodyStyle = css`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.4vw;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: -0.1px;
  color: ${({ theme }) => theme.colors.white};

  user-select: false;
  -webkit-tap-highlight-color: transparent;
`;

export const BodyGlobal = createGlobalStyle`
  body {
    ${BodyStyle}

    background: ${({ theme }) => theme.gradients.vertical(theme.colors.primary, theme.colors.secondary)};

    ul {
      margin-top: 1%;
      margin-bottom: 1%;
      padding-left: 7%;

      li {
        padding-left: 2%;
      }
    }
  }
`;

const PStyle = css`
  ${BodyStyle}

  margin-top: 1%;
  margin-bottom: 2%;
`;

export const PGlobal = createGlobalStyle`
  p {
    ${PStyle}
  }
`;

const P = styled.p`
  ${PStyle}
`;

export default P;
