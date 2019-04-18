import styled from 'styled-components';

export const PageSidebarRoot = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  .page_nav_wrapper {
    flex: 0 0 12%;
  }

  .content_wrapper {
    flex: 1 1 auto;
  }
`;

export const ContentRoot = styled.div`
  padding: 15vh 10% 5vh 15%;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  background: ${({ theme, primary, secondary }) => theme.gradients.horizontal(
    primary || theme.colors.primary,
    secondary || theme.colors.secondary,
  )};

  h1 {
    margin-top: 0;
  }
`;
