import { Popover } from '@mui/material'
import { THEME_COLORS } from 'common/theme/_colors'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import { useState } from 'react'
import styled from 'styled-components'
import { EXTRA_SETTING } from '../../interface/_constants'
import { ICON_CONVERSATION } from '../../interface/icon'

export const ExtraPopperSetting = ({ onActionClick, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }
  const handleItemClick = (key, data) => {
    onActionClick(key, data)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <StyledIconToggle
        // aria-describedby={id}
        variant="contained"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <div className={'common-icon'} data-active={open}>{ICON_CONVERSATION.dots}</div>
      </StyledIconToggle>
      <Popover
        id={id}
        className="common-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <StyledRowMenuPopover>
          {EXTRA_SETTING.map((item, key) => (
            <li
              key={item.id}
              className="row-menu-popover__item"
              data-danger={item?.isDanger}
              onClick={() => handleItemClick(key, props.item)}
            >
              {item.icon} <span>{item.name}</span>
            </li>
          ))}
        </StyledRowMenuPopover>
      </Popover>
    </>
  )
}

const StyledRowMenuPopover = styled.ul`
  width: 180px;
  padding: 8px;

  .row-menu-popover {
    &__item {
      height: 36px;

      display: flex;
      align-items: center;

      color: #00081d;
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;

      transition: color 0.25s;

      cursor: pointer;

      &[data-danger='true'] {
        &:hover {
          color: ${THEME_SEMANTICS.failed};

          svg {
            color: ${THEME_SEMANTICS.failed};

            path[stroke] {
              stroke: ${THEME_SEMANTICS.failed};
            }

            path[fill] {
              fill: ${THEME_SEMANTICS.failed};
            }
          }
        }
      }

      &:hover {
        color: ${THEME_COLORS.primary_300};
      }

      svg {
        width: 18px;
        height: 18px;

        margin-right: 10px;
      }
    }
  }
`

const StyledIconToggle = styled.i`
  position: relative;
  z-index: 1;
  height: 24px;
  .common-icon{
    &[data-active='true']{
      svg {
        color: ${THEME_COLORS.primary_300};
  
        path[stroke] {
          stroke: ${THEME_COLORS.primary_300};
        }
  
        path[fill] {
          fill: ${THEME_COLORS.primary_300};
        }
      }
    }
  }
  &:hover {
    svg {
      color: ${THEME_COLORS.primary_300};

      path[stroke] {
        stroke: ${THEME_COLORS.primary_300};
      }

      path[fill] {
        fill: ${THEME_COLORS.primary_300};
      }
    }
  }
`
