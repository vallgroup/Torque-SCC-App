import styled from 'styled-components';

export const ContentRoot = styled.div`
  max-height: 60%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1em;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: transparent;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(225, 225, 225, 0.4);
    outline: 2px solid white;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
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
