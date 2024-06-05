import styled from 'styled-components'

export const StyledPrintTemplate = styled.div`
  .breadcrumb__links {
    li > a {
      padding: 2px 0;
    }
  }
`

export const StyledPrintTemplateFilter = styled.div`
  .print-template-filter {
    &__collapse {
      &-group {
        background: white;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: var(--border-radius-component);
        max-height: 4.125rem;
        
        .category-auto-complete__menu {
          padding: .25rem 1.25rem;
          width: 98%;
        }
        .category-auto-complete__menu > li {
          padding: .5rem 0 1rem 0;
          cursor: pointer;
          font-weight: 400;
          font-size: 14px;
          &:hover {
            color: var(--color-package-up2022-7)
          }
        }
        .category-auto-complete__menu > li.print-template-filter-form__option-text-active {
          color: var(--bg-pr-large-default);
        }
        .category-auto-complete__input {
          padding-right: .563rem;
          & .input__icon {
            display: none;
          }
        }
        .category-input__menu-toggle {
          width: fit-content !important;
        }
        .category-input__input > input {
          padding-left: 10rem;
        }
        .category-input__input .input__icon {
          display: none;
        }
      }
    }
    &__group-button {
      text-align: right;
      button:first-child {
        width: 7rem;
        margin-right: .75rem;
        font-weight: 400;
        padding: 0;
        max-height: 2.125rem !important;
      }
      button:last-child {
        width: 6.875rem;
        max-height: 2.125rem !important;
      }
    }
  }
  @media screen and (max-width: 1520px) {
    .category-input__input > input {
      padding-left: 8.5rem !important;
    }
  }
`

export const StyledPrintTemplateContent = styled.div`
  .print-template-content {
    &__wrapper {
      background: white;
      margin: 0 21.59rem;
      padding: 1.5rem;
      border-radius: var(--border-radius-component);
    }
    &__title {
      font-weight: 600;
      font-size: 18px;
      margin: 0 0 1.5rem 0;
      // width: 3.3125rem;
      height: 1.5625rem;
    }
    box-shadow: 1px 2px 8px rgba(34, 62, 98, 0.15);
    border-radius: var(--border-radius-component);
  }
  @media screen and (max-width: 1520px) {
    .print-template-content {
      &__wrapper {
        margin: 0 3rem;
      }
      &__title {
        width: 5rem;
    }
  }
`

export const StyledPrintTemplatePreview = styled.div`
  .print-template-preview {
    &__wrapper {
      background: white;
      padding: 1.5rem 1rem;
      margin: 0 0 0 .75rem;
      min-height: 46.125rem;
      max-height: fit-content;
      border-radius: var(--border-radius-component);
    }
    &__title {
      font-weight: 600;
      font-size: 18px;
      margin: 0 0 1.5rem 0;
      // width: 7.125rem;
      height: 1.5625rem;
    }
    &__group-button {
      text-align: right;
      button {
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
        height: 2.125rem;
      }
    }
    // margin-top: -.8rem;
    box-shadow: 1px 2px 8px rgba(34, 62, 98, 0.15);
    border-radius: var(--border-radius-component);
  }
  @media screen and (max-width: 1520px) {
    .print-template-preview {
      &__title {
        width: 9rem;
      }
      &__group-button {
        button {
          width: 7rem; 
        }
      }
    }
  }
`

export const StyledPrintTemplateEdit = styled.div`
  .print-template-edit {
    &__wrapper {
      background: white;
      padding: 1.5rem 1rem;
      margin: 0 .75rem 0 0;
      border-radius: var(--border-radius-component);
      min-height: 46.125rem;
      max-height: fit-content;
    }
    &__title {
      font-weight: 600;
      font-size: 18px;
      margin: 0 0 1.5rem 0;
      // width: 3.3125rem;
      height: 1.5625rem;
    }
    &__group-button {
      text-align: right;
    }
    &__btn-default-template {
      background: transparent;
      border: none;
      margin-right: 1.5rem;
      
      color: var(--bg-pr-large-default);
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      // width: 6.5rem;
      height: 1.25rem;
      
      &:hover {
        color: #2BB8A9;
      }
    }
    &__btn-keyword {
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      height: 2.125rem;
    }
    box-shadow: 1px 2px 8px rgba(34, 62, 98, 0.15);
    border-radius: var(--border-radius-component);
  }
  .cke.cke_reset.cke_chrome, .cke_inner.cke_reset {
    height: 39.5rem !important;
    border-radius: var(--border-radius-component);
    overflow: hidden;
  }
  .cke_contents.cke_reset {
    height: 33rem !important;
  }
  .cke.cke_reset.cke_chrome {
    margin-top: 0.4rem;
  }
  .cke_contents.cke_reset {
    height: 33.0625rem !important;
  }
  @media screen and (max-width: 1520px) {
    .print-template-edit {
      &__title {
        width: 5rem;
      }
      &__btn-default-template {
        width: 8.5rem;
      }
      &__btn-keyword {
        width: 10rem;
      }
    }
  }
`