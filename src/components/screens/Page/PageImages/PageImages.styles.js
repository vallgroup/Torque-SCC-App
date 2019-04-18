import styled from 'styled-components';

export const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const SlideshowGridSwitch = styled.div`
  display: flex;
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 25%;
  height: 7%;

  .slideshow,
  .grid {
    margin-right: 5%;
    width: 50%;
    height: 100%;

    opacity: 0.5;
  }

  .slideshow {
    background-color: ${({ theme }) => theme.colors.white};
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 5%;

    .grid_cell {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;
