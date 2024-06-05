import styled from "styled-components";

export const StyledUserManagement = styled.div`
`

export const StyledUseManagementHeader = styled.div`
 .user-management-header {
    .breadcrumb__title h1 {
      min-width: 13.1875rem !important;
    }
    .breadcrumb__links li:first-child {
      min-width: 6.6875rem !important;
    }
    &__action-btn-create {
      width: 12rem;
    }
 }
`

export const StyledUseManagementFilter = styled.div`
  .user-management-filter {
    background: white;
    padding: 0 0 1rem 0;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    &__group {
      display: flex;
      .button__container {
        svg {
          height: 15px !important;
          width: 16px !important;
        }
        span {
          font-size: 14px;
        }
      }
    }
    &__input-wide {
      width: 24.5rem;
      margin-right: .75rem;
    }
    &__order {
      margin-right: .75rem;
    }
    &__collapse-group {
      margin-top: 16px;
    }
    &__user-status {
      //max-width: 24.5rem;
      margin-right: .5rem;
    }
    &__user-role {
      //max-width: 24.5rem;
    }
    &-form__option-text {
      padding: 8px 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 129%;
      cursor: pointer;
      &:hover {
        color: rgb(30, 154, 152);
      }
      &[data-active='true'] {
        color: var(--bg-pr-large-default);
      }
    }
  }
  .user-management-filter-collapse__input-wide {
    .category-input__menu-toggle {
      width: 155px !important;
    }
    .category-input__input .input__input {
      padding-left: 160px !important;
    }
  }
  
  @media (min-width: 1280px) and (max-width: 1440px) {
    .user-management-filter__user-status {
      width: 325px;
    }
    .user-management-filter__user-role {
     margin-left: 60px;
      width: 316px;
    }
  }
`
export const StyledUserManagementTable = styled.div`
  .user-managment-table{
    .table-layout__table-t-body{
      border-bottom: 1px solid #e2eaf8;
    }
  }


`
export const StyledUserManagmentSkeleton = styled.div`
  .user-managment-skeleton{
    &_checkbox{
     width:18px;
    }
  &_fullName{
      width: 20.52rem;
  }
  &_phone{
      width: 14.27rem;
  }
  &_email{
      width: 22.39rem;
  }
  &_managment{
      width: 23.64rem;
      flex:1;
  }
  &_status{
      width: 16.52rem;
     
  }
  &_setting{
      width: 4.75rem;
      
  }
  }
  @media screen and (max-width : 1599px){
    .user-managment-skeleton{
      &_checkbox{
       width:25px;
      }
      &_fullName{
        width: 12.52rem;
    }
      &_phone{
        width: 9.27rem;
    }
      &_email{
        width: 15.39rem;
    }
     &_managment{
        width: 22.64rem;
        flex:1;
    }
     &_status{
        width: 10.52rem;
    }
     &_setting{
        width: 3.75rem;
    }
    }
  }
`

export const StyledCreateUseManagement = styled.div`
  .grid-layout {
    &__header {
      & .breadcrumb__title h1 {
        line-height: 140% !important;
        min-width: 13.1875rem !important;
        height: 2.125rem !important;
      }
      & .breadcrumb__links li:first-child {
        min-width: 6.6875rem;
      }
      & .breadcrumb__links li:nth-child(3) {
        min-width: 9.5625rem;
      }
    }
    &__column:first-child {
      & .grid-layout__section:first-child {
        // min-width: 59.0625rem !important;
        min-height: 33.5625rem;
      }
      & .grid-layout__section:nth-child(2) {
        // min-width: 59.0625rem !important;
        padding: 24px !important;
      }
      & .grid-layout__section:nth-child(3) {
        margin: 0 0 -48px 12px;
        .grid-layout__section-container {
          text-align: right;
          & button:first-child {
            width: 74px;
          }
          & button:nth-child(2) {
            width: 110px;
            font-weight: 600;
            font-size: 15px;
            line-height: 140%;
          }
        }
      }
      & .grid-layout__section-title {
        font-weight: 600;
        font-size: 18px;
        line-height: 25px;
      }
    }
    &__column:nth-child(2) {
      & .grid-layout__section:first-child {
        // min-width: 24.4375rem !important;
        min-height: 20.6875rem;
      }
    }
    &__section h3 {
      margin-bottom: 0 !important;
    }
  }
  .create-user-info {
    &__form-group {
      margin-top: 20px;
      position: relative;
      &--full-name {
        margin-top: 0;
      }
      &--birthday .react-datepicker__input-container input{
        margin-top: 8px;
        width: 100%;
        height: 34px;
        border: 1px solid #ebeef5;
        border-radius: 6px;
        padding: 0 21px 0 16px;
        
        &::placeholder {
          font-size: 14px;
        }
      }
      &--birthday i {
        position: absolute;
        right: 10px;
        top: 34px;
        cursor: pointer;
      }
      &--gender {
        display: flex;
        margin-top: 54px;
      }
      &--note div {
        margin-top: 8px !important;
        //min-height: 94px !important;
        & textarea {
          max-height: 68px !important;
          min-height: 68px !important;
          resize: none;
        }
      }
      &-role--header {
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        &-error {
          color: rgba(242,48,97,1);
          position: absolute;
          top: 16px;
          left: 0;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
        }
      }
      &-account--tooltip {
        svg {
          cursor: default;
        }
      }
    }
    &__form-input {
      display: flex;
      & div {
        width: 20px;
        height: 20px;
        &::before {
          width: 12px;
          height: 12px;
        }
      }
      & span {
        font-size: 15px !important;
        line-height: 23px !important;
      }
    }
    &__form-input:first-child {
      margin-right: 4.5rem;
    }
  }
  .create-user-info__form-group-double {
    max-width: 436.5px;
    &--right {
      margin-left: .75rem;
    }
    & .date-picker__date-input {
      margin-top: 8px;
    }
    & .date-picker__icon {
      top: 14px;
    }
  }
  .create-user-info__group-role--list {
    & div {
      margin-right: 13px;
    }
  }
  .create-user-info__group-role--text {
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
  }
  .create-user-info__form-radio {
    cursor: pointer;
  }
`