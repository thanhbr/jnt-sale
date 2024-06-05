import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledButton = styled.button`
  height: 36px;
  padding: 0 16px;

  background: ${THEME_COLORS.primary_300};
  border: 1px solid ${THEME_COLORS.primary_300};
  border-radius: 4px;

  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 34px;

  transition: all 0.25s;
  display: inline-block;
  cursor: pointer;

  &:disabled {
    background: #eff2f8 !important;
    border-color: #eff2f8 !important;

    color: #c8cbd4 !important;

    cursor: no-drop;
  }

  &[data-appearance='danger'] {
    background: ${THEME_SEMANTICS.failed};
    border-color: ${THEME_SEMANTICS.failed};

    color: #fff;

    &:disabled {
      background: #fff !important;

      color: #c8cbd4 !important;
    }

    &:hover {
      background: #db304a;
      border-color: #db304a;

      color: #fff;
    }
  }

  &[data-appearance='secondary'] {
    background: #fff;
    border-color: ${THEME_COLORS.primary_gray_300};

    color: ${THEME_COLORS.secondary_gray_900};

    &:disabled {
      background: #fff !important;

      color: #c8cbd4 !important;
    }

    &:hover {
      background: rgba(255, 0, 0, 0.1);
      border-color: rgba(255, 0, 0, 0.6);

      color: ${THEME_COLORS.secondary_gray_900};
    }
  }

  &[data-appearance='ghost'] {
    background: #fff;
    border-color: #ebeef5;

    color: ${THEME_COLORS.secondary_200};
    font-weight: 400 !important;

    &:disabled {
      color: #c8cbd4 !important;
    }

    &:hover {
      background: #fff;
      border-color: #ebeef5;

      color: ${THEME_COLORS.primary_300};
    }
  }

  &[data-badge='true'] {
    position: relative;
  }

  &[data-exist-icon='true'] {
    padding: 0 12px 0 8px;

    &[data-icon-position='back'] {
      padding: 0 8px 0 12px;
    }
  }

  &[data-missing-content='true'] {
    width: 36px;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    &[data-size='md-'] {
      width: 34px;
    }

    &[data-size='sm'] {
      width: 32px;
    }

    &[data-size='xs'] {
      width: 28px;
    }
  }

  &[data-size='md-'] {
    height: 34px;

    font-size: 13px;
    line-height: 32px;
  }

  &[data-size='sm'] {
    height: 32px;
    padding: 0px 24px;
    font-size: 13px;
    line-height: 30px;
  }

  &[data-size='xs'] {
    height: 28px;

    font-size: 13px;
    line-height: 26px;
  }

  &[data-size='xxs'] {
    height: 26px;

    font-size: 13px;
    line-height: 24px;
  }

  &:hover {
    background: rgba(255, 0, 0, 0.6);
    border-color: rgba(255, 0, 0, 0.6);
  }

  .button {
    &__container {
      display: flex;
      align-items: center;
      justify-content: center;

      &[data-appearance='secondary'] {
        svg {
          color: ${THEME_COLORS.secondary_gray_900};

          path[stroke] {
            stroke: ${THEME_COLORS.secondary_gray_900};
          }
        }

        &[data-disabled='true'] {
          svg {
            color: #c8cbd4 !important;

            path[stroke] {
              stroke: #c8cbd4 !important;
            }
          }
        }

        &:hover {
          svg {
            color: ${THEME_COLORS.secondary_gray_900};

            path[stroke] {
              stroke: ${THEME_COLORS.secondary_gray_900};
            }
          }
        }
      }

      &[data-appearance='ghost'] {
        svg {
          color: ${THEME_COLORS.secondary_200};

          path[stroke] {
            stroke: ${THEME_COLORS.secondary_200};
          }
        }

        &[data-disabled='true'] {
          svg {
            color: #c8cbd4 !important;

            path[stroke] {
              stroke: #c8cbd4 !important;
            }
          }
        }

        &:hover {
          svg {
            color: ${THEME_COLORS.secondary_200};

            path[stroke] {
              stroke: ${THEME_COLORS.secondary_200};
            }
          }
        }
      }

      svg {
        width: 20px;
        height: 20px;

        color: #fff;

        path[stroke] {
          stroke: #fff;
        }
      }

      span {
        margin: 0 0 0 4px;
      }
    }

    &__badge {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;

      border: 1px solid #fff;

      font-size: 10px;
      line-height: 14px;

      transform: translate(50%, -50%);

      &[data-circle='true'] {
        width: 16px;

        color: transparent;
      }
    }
  }
  
  &[data-size='xxxs'] {
    height: 20px;

    font-size: 12px;
    line-height: 140%;
    svg{
      width: 14px;
      height: 14px;
    }
    p{
      margin: 0 0 0 2px;
    }
  }
`
