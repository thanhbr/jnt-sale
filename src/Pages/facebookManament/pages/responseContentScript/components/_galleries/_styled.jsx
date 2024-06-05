import styled from 'styled-components'

export const StyledFacebookResponseContentScript_Galleries = styled.div`
  width: calc(100% + 8px);
  margin: 0 -4px;

  display: flex;
  flex-wrap: wrap;

  .facebook-response-content-script-galleries {
    &__item {
      position: relative;

      width: 44px;
      height: 44px;
      margin: 0 4px;

      overflow: hidden;

      border-radius: 4px;
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      width: 100%;
      height: 100%;

      object-fit: cover;
      object-position: center;
    }

    &__cover {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;

      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      background: rgba(30, 154, 152, 0.7);

      color: #fff;
      font-size: 13px;
      font-weight: 600;
      line-height: 20px;
    }
  }
`
