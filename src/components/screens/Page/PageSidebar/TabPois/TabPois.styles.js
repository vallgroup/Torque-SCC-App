import styled from 'styled-components';

export const ContentRoot = styled.div`
  max-height: 60%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: transparent;
    background: rgba(255, 255, 255, 0.2);
    border-right: 0px solid white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    outline: 2px solid white;
    border-radius: 0;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
    border-right: 0px !important;
  }

  &::-webkit-scrollbar-track:horizontal {
    background: transparent;
    border-left: 0px;
  }
`;

export const PoiWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding-right: 5%;
  width: 100%;
  box-sizing: border-box;

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
