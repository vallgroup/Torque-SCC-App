import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.black};

  h3 {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const InfoWindowRoot = styled.div`
  font-size: 0.5vw;

  h3 {
    font-size: 1vw;
  }

  .info_container {
    display: flex;
    justify-content: space-between;
  }
`;
