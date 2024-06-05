import styled from 'styled-components'

export const StyledQuickAccesses = styled.div`
  min-width: 227px;
  padding: 8px 0 24px 0;

  .quick-accesses {
    &__heading {
      margin: 0 0 8px 0;
      padding: 0 16px;

      color: #212533;
      font-family: 'GoogleSans';
      font-size: 15px;
      font-weight: 500;
      line-height: 40px;
    }

    &__item {
      height: 40px;
      margin: 0 0 16px 0;
      padding: 0 16px;

      display: flex;
      align-items: center;

      color: #212533;
      font-family: 'GoogleSans';
      font-size: 15px;
      font-weight: 400;

      transition: color 0.25s;

      cursor: pointer;

      a {
        display: flex;
        align-items: center;
        color: #212533;
        &:hover {
          color: #E5101D;
        }
      }

      &:last-child {
        margin: 0;
      }

      &:hover {
        color: #E5101D;
      }

      svg {
        width: 40px;
        height: 40px;
        margin: 0 12px 0 0;
      }
    }
  }
`
