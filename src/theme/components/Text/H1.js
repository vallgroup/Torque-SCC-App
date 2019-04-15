import styled, { css, createGlobalStyle } from 'styled-components';

const H1Style = css`
  margin-top: 0;

  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 3.2vw;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
`;

export const H1Global = createGlobalStyle`
  h1 {
    ${H1Style}
  }
`;

const H1 = styled.h1`
  ${H1Style}
`;

export default H1;
