import styled from 'styled-components';

export const ContentTabbedRoot = styled.div`
  .tabs_wrapper {
    display: flex;
    flex-wrap: wrap;

    margin-bottom: 5%;
  }
`;

export const Tab = styled.div`
  flex: 1 1 auto;
  border: 2px solid ${({ theme }) => theme.colors.white};
  padding: 2% 5%;
  min-width: 33%;
  box-sizing: border-box;

  text-transform: uppercase;

  font-size: 0.6vw;
  font-weight: 500;
  text-align: center;

  &.active {
    color: ${({ theme, color }) => color || theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
