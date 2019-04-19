import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.lightBlue};

  h3 {
    color: ${({ theme }) => theme.colors.lightBlue};
    padding-bottom: 6px;
    text-decoration: none;
  }
`;

export const InfoWindowRoot = styled.div`
  h3 {
    font-size: 1vw;
  }

  .info_container {
    display: flex;
    justify-content: space-between;

    min-width: 7vw;

    font-size: 0.8vw;
  }
`;
