import styled from 'styled-components'
import {THEME_COLORS} from 'common/theme/_colors'

export const StyledRightContent = styled.div`
  padding: 12px 24px;
  height: 100%;
  position: relative;
  .btn__create-customer{
    background: #1A94FF;
    border-color: #1A94FF;
    &:hover,&:focus{
      background: #46a3f5;
      border-color: #1A94FF;
    }
  }
  .content-pos {
    &--header {
      margin-top: 24px;
      button {
        border-radius: 60px;
        padding: 0;
        font-weight: 400;
        background: white;
        cursor: pointer;
        &[data-type='ghost'] {
          color: #7C88A6;
        }
        &[data-type='primary'] {
          background: #1A94FF;
          color: #fff;
        }
        &:focus {
          border: 1px solid #1A94FF;
          height: 32px;
        }
      }
      &-customer {
        width: 83px;
        height: 32px;
        border: 1px solid #EBEEF5;
        margin-right: 8px;
      }
      &-select {
        width: 164px;
        height: 32px;
        border: 1px solid #EBEEF5;
      }
    }
    &--body {
      margin-top: 16px;
      width: 37rem;
      &-wrapper {
        width: 36.5rem;
      }
      &-payment {
        text-align: end;
        &-type {
          margin-bottom: 8px;
          cursor: pointer;
          
          & a:focus {
            color: #1A94FF !important;
            & ~ svg path {
              fill: #1A94FF !important;
            }
          }
        }
        &-price {
          margin-bottom: 4px;
        }
        &__discount {
          display: flex;
          justify-content: end;
          margin-bottom: 12px;
          &-input {
            width: 125px;
          }
        }
        &__discount-type-dropdown-toggle {
          width: 32px;
          height: 20px;
    
          text-align: center;
    
          i {
            display: inline-block;
    
            transform: rotate(180deg);
            transform-origin: center;
            transition: transform 0.25s;
    
            &[data-active='true'] {
              transform: rotate(0);
            }
          }
    
          svg {
            width: 8px;
            height: 8px;
    
            path {
              stroke: ${THEME_COLORS.primary_300};
            }
          }
        }
        &-list {
          margin: 18px 0 12px 0;
        }
        &-inter {
          display: flex;
          justify-content: space-between;
          
          &--col-2 {
            justify-content: left;
            & .content-pos--body-payment-option:last-child {
              margin-left: 12px;
            }
          }
        }
        &-option {
          width: 11.687rem;
          min-height: 36px; 
          background: #F3F6FC;
          border-radius: 4px;
          border: 1px solid transparent;
          
          padding: 6px 40px;
          text-align: center;
          cursor: pointer;
          position: relative;
          display: flex;
          justify-content: center;
          
          &:focus {
            border: 1px solid #1A94FF;
          }
          
          &--active {
            border: 1px solid #1A94FF;
            background: #fff;
            width: 11.687rem;
            min-height: 36px; 
            border-radius: 4px;
            padding: 6px 40px;
            text-align: center;
            cursor: pointer;
          }
          &--tick {
            position: absolute;
            top: -11px;
            right: -7px;
          }
        }
        &-all {
          margin-top: 8px;
          height: 36px; 
          background: #F3F6FC;
          border-radius: 4px;
          padding: inherit;
          
          text-align: center;
          position: relative;
          cursor: pointer;
          border: 1px solid transparent;
          width: 100%;
          
          svg {
            position: absolute;
            top: 7px;
          }
          
          &:focus {
            border: 1px solid #1A94FF;
          }
        }
        &-item {
          position: relative;
          margin-top: 16px;
          height: 40px;
          
          &--title {
            position: absolute;
            margin: 10px 12px;
            width: 25rem;
          }
          &--has-remove {
            position: absolute;
            left: -18px;
          }
          & input {
            height: 40px;
          }
        }
        &-input {
          &--has-remove {
            .input__input[data-icon='true'] {
              padding-right: 52px;
            }
            svg {
              width: 13px;
              height: 13px;
            }
          }
        }
      }
      &__tooltipV2 {
        display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      & .input__dropdown {
        max-height: 248px;
      }
    }
    &--footer {
      position: absolute;
      bottom: 24px;
      width: 100%;
      padding-right: 48px;
      button {
        width: 100%;
        font-size: 18px;
        height: 56px;
      }
      &-verification {
        display: flex;
        justify-content: end;
      }
    }
    &__customer{
      margin-top: 24px;
      padding-bottom: 16px;
      background: #FFFFFF;
      border-bottom: 1px solid #EBEEF5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-general{
        display: flex;
        align-items: center;
        
      }
      &-info{
        margin-left: 8px;
      }
      &-remove{
        cursor: pointer;
      }
    }
  }
  
  @media screen and ( max-width: 1520px) {
    .content-pos--header {
      margin-top: 18px;
    }
    .content-pos--body {
      height: 425px;
      overflow: scroll;
      width: 29.5rem;
      &-wrapper {
        width: 28.5rem;
      }
      &-payment {
        &-option {
          width: 9rem;
          padding: 6px 12px;
          &--active {
            width: 9rem;
            padding: 6px 12px;
          }
        }
      }
    }
  }
  @media screen and ( max-width: 1440px) {
    .content-pos--body {
      height: 425px;
      overflow: scroll;
      width: 27.5rem;
      &-wrapper {
        width: 26.5rem;
      }
      &-payment {
        &-option {
          width: 8.5rem;
          &--active {
            width: 8.5rem;
          }
        }
      }
     }
  }
  @media screen and ( max-width: 1366px) {
    .content-pos--body {
      height: 300px;
      overflow: scroll;
      width: 32.5rem;
      &-wrapper {
        width: 31.5rem;
      }
      &-payment {
        &-option {
          width: 10rem;
          &--active {
            width: 10rem;
          }
        }
        &-item--title {
          width: 15rem;
          .content-pos--body__tooltipV2 {
            -webkit-line-clamp: 1 !important;
          }
        }
      }
     }
  }
`


export const StyledDropdown = styled.div`
  padding: 12px 14px;
  width: 132px;
  display: block;
  button {
    border: none;
    background: transparent;
    &:hover, &:focus {
      color: #1A94FF !important;
      cursor: pointer;
    }
    &[data-active="true"] {
      color: #1A94FF !important;
    }
    &:last-child {
      margin-top: 16px;
    }
  }
`
