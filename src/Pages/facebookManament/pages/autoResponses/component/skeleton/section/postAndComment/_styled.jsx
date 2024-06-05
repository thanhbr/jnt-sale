import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledPostAndComment = styled.div`
  .info-step{
    .title-step{
      display: flex;
      align-items: center;
      margin-bottom: -4px;
      &__radio{
        margin-right: 12px;
      }
      &__arrow{
        &[data-arrow='true'] {
          svg {
            transform: rotate(0deg);
          }
        }
        svg {
          margin-left: 8px;
          transform: rotate(180deg);
          transition: transform 0.6s;
          :hover{
            cursor: pointer;
          }
        }
      }
    }
    .form-step{
      // display: none;
      max-height: 12px;
      transition: display 0.5s;
      border-left: 2px solid #C8CBD4;
      margin-left: 12px;
      padding: 24px 0 0 24px;
      overflow: hidden;
      display: flex;
      &[data-active='true']{
        // display: block;
        max-height: 1000px;
        overflow: inherit;
      }
      &__left{
        margin-bottom: 24px;
        margin-right: 44px;
        width: 49%;
      }
      &__right{
        margin-bottom: 24px;
        width: 49%;
      }
    }
    &[data-success='true'] {
     .form-step{
        border-left: 2px solid #1A94FF;
      }
    }
  }
`
