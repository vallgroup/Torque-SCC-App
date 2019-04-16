import styled from 'styled-components';

// props:
//
// sideLength         (str)
// thickness          (str)
// color              (str)
// orientation        (left|right) def: right
export default styled.div`
  border: none;
  border-right: ${({ thickness }) => `${thickness || '10px'} solid`};
  border-bottom: ${({ thickness }) => `${thickness || '10px'} solid`};
  border-color: ${({ color, theme }) => color || theme.colors.black};
  height: ${({ sideLength }) => sideLength || '2vw'};
  width: ${({ sideLength }) => sideLength || '2vw'};
  transform: ${({ orientation }) => (orientation === 'left' ? 'rotate(-225deg)' : 'rotate(-45deg)')};
`;
