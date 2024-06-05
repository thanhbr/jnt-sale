import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledPostPageModal = styled.div`
  position: relative;
  .post-footer{
    margin-top: 24px;
    text-align: right;
  }
  .post-modal {
    &__search{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &___input-search{
      width: calc(100% - 36px);
      margin-right: 12px;
    }
    &__reload{
      width: 24px;
      :hover{
        cursor: pointer;
      }
    }
    &__close {
      position: absolute;
      top: -44px;
      right: 0;

      cursor: pointer;
    }

    &__list {
      width: 100%;
      //height: 417px;
      height: auto;
      overflow: auto;
      max-height: 351px;
    }

    &__item {
      width: calc(100% - 8px);
      min-height: 48px;
      margin: 0 8px 16px 0;
      padding: 4px 8px;

      display: flex;

      border-radius: 4px;

      transition: background 0.25s;

      cursor: pointer;
      align-items: center;
      
      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background: #f3f6fc;
      }
    }

    &__name-warning{
      display: flex;
    }
    &__avatar {
      width: 39px;
      height: 26px;
      margin: 0 12px 0 0;

      display: flex;
      align-items: center;
      justify-content: center;
      
      background: #00081D;
      border-radius: 4px;
      img{
        border-radius: 2px;
      }
    }
    &__tooltip-script-name {
      max-width: 150px;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #1A94FF;
      }
    &__tooltip-name {
      max-width: 275px;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 4px;
      .post-modal__name{
        position: relative;
      }
      a{
        margin-left: 6px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: -24px;
      }
    }
    &__noname{
      display: flex;
      a{
          margin-left: 6px;
          display: flex;
          align-items: center;
        }
    }
    
    &__empty {
      height: 90%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__fetching {
      min-height: 417px;
      margin-top: 16px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__selected {
      margin-top: 24px;
      
    }

    &__loading {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .post-table{
      //margin: 16px -16px 0 -8px;
      
      border: 1px solid #E2EAF8;
      border-radius: 8px;
      margin-top: 12px;
      &__cell{
       &:nth-child(1) {
        width: 8%;
       }
       &:nth-child(2) {
        width: 68%;
       }
       &:nth-child(3) {
        width: 24%;
       }
      }
      &__thead{
        border: none;
        .tr__container{
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
        
        }
      }
      .tr__container{
        border: none;
      
      }
      .post-table__cell{
        min-height: 60px;
        .post-modal__item{
          padding-top: 0;
          padding-bottom: 0;
        }
      }
  }
`
