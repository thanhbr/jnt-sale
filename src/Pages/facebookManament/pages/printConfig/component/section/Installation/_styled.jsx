import { THEME_COLORS } from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledInstallation = styled.div`
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
      border-left: 1px solid #C8CBD4;
      margin-left: 12px;
      padding: 24px 0 0 24px;
      overflow: hidden;
      &[data-active='true']{
        // display: block;
        max-height: 1000px;
        overflow: inherit;
      }
      .print-content{
        margin-bottom: 16px;
        display: flex;
        .print-content__item{
          :nth-child(1){
            width: calc(50% - 22px);
            margin-right: 40px;
          }
          :nth-child(2){
            width: calc(50% - 22px);
          }
        }
        :nth-child(2){
          margin-bottom: 24px;
        }
      }
    }
  }
`
