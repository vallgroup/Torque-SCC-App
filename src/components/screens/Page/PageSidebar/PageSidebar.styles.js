import styled from 'styled-components';

export const PageSidebarRoot = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  .page_tabs_wrapper {
    flex: 0 0 12%;

    background-color: red;
  }

  .content_wrapper {
    flex: 1 1 auto;
  }
`;

export const ContentRoot = styled.div`
  height: 100%;
  width: 100%;

  background: ${({ theme, primary, secondary }) => theme.gradients.vertical(primary || theme.colors.primary, secondary || theme.colors.secondary)};

  h1 {
    margin-top: 0;
  }
`;
