import styled from 'styled-components';

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 55px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.white};
`;

export default H1;
