import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookFanpage__AddCard = styled.div`
  height: 220px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
      0deg,
      rgba(26, 148, 255, 0.15),
      rgba(26, 148, 255, 0.15)
    ),
    #ffffff;
  border-radius: 6px;

  transition: all 0.25s;

  cursor: pointer;

  &:hover {
    background: ${THEME_SEMANTICS.delivering};

    .facebook-fanpage-add-card {
      &__icon {
        border-color: #fff;

        & > i {
          background: #fff;

          svg {
            path {
              stroke: ${THEME_SEMANTICS.delivering};
            }
          }
        }
      }

      &__text {
        color: #fff !important;
      }
    }
  }

  .facebook-fanpage-add-card {
    &__icon {
      width: 64px;
      height: 64px;
      margin-bottom: 24px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px dashed ${THEME_SEMANTICS.delivering};
      border-radius: 50%;

      transition: border 0.25s;

      & > i {
        width: 48px;
        height: 48px;

        display: flex;
        align-items: center;
        justify-content: center;

        background: ${THEME_SEMANTICS.delivering};
        border-radius: 50%;

        transition: background 0.25s;
      }
    }

    &__text {
      transition: color 0.25s;
    }
  }
`
