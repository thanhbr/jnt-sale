import React, {useState} from 'react';
import {Popover} from "@mui/material";
import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {PAYMENT_MANAGEMENT_ICONS} from "../../interfaces/icon";
import {PAYMENT_MANAGEMENT_TABLE_ROW_MENU_POPOVER} from "../../interfaces/_const";
import {ICONS} from "../../../customer/_icons";

export const RowMenuPopover = ({
                                   id,
                                   dataOrder,
                                   onActionClick,
                                    status
                               }) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = e => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
        e.stopPropagation()
    }

    const handleClose = () => setAnchorEl(null)

    const open = Boolean(anchorEl)
    const idData = open ? id : undefined

    const actionList = PAYMENT_MANAGEMENT_TABLE_ROW_MENU_POPOVER

    const handleItemClick = type => {
        onActionClick(type)
        handleClose()
    }

    return (
        <>
            <StyledIconToggle
                aria-describedby={idData}
                variant="contained"
                style={{cursor: 'pointer'}}
                onClick={handleClick}
            >
                {open ?  <div style={{width: 10, paddingLeft: 5}}>
                    {PAYMENT_MANAGEMENT_ICONS.manipulation_hover}
                </div> :  <div style={{width: 10, paddingLeft: 5}}>
                    {PAYMENT_MANAGEMENT_ICONS.manipulation}
                </div>}

            </StyledIconToggle>
            {open && actionList.length > 0 && (
                <Popover
                    id={idData}
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
                        {actionList.map(item =>
                            item.id === 2 && +dataOrder?.receipt_type_is_default === 1
                                ? ('')
                                : item.id === 2 && +status === 2 ? (
                                    ('')
                                ) : (
                                    <li
                                        key={item.id}
                                        className="row-menu-popover__item"
                                        data-danger={item?.isDanger}
                                        onClick={() => handleItemClick(item.action)}
                                    >
                                        {item.icon} <span>{item.name}</span>
                                    </li>
                                )
                        )}
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
          rect[stroke]{
            stroke: ${THEME_COLORS.primary_300};
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
