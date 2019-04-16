import styled, { css, createGlobalStyle } from 'styled-components';

export const H2Style = css`
  margin-top: 0;
  margin-bottom: 3%;

  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.7vw;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.11;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
`;

export const H2Global = createGlobalStyle`
  h2 {
    ${H2Style}
  }
`;

const H2 = styled.h2`
  ${H2Style}
`;

export default H2;
