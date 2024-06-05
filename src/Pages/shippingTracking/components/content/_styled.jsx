import styled from 'styled-components'

export const StyledShippingTrackingContent = styled.div`

  display: flex;
  flex-wrap: wrap;

  .content {
    &__left{
      width: calc(25% - 8px);
      margin: 0 8px 0 0;
      background: #FFF;
      border-radius: 4px;
      height : 674px;

      &__item{
        cursor: pointer;
        padding: 16px 12px 16px 16px;
        border-bottom: 1px solid #E2EAF8;

        &:first-child{
          border-top-left-radius:8px;
          border-top-right-radius:8px;
        }

        &[data-active=true]{
          &:hover{
            background: #E2EAF8;
          }
          background: #E2EAF8;
        }

        &:hover {
          background: #F3F6FC;
          .content__left__item__btn-delete{
            display: block;
          }
        }

        &__field-text__radio{
          position: relative;
          padding: 2px;
          display: flex;
          align-items: center;

          input {
            position: relative;
            margin-left: .5rem;

            &:before {
              content: '';
              width: 1.25rem;
              height: 1.25rem;
              position: absolute;
              border-radius: 50%;
              top: -.25rem;
              left: -.1875rem;
              border: 1px solid var(--bg-input);
              background: #F5F5FA;
              cursor: pointer;
            }
          }
          input[type="radio"]:checked{
            &:before{
              border: 1px solid var(--bg-checked-radio);
            }
          }
          input[type="radio"]:checked:{
            &:after {
              content: '';
              width: .75rem;
              height: .75rem;
              position: absolute;
              border-radius: 50%;
              top: 0;
              left: 1px;
              background: var(--bg-checked-radio);
            }
          }
          label {
            margin: 0 12px 0 17px;
            line-height: 19px;
            max-width: calc(100% - 20px);
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &__btn-delete{
          position: absolute;
          right: 0;
          background: none;
          border: none;
          height: 20px;
          cursor: pointer;
          display: none;

          &[data-active="true"] {
            display: block !important;
          }
        }
      }
    }
    &__left.empty-billcode{
      background: #FFFFFF;
      background-image:url(/svg/bg-shipping-tracking.svg);
      background-repeat: no-repeat;
      background-position: bottom right 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__right {
      width: calc(75% - 8px);
      margin: 0 0 0 8px;
      background: #fff;
      padding: 30px 24px 24px 24px;
      border-radius: 4px;
      height : 674px;
    }
  }

  .empty-billcode {
    color: #7C88A6;
    text-align: center;
    font-size: 14px;
    line-height: 20px;

    &__banner {
      width: 120px;

      img {
        width: 100%;
      }
    }

    &__text {
      max-width: 250px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    &__note {
      max-width: 250px;
      font-weight: 400;
    }
  }
`