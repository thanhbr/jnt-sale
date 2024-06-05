import styled from 'styled-components'

export const StyledFacebookFanpageCardList = styled.div`
  .facebook-fanpage-card-list {
    &__container {
      width: calc(100% + 24px);
      margin: 0 -12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      width: calc(100% / 6 - 24px);
      margin: 0 12px 24px 12px;

      @media screen and (max-width: 1599px) {
        width: calc(20% - 24px);
      }

      @media screen and (max-width: 1399px) {
        width: calc(25% - 24px);
      }
    }
  }
`
