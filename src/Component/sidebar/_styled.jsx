import styled from 'styled-components'

export const StyledSidebar = styled.aside`
  position: fixed;
  top: 0;
  z-index: 3;

  width: 220px;
  height: 100%;
  padding: 11px 0 0 0;

  background: #161d25;

  transition: width 0.25s;

  &[data-minimize='true'] {
    width: 56px;
  }

  &:hover {
    .sidebar {
      &__bottom {
        pointer-events: all;
      }
    }
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    margin-top: 1px;
    // margin-right: 0.6rem;
  }

  .sidebar {
    &__toggle {
      position: absolute;
      top: 78px;
      right: -4px;
      z-index: 1;

      width: 28px;
      height: 28px;

      background: #fff;
      border: none;
      border-radius: 4px;
      box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.04);

      cursor: pointer;

      transform: translateX(10px);

      &[data-rotate='true'] {
        svg {
          transform: rotate(180deg);
        }
      }

      svg {
        width: 12px;
        height: 12px;

        display: inline;

        transition: transform 0.25s;
      }
    }

    &__menu {
      margin: 0;

      &[data-scrollable='true'] {
        height: 100%;
        padding-bottom: 54px;

        overflow-y: auto;
        overflow-x: hidden;
      }
    }

    &__bottom {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;

      border-top: 1px solid rgba(235, 238, 245, 0.2);

      pointer-events: none;
    }
  }
`

export const StyledSidebarMenuItem = styled.li`
  position: relative;

  cursor: pointer;

  &[data-active='true'] {
    .sidebar-menu-item {
      &__icon {
        svg {
          color: #ff424f;

          path[stroke] {
            stroke: #ff424f;
          }
        }
      }

      &__text {
        color: #ff424f;
        font-weight: 600;
      }
    }
  }

  &[data-minimize='true'] {
    &:hover {
      .sidebar-menu-item {
        &__container {
          background: #161d25;
        }

        &__sub-menu {
          display: block;
        }
      }
    }

    .sidebar-menu-item {
      &__container {
        padding: 0;
      }

      &__icon {
        left: 28px;

        transform: translate(-50%, -50%);
      }

      &__text {
        opacity: 0;

        pointer-events: none;
      }

      &__toggle {
        opacity: 0;
      }

      &__sub-menu {
        position: absolute;
        top: 0;
        left: calc(100% + 4px);

        width: 206px;
        max-height: unset !important;

        display: none;
        overflow: unset;

        background: #161d25;
        border-radius: 4px;
        box-shadow: 2px 4px 18px #0C1018;

        &[data-hidden='true'] {
          max-height: unset !important;
        }

        &[data-type='dropdown'] {
          position: absolute;
          top: unset;
          bottom: 0;
          left: calc(100% + 4px);

          width: 206px;
          padding: 0;

          background: #161d25;
          border-radius: 4px;

          transform: translateX(0);
        }

        &::before {
          position: absolute;
          left: -4px !important;
          top: 0 !important;

          width: 4px !important;
          height: 100% !important;

          content: '';
        }
      }
    }
  }

  &:hover {
    .sidebar-menu-item {
      &__sub-menu {
        &[data-type='dropdown'] {
          display: block;
        }
      }
    }
  }

  .sidebar-menu-item {
    margin: 0 0 4px 0;

    &__container {
      position: relative;

      height: 44px;

      display: flex;
      align-items: center;

      background: #161d25;

      transition: all 0.25s;

      &[data-size='lg'] {
        height: 54px;
      }

      &:hover {
        background: #161d25;

        .sidebar-menu-item__text {
          color: #ff424f;
        }

        .sidebar-menu-item__icon {
          svg {
            color: #ff424f;

            path[stroke] {
              stroke: #ff424f;
            }
          }
        }
      }
    }

    &__icon {
      position: absolute;
      top: 50%;
      left: 28px;

      transform: translate(-50%, -50%);

      svg {
        width: 24px;
        height: 24px;

        display: inline;

        color: #7c88a6;

        transition: color 0.25s;

        path[stroke] {
          stroke: #7c88a6;

          transition: color 0.25s;
        }
      }
    }

    &__text {
      position: absolute;
      top: 50%;
      left: 56px;

      width: 195px;

      display: inline-block;

      color: #ffffff;
      font-size: 14px;
      font-weight: 400;

      transform: translateY(-50%);
      transition: all 0.25s;
    }

    &__tag {
      margin-left: 4px;
      padding: 0 4px;
      height: 16px;

      display: inline-block;

      border-radius: 4px;

      color: #fff;
      font-size: 10px;
      font-weight: 600;
      line-height: 16px;
      text-transform: uppercase;

      &[data-type='new'] {
        background: #ff424f;
        border-radius: 8px 0;
      }
    }

    &__toggle {
      height: 20px;

      position: absolute;
      top: 52%;
      right: 16px;

      transform: translateY(-50%);
      transition: all 0.25s;

      pointer-events: none;

      &[data-toggle='true'] {
        transform: translateY(-50%) rotate(180deg);
      }

      svg {
        width: 20px;
        height: 20px;

        display: inline;

        color: #7c88a6;

        transition: color 0.25s;

        path[stroke] {
          stroke: #7c88a6;

          transition: color 0.25s;
        }
      }
    }

    &__sub-menu {
      overflow: hidden;

      transition: max-height 0.25s;

      &[data-hidden='true'] {
        max-height: 0 !important;
      }

      &[data-type='dropdown'] {
        position: absolute;
        bottom: calc(100% + 4px);
        left: 50%;

        width: 196px;
        max-height: unset !important;
        padding: 12px 4px;

        overflow: unset;

        display: none;

        background: #161d25;
        border-radius: 4px;
        box-shadow: 2px 4px 18px #0c1018;

        transform: translateX(-50%);

        &:before {
          position: absolute;
          top: 100%;
          left: 0;

          width: 100%;
          height: 4px;

          content: '';
        }
      }
    }
  }
`

export const StyledSidebarSubMenuItem = styled.div`
  position: relative;

  height: 40px;

  display: flex;
  align-items: center;

  transition: background 0.25s;
  border-radius: 4px;

  &[data-active='true'] {
    background: #040711;

    .sidebar-sub-menu-item {
      &__link {
        color: #ffffff !important;
        background: #fffff;
        font-weight: 500;
      }

      &__icon {
        svg {
          color: #212533 !important;

          path[stroke] {
            stroke: #212533 !important;
          }

          path[fill] {
            fill: #212533 !important;
          }
        }
      }
    }
  }

  &[data-br='true'] {
    &:hover {
      border-radius: 4px;
    }
  }

  &[data-type='dropdown'] {
    background: #212533;

    .sidebar-sub-menu-item {
      &__link {
        padding: 0 20px;
      }
    }

    &[data-active='true'],
    &:hover {
      background: #212533;

      .sidebar-sub-menu-item {
        &__icon {
          svg {
            color: #ff424f !important;
          }
        }

        &__link {
          color: #ff424f !important;
        }
      }
    }
  }

  &:hover {
    .sidebar-sub-menu-item {
      &__icon {
        svg {
          color: #ff424f;

          path[stroke] {
            stroke: #ff424f;
          }

          path[fill] {
            fill: #ff424f;
          }
        }
      }

      &__link {
        color: #ff424f;
      }
    }
  }

  .sidebar-sub-menu-item {
    &__icon {
      position: absolute;
      top: 50%;
      left: 10px;

      transform: translateY(-50%);

      svg {
        width: 20px;
        height: 20px;

        display: inline;

        color: #7c88a6;

        transition: color 0.25s;
      }
    }

    &__link {
      width: 100%;
      height: 100%;
      padding: 0 16px 0 56px;

      display: flex;
      align-items: center;

      color: #ffffff;
      font-size: 13px;
      font-weight: 400;

      transition: all 0.25s;

      &[data-type='dropdown'] {
        padding: 0 20px;
      }

      &[data-small-p='true'] {
        padding: 0 16px 0 40px;
      }
    }
  }
`

export const StyledExtraSubMenu = styled.ul``
