import { Popover } from '@mui/material'
import { THEME_COLORS } from 'common/theme/_colors'
import { useState } from 'react'
import styled from 'styled-components'
import { Text } from '../../../../../../../common/text'
import { useTranslation } from 'react-i18next'

export const ProfitOnOrder = ({ ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const {t} = useTranslation()
  return (
    <>
      <StyledIconToggle
        variant="contained"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
        data-active={!!anchorEl}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="33" height="33" rx="5.5" fill="white"/>
          <path
            d="M17 17.9375C17.5178 17.9375 17.9375 17.5178 17.9375 17C17.9375 16.4822 17.5178 16.0625 17 16.0625C16.4822 16.0625 16.0625 16.4822 16.0625 17C16.0625 17.5178 16.4822 17.9375 17 17.9375Z"
            fill="black"/>
          <path
            d="M17 12.9375C17.5178 12.9375 17.9375 12.5178 17.9375 12C17.9375 11.4822 17.5178 11.0625 17 11.0625C16.4822 11.0625 16.0625 11.4822 16.0625 12C16.0625 12.5178 16.4822 12.9375 17 12.9375Z"
            fill="black"/>
          <path
            d="M17 22.9375C17.5178 22.9375 17.9375 22.5178 17.9375 22C17.9375 21.4822 17.5178 21.0625 17 21.0625C16.4822 21.0625 16.0625 21.4822 16.0625 22C16.0625 22.5178 16.4822 22.9375 17 22.9375Z"
            fill="black"/>
          <rect x="0.5" y="0.5" width="33" height="33" rx="5.5" stroke="#EBEEF5"/>
        </svg>
      </StyledIconToggle>
      <Popover
        id={id}
        className="common-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ top: '4px' }}
      >
        <StyledRowMenuPopover>
          <Text className={'row-menu-popover__item'} as={'a'} href={'/report/sales/order-revenue'}>{t('order_profit_details')}</Text>
        </StyledRowMenuPopover>
      </Popover>
    </>
  )
}

const StyledRowMenuPopover = styled.ul`
  width: 209px;
  padding: 8px 12px;
  background: #FFFFFF;
  border: 1px solid #EBEEF5;
  border-radius: 6px;

  .row-menu-popover {
    &__item {
      display: flex;
      align-items: center;

      color: #00081d;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      transition: color 0.25s;

      cursor: pointer;

      &:hover {
        color: ${THEME_COLORS.primary_300};

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

      svg {
        width: 18px;
        height: 18px;

        margin-right: 10px;
      }
    }
  }
`

const StyledIconToggle = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  margin-left: 12px;
  
  &[data-active='true'] {
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
  svg {
      color: #000000;

      path[stroke] {
        stroke: #000000;
      }

      path[fill] {
        fill: #000000;
      }
    }
`
