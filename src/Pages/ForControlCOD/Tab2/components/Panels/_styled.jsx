import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledForControlCODPanels = styled.div`
  .for-control-cod-panels {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    color: #7c88a6;
    margin: 0 8px;
  }

  .order-panels {
    &__item {
      width: calc(50% - 16px);
      background: linear-gradient(
          180deg,
          #f3f6fc 0%,
          rgba(243, 246, 252, 0) 100%
        ),
        #ffffff;
      border-top: 3px solid rgba(226, 234, 248, 0.6);
      border-radius: 6px 6px 0px 0px;

      cursor: pointer;

      .order-panel__heading {
        svg {
          color: rgba(124, 136, 166, 0.15);

          path[stroke] {
            stroke: rgba(124, 136, 166, 0.85);
          }

          path[fill] {
            fill: rgba(124, 136, 166, 0.85);
          }

          rect[fill] {
            fill: rgba(124, 136, 166, 0.8);
          }
        }
      }
      .order-panel__quantity {
      }
    }
  }

  .active3 {
    border-top: 3px solid #00ab56;
    border-radius: 6px 6px 0px 0px;
    background: url('/img/forControlCOD/document.png'),
      linear-gradient(
        180deg,
        rgba(0, 171, 86, 0.6) -259.09%,
        rgba(0, 171, 86, 0) 100%
      ),
      #ffffff;
    background-repeat: no-repeat;
    background-position: top right;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .countup {
      color: #00ab56 !important;
    }

    &:hover {
      cursor: pointer;
    }
    .order-panel__heading {
      svg {
        color: #00ab56;

        path[stroke] {
          stroke: #00ab56;
        }

        path[fill] {
          fill: #00ab56;
        }

        rect[fill] {
          fill: rgba(0, 171, 86, 0.8);
        }
      }
    }
  }

  .active2 {
    background: url('/img/forControlCOD/documentRed.png'),
      linear-gradient(
        180deg,
        rgba(255, 66, 78, 0.6) -310.96%,
        rgba(255, 66, 78, 0) 100%
      ),
      #ffffff;
    background-repeat: no-repeat;
    background-position: top right;
    border-top: 3px solid #ff424e;

    .countup {
      color: #ff424e !important;
    }

    .order-panel__quantity{
      span{
        svg {
          color:#808089;
  
          path[stroke] {
            stroke: #808089;
          }
  
          path[fill] {
            fill: #808089;
          }
        }
      }
      
    }

    .order-panel__heading {
      svg {
        color: #ff424e;

        path[stroke] {
          stroke: #ff424e;
        }

        path[fill] {
          fill: #ff424e;
        }

        rect[fill] {
          fill: rgba(255, 66, 78, 0.8);
        }
      }
    }
  }
`
