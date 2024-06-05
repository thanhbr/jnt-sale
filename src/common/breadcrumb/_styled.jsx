import styled from 'styled-components'

export const StyledBreadCrumb = styled.div`
  .breadcrumb {
    &__title {
      display: flex;
      align-items: baseline;
    }

    &__links {
      display: flex;
      align-items: center;

      svg {
        width: 17px;
        height: 17px;
        margin: 0 2px;
      }
    }
  }
`
