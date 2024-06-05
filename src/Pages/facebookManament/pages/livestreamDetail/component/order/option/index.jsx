import styled from 'styled-components'

export const StyledColslapsContainer = styled.div`
  width: 100%;
  .shipping-partner-colslaps-container{
    padding: 0 24px;
    width: 100%;
    &__item{
      width: 100%;
      display: flex;
      .shipping-partner-colslaps-container__right-item{
        width: 50%;
      }
      margin-bottom: 24px;
    }
    &__right-item{
      padding-right: 16px;
    }
    &__right-item-title{
      font-weight: 400;
      font-size: 13px;
      line-height: 140%;
      color: #00081D;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
    }
    &__radio-item{
      display: flex;
      margin-bottom: 12px;
    }
  }
  .order-filter-form__option-text{
    margin-bottom: 16px;
    cursor: pointer;
  }
`