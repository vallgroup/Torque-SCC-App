import styled from 'styled-components';

const P = styled.p`
  margin-bottom: 40px;

  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 30px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: -0.1px;
  color: ${({ theme }) => theme.colors.white};
`;

export default P;
