import styled, { createGlobalStyle, css } from 'styled-components';
import { H2Style } from './H2';

const H3Style = css`
  ${H2Style}

  font-size: 1.2vw;

  margin-top: 5%;
  margin-bottom: 2%;

  text-decoration: underline;
`;

export const H3Global = createGlobalStyle`
  h3 {
    ${H3Style}
  }
`;

const H3 = styled.h3`
  ${H3Style}
`;

export default H3;
