import styled from 'styled-components'

export const StyledFacebookFanpageEmpty = styled.div`
  min-height: calc(100vh - 240px - 50px);
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .facebook-fanpage-empty {
    &__banner {
      width: 153px;
      height: 104px;
      margin-bottom: 12px;

      object-fit: contain;
      object-position: center;
    }

    &__container {
      width: 651px;
    }

    &__list-item {
      position: relative;

      padding-left: 16px;

      &::before {
        position: absolute;
        top: 8px;
        left: 0;

        width: 4px;
        height: 4px;

        background: #7c88a6;
        border-radius: 50%;

        content: '';
      }
    }
  }
`
