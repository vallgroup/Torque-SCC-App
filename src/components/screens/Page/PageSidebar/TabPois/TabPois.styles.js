import styled from 'styled-components';

export const ContentRoot = styled.div`
  max-height: 60%;
  overflow-y: auto;
`;

export const PoiWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  .poi_name {
    flex: 1 1 75%;
    padding-right: 5%;
    box-sizing: border-box;
  }

  .poi_distance {
    flex: 0 0 25%;

    text-align: right;
  }
`;
