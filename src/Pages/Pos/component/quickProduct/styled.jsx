import styled from 'styled-components'

export const StyledQuickProduct = styled.div`

  .content-quick-product{
    width: 100%;
    height: 88px;
    position: absolute;
    bottom: 0;
    background: #ffffff;
    transition: height 0.4s;
    z-index: 10;
    &__empty{
      width: 100%;
      text-align: center;
      padding-top: 62px;
      p{
        width: 100%!important;
      }
    }
    &[data-active=true]{
      height: 324px;
      transition: height 0.7s;
      .content-quick-product__title{
        svg{
          transform: rotate(0deg);
          transition: transform 0.25s;
        }
      }
    }
    &__tooltipv2 {
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__title{
    /* Primary/300 */
      cursor: pointer;
      background: #1A94FF;
      border-radius: 0px 8px 0px 0px;
      padding: 2px 12px;
      width: 180px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      svg{
        transform: rotate(180deg);
        transition: transform 0.25s;
      }
    }
    &__table{
      border-top: 2px solid #1A94FF;
      border-radius: 0px 8px 8px 8px;
      &-header{
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        height: 32px;
        padding: 0 16px;
        &-left{
          display: flex;
        }
        &-right{
          display: flex;
          .header-right__type-view{
            margin-right: 12px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            /* Primary/300 */
            border: 1px solid #EBEEF5;
            border-radius: 4px;
            text-align: center;
            padding: 3px 0;
            svg{
              path,line,rect{
                stroke: rgb(0, 8, 29);
              }
            }
            :hover{
              border: 1px solid #1A94FF;
              svg{
                path,line,rect{
                  stroke: #1A94FF;
                }
              }
            }
          }
        }
      }
      &-body{
        display: flex;
        flex-wrap: wrap;
        margin-top: 24px;
        padding-left: 16px;
        height: 252px;
        overflow: auto;
        padding-bottom: 16px;
        .product-content{
          width: calc(12.5% - 16px);
          border-radius: 8px;
          height: 126.5px;
          overflow: hidden;
          cursor: pointer;
          margin-right: 16px;
          margin-bottom: 24px;
          position: relative;
          //border: 1px solid #EBEEF5;
          @media screen and (max-width: 1919px){
            width: calc(16.66% - 16px); 
          }
          :hover{
            border: 1px solid #1A94FF;
          }
          img{
            width: 100%;
            height: 100%;
          }
          &__background-bottom{
            height: 44.5px;
            width: 100%;
            position: absolute;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
          }
          &__info{
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 0 8px;
            padding-bottom: 8px;
            p{
              width: 100%!important;
              text-align: left;
              margin: 2px 0;
            }
          }
          &__inventory{
            position: absolute;
            top: 8px;
            right: 8px;
          }
        }
        .product-content-list{
          width: calc(25% - 16px);
          border-radius: 8px;
          height: 68px;
          overflow: hidden;
          cursor: pointer;
          margin-right: 16px;
          margin-bottom: 24px;
          position: relative;
          display: flex;
          align-items: center;
          //border: 1px solid #EBEEF5;
          :hover{
            border: 1px solid #1A94FF;
          }
          &__thumbnail{
            width: 68px;
            height: 68px;
            border-radius: 8px;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              border-radius: 8px;
            }
            &-inventory{
              position: absolute;
              top: 8px;
              right: 8px;
            }
          }
          &__info{
            width: calc(100% - 68px);
            padding: 3.5px 12px;
            p{
              width: 100%!important;
              text-align: left;
              margin-bottom: 12px;
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .select__menu{
    padding: 8px 16px!important;
  }
  .quick-product-sort__input-wide{
    width: 236px;
  }
  .quick-product-sort__option-text{
    font-size: 14px;
    margin-bottom: 8px;
    cursor: pointer;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .alternative-auto-complete__menu{
    width: 392px;
    height: 242px;
    .product-info-basic__list-parent, .product-info-basic__list-child{
      height: 178px;
    }
  }
`