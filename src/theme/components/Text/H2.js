import styled from 'styled-components';

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 30px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.11;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.white};
`;

export default H2;
