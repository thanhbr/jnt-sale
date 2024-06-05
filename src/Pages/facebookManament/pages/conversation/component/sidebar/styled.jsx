import styled from 'styled-components'

export const StyledSidebar = styled.div`
  height: calc(100vh - 56px);
  position: relative;
  .filter-content{
    
    .close-filter{
      position: absolute;
      top: 0;
      right: 8px;
      z-index: 9999;
      cursor: pointer;
    }
    &__item{
      height: 52px;
      &-icon{
        width: 100%;
        height: 52px;
        display: -webkit-box;
        justify-content: center;
        align-items: center;
      }
      .close-filter{
        position: absolute;
        top: 0;
        right: 8px;
      }
      :hover{
        cursor: pointer;
        svg {
          color: #1e9a98;
          path[stroke] {
            stroke: #1e9a98;
          }
        }
      }
      &[data-show='true'] {
        background: #001429;
        svg {
          color: #1e9a98;
          path[stroke] {
            stroke: #1e9a98;
          }
        }
      }
      &[data-hover='true'] {
        cursor: pointer;
        svg {
          color: #1e9a98;
          path[stroke] {
            stroke: #1e9a98;
          }
        }
      }
      
      &[data-filter='true']{
        background: #001429;
        svg {
          color: #1e9a98;
          path[stroke] {
            stroke: #1e9a98;
          }
        }
      }
    }
  }
`