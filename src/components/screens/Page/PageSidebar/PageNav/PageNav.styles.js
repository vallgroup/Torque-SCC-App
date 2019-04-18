import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageNavRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageNavTab = styled(Link)`
  flex: 0 0 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme, color }) => color || theme.colors.primary};

  img {
    width: 70%;
    height: 30%;
    object-fit: contain;
  }
`;
