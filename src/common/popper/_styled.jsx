import styled from 'styled-components'

export const StyledPopper = styled.span`
  position: relative;

  .popper {
    &__toggle {
      display: inline-block;
      .show-toggle{
        svg{
          transition: transform 290ms cubic-bezier(0, 1, 0, 1),
          fill 290ms cubic-bezier(0.4, 0, 0.2, 1);
          transform: rotateZ(-179.99deg);
        }
      }
    }

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 20;

      width: 100vw;
      height: 100vh;

      cursor: default;
    }

    &__container {
      position: absolute;
      z-index: 21;

      padding: 12px;

      background: #fff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

      &[data-placement='top-start'] {
        bottom: calc(100% + 4px);
        left: 0;
      }
      &[data-placement='top'] {
        bottom: calc(100% + 4px);
        left: 50%;

        transform: translateX(-50%);
      }
      &[data-placement='top-end'] {
        bottom: calc(100% + 4px);
        right: 0;
      }

      &[data-placement='right-start'] {
        top: 0;
        left: calc(100% + 4px);
      }
      &[data-placement='right'] {
        top: 50%;
        left: calc(100% + 4px);

        transform: translateY(-50%);
      }
      &[data-placement='right-end'] {
        bottom: 0;
        left: calc(100% + 4px);
      }

      &[data-placement='bottom-start'] {
        top: calc(100% + 4px);
        left: 0;
      }
      &[data-placement='bottom'] {
        top: calc(100% + 4px);
        left: 50%;

        transform: translateX(-50%);
      }
      &[data-placement='bottom-end'] {
        top: calc(100% + 4px);
        right: 0;
      }

      &[data-placement='left-start'] {
        top: 0;
        right: calc(100% + 4px);
      }
      &[data-placement='left'] {
        top: 50%;
        right: calc(100% + 4px);

        transform: translateY(-50%);
      }
      &[data-placement='left-end'] {
        bottom: 0;
        right: calc(100% + 4px);
      }
    }
  }
`
