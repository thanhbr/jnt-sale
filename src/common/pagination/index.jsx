import { Popover } from '@mui/material'
import { Button } from 'common/button'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { useRef, useState } from 'react'
import { PAGINATION_ICONS } from './_icons'
import { StyledPagination } from './_styled'
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";

/**
 * @type {TypeAmount}         = 10 | 20 | 50
 * @type {TypeOnPageChange}   = (p: number) => void    <@param {p} - The page number to go to>
 * @type {TypeOnAmountChange} = (n: number) => void    <@param {n} - The number of row display>
 */
/**
 * @param {active}            : number                 <Current page> <start with 0>
 * @param {amount}            : TypeAmount             <Current number of rows>
 * @param {total}             : number                 <Total pages>
 * @param {totalItems}        : number                 <Total items>
 * @param {onPageChange}      : TypeOnPageChange       <Event on page change>
 * @param {onAmountChange}    : TypeOnAmountChange     <Event on amount of row change>
 */
export const Pagination = ({
  active,
  amount,
  total,
  totalItems,
  onPageChange,
  onAmountChange,
  disabled,
  ...props
}) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleIcon = useRef()

  const shouldOpenPopover = Boolean(anchorEl)
  const popoverId = shouldOpenPopover ? 'pagination__amount-popover' : undefined

  let firstArr = []
  let secondArr = []
  if (total <= 8) for (let i = 0; i < total; i++) firstArr.push(i)
  else {
    if (active + 1 <= total - 8) {
      for (let i = active; i < active + 5; i++) firstArr.push(i)
      secondArr = [total - 2, total - 1]
    } else if (active + 1 === total - 7) {
      for (let i = active - 1; i < active + 4; i++) firstArr.push(i)
      secondArr = [total - 2, total - 1]
    } else for (let i = total - 7; i < total; i++) firstArr.push(i)
  }

  const generatePaginationText = () => {
    const start = active * amount + 1
    const end =
      active + 1 < total
        ? active * amount + amount
        : totalItems == amount ? (active + 1) * amount + (totalItems % amount) : active * amount + (totalItems % amount)

    return `${start}-${+end} ${t(DISPLAY_NAME_MENU.GENERAL.OUT_OF)} ${totalItems} ${t(DISPLAY_NAME_MENU.GENERAL.LINES)}`
  }

  const handleAmountClick = n => {
    if (disabled) return
    if (n == amount) return

    onAmountChange(n)
    handlePopoverClose()
  }

  const handlePopoverClick = () =>
    toggleIcon?.current && toggleIcon.current.click()

  const handlePopoverClose = () => setAnchorEl(null)

  const handleToggleClick = e => setAnchorEl(e.currentTarget)

  return (
    <StyledPagination {...props}>
      <div className="pagination__btn-list">
        <Button
          className="pagination__btn pagination__arrow"
          appearance="ghost"
          data-disabled={active === 0}
          disabled={disabled}
          data-type="prev"
          onClick={() => active > 0 && onPageChange(0)}
        >
          {PAGINATION_ICONS.doubleArrow}
        </Button>
        <Button
          className="pagination__btn pagination__arrow"
          appearance="ghost"
          data-disabled={active === 0}
          disabled={disabled}
          data-type="prev"
          onClick={() => active > 0 && onPageChange(active - 1)}
        >
          {PAGINATION_ICONS.arrow}
        </Button>
        {total > 8 && active + 1 >= total - 6 && (
          <Button
            className="pagination__btn pagination__dots"
            appearance="ghost"
            disabled={disabled}
          >
            ...
          </Button>
        )}
        {firstArr.map(item => (
          <Button
            key={item}
            className="pagination__btn pagination__number"
            appearance={item === active ? 'primary' : 'ghost'}
            data-active={item === active}
            onClick={() => onPageChange(item)}
            disabled={disabled}
          >
            {item + 1}
          </Button>
        ))}
        {total - active >= 8 && (
          <Button
            className="pagination__btn pagination__dots"
            appearance="ghost"
            disabled={disabled}
          >
            ...
          </Button>
        )}
        {secondArr.map(item => (
          <Button
            key={item}
            className="pagination__btn pagination__number"
            appearance={item === active ? 'primary' : 'ghost'}
            data-active={item === active}
            onClick={() => onPageChange(item)}
            disabled={disabled}
          >
            {item + 1}
          </Button>
        ))}
        <Button
          className="pagination__btn pagination__arrow"
          appearance="ghost"
          data-disabled={active === total - 1}
          data-type="next"
          onClick={() => active < total - 1 && onPageChange(active + 1)}
          disabled={disabled}
        >
          {PAGINATION_ICONS.arrow}
        </Button>
        <Button
          className="pagination__btn pagination__arrow"
          appearance="ghost"
          data-disabled={active === total - 1}
          data-type="next"
          onClick={() => active < total - 1 && onPageChange(total - 1)}
          disabled={disabled}
        >
          {PAGINATION_ICONS.doubleArrow}
        </Button>
      </div>
      <div className="pagination__popover" onClick={handlePopoverClick}>
        <Text>{generatePaginationText()}</Text>
        <button
          ref={toggleIcon}
          className="pagination__popover-toggle"
          onClick={handleToggleClick}
          disabled={disabled}
        >
          {PAGINATION_ICONS.carotArrow}
        </button>
      </div>
      {shouldOpenPopover && (
        <Popover
          id={popoverId}
          open={true}
          onClose={handlePopoverClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <div className="pagination__amount-list">
            {[20, 50, 100, 200].map((item, i) => (
              <Text
                key={i}
                as="p"
                color={
                  +item === +amount
                    ? THEME_COLORS.primary_300
                    : THEME_COLORS.secondary_100
                }
                fontWeight={+item === +amount ? 600 : 400}
                style={{
                  marginTop: i === 0 ? 0 : 16,
                  cursor: +item === +amount ? 'default' : 'pointer',
                }}
                onClick={() => handleAmountClick(item)}
              >
                {item}
                {+item === +amount && (
                  <div
                    style={{
                      display: 'inline-block',
                      transform: 'translate(4px, 2px)',
                    }}
                  >
                    {PAGINATION_ICONS.check}
                  </div>
                )}
              </Text>
            ))}
          </div>
        </Popover>
      )}
    </StyledPagination>
  )
}
