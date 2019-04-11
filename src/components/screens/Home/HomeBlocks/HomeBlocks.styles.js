import styled from 'styled-components';

export const HomeBlocksRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "first third fourth"
    "first second fifth";
  height: 100%;
  width: 100%;

  div, a {
    &:nth-child(1) {
      grid-area: first;
    }

    &:nth-child(2) {
      grid-area: second;
    }

    &:nth-child(3) {
      grid-area: third;
    }

    &:nth-child(4) {
      grid-area: fourth;
    }

    &:nth-child(5) {
      grid-area: fifth;
    }

    &:nth-child(n + 6) {
      display: none;
    }
  }
}
`;
