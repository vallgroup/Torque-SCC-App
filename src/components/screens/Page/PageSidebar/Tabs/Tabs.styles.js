import styled from 'styled-components';

export const TabsRoot = styled.div`
  margin-bottom: 5%;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

export const Tab = styled.div`
  float: left;

  margin-top: -0.1vw; /* overlap borders */
  border: 0.1vw solid ${({ theme }) => theme.colors.white};
  padding: 2% 5%;
  min-width: 25%;
  box-sizing: border-box;

  text-transform: uppercase;

  font-size: 0.8vw;
  font-weight: 500;
  text-align: center;

  &.active {
    color: ${({ theme, color }) => color || theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
