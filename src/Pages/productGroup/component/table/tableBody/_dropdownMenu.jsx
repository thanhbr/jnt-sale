import {Popover} from '@mui/material'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import { ICONS } from 'Pages/customer/_icons'
import { PRODUCT_MENU_ACTION } from 'Pages/productGroup/interface'
import { ProductGroup } from 'Pages/productGroup/provider/_context'
import { useProductAction } from 'Pages/productGroup/provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import {useState} from 'react'
import styled from 'styled-components'

export const RowMenuPopover = ({index, onActionClick}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { pageState, pageDispatch } = useContext(ProductGroup)
  const handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    pageDispatch({type:useProductAction.GET_ID,payload:index})
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const actionList = PRODUCT_MENU_ACTION

  const handleItemClick = type => {
    onActionClick(type)
    handleClose()
  }

  return (
    <>
      <StyledIconToggle
        aria-describedby={id}
        variant="contained"
        style={{cursor: 'pointer'}}
        onClick={handleClick}
      >
        {open ? <>{ICONS.manipulation_hover}</> : <>{ORDER_ICONS.manipulation}</>}
        
      </StyledIconToggle>
      {open && actionList.length > 0 && (
        <Popover
          id={id}
          className="common-popover"
          open={true}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <StyledRowMenuPopover>
            {actionList.map(item => (
                <li
                  key={item.id}
                  className="row-menu-popover__item"
                  data-danger={item?.isDanger}
                  onClick={() =>{

                    handleItemClick(item.action)
                  }}
                >
                  {item.icon} <span>{item.name}</span>
                </li>
              ))}
          </StyledRowMenuPopover>
        </Popover>
      )}
    </>
  )
}

const StyledRowMenuPopover = styled.ul`
  width: 180px;
  padding: 8px 12px;

  .row-menu-popover {
    &__item {
      height: 36px;

      display: flex;
      align-items: center;

      color: #00081d;
      font-size: 14px;
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

const StyledIconToggle = styled.i`
  position: relative;
  z-index: 1;

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
