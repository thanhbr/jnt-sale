import styled from 'styled-components'

export const StyledMiniGame = styled.div`
  width: 100%;
  height: 100%;
  background: url(/img/minigame/bg_mini_game.png) no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  overflow: hidden;
  .liveStream_grid-layout {
    @media screen and (max-width: 1440px) {
      margin-left: 57px !important;
      .fb-layout-left {
        width: 435px !important;
      }
      .fb-layout-right {
        width: calc(100% - 435px) !important;
        .content-liveStream__chat {
          width: calc(100% - 410px);
        }
        .content-liveStream__info {
          width: 410px;
        }
      }
    }
  }
`
