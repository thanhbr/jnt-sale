import React, {useState} from "react";
import styled from "styled-components";

import {POPOVER_USER} from "../../interfaces/~contants"
import {Popover} from "@material-ui/core";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {USER_ROLE} from "../../interfaces/~icon";
import useTableBody from "../../hooks/useTableBody";

const Index = ({dataRow }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { functions } = useTableBody()
  const handleClick = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const actionList = POPOVER_USER

  const handleItemClick = type => {
    if(type === 1) functions.handleEditUserRole(dataRow)
    if(type === 2) functions.handleDeleteUserRole(dataRow)
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
        {USER_ROLE.manipulation}
      </StyledIconToggle>
      {open && (
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
            {actionList.map(item => {
              if(item?.id === '2' && dataRow?.is_default === '1') {
                return ''
              } else {
                return (
                  <li
                    key={item.id}
                    className="row-menu-popover__item"
                    data-danger={item?.isDanger}
                    onClick={() => {
                      handleItemClick(item.action)
                    }}
                  >
                    {item.icon} <span>{item.name}</span>
                  </li>
                )
              }
            })}
          </StyledRowMenuPopover>
        </Popover>
      )}
    </>
  )
}
export default Index

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
      
      &--disabled {
        cursor: not-allowed;
        background: linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;
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