import React, {useEffect, useState} from 'react'
import Pagination from '@material-ui/lab/Pagination'
import {convertStringToNumber} from 'util/functionUtil'
import {useTranslation} from 'react-i18next'
import Dropdown from 'Component/PureDropdown/Dropdown'
/**
 *
 * @param {per_page} per_page number in 1 page
 * @param {start} start get from ?
 * @param {totals} totals all items
 * @param {customClassName} customClassName classname if you want modify style
 * @param {onchangePagination} onchangePagination Trigger callback when user change any in pagination
 * @param {isHidePerPage} isHidePerPage hide perpage selection
 * @param {unit} unit unit of list - string hide perpage selection
 * @returns pagination jsx
 */
export default function BasicPagination({...props}) {
  const {t} = useTranslation()
  const {
    totals = 0,
    start = 0,
    per_page = 20,
    customClassName = '',
    onchangePagination = () => {},
    isHidePerPage = false,
    isHideLeftFooter=false,
    unit="display_order"
  } = props

  const [current_page, set_current_page] = useState(1)
  const [all_page, set_all_page] = useState(1)
  const onChangeInputPage = e => {
    const text = e.target.value
    if (/^[0-9]*$/.test(text)) {
      const num = Number(text) || 0
      if (num > all_page) {
        // resetPage()
      } else {
        set_current_page(num)
        if (!num) return
        const perpage = Number(per_page)
        const start = (num - 1) * perpage
        onchangePagination({per_page: perpage, start: start})
      }
    } else {
    }
  }

  const HandleClick = (event, item) => {
    if (item + '' === current_page + '') {
      return
    }
    const newStart =
      (convertStringToNumber(item) - 1) * convertStringToNumber(per_page)
    onchangePagination({per_page: per_page, start: newStart})
  }
  const onSelectPerPage = item => {
    onchangePagination({per_page: item.value, start: 0})
  }
  const renderLeftPagination = () => {
    const numStart = start ? Number(start) : 0
    const numPerPage = per_page ? Number(per_page) : 0
    const numAllOrder = totals ? Number(totals) : 0
    const from = numStart || 0
    let to = 0
    numStart + numPerPage > numAllOrder
      ? (to = numAllOrder)
      : (to = numStart + numPerPage)

    return `${t('Display')} ${t(unit)} ${from + 1} - ${to}. ${t('page')}`
  }
  useEffect(() => {
    const page =
      Math.floor(
        convertStringToNumber(start) / convertStringToNumber(per_page),
      ) + 1
    const all_page = Math.ceil(
      convertStringToNumber(totals) / convertStringToNumber(per_page),
    )
    set_current_page(page)
    set_all_page(all_page)
  }, [start,per_page, totals ])
  return (
    <div
      className={
        customClassName
          ? `${customClassName} upos-grid-pagination`
          : 'upos-grid-pagination'
      }
    >
      {isHideLeftFooter ? null : <div className="left-footer">
        <div className="upos-text">
          {renderLeftPagination(start, per_page, all_page)}
        </div>
        <input
          className="upos-input input-pagination upos-text"
          value={current_page}
          onChange={e => {
            onChangeInputPage(e)
          }}
        />
        <div className="upos-text">{` / ${all_page || 0}`}</div>
      </div>}
      <div className="right-footer">
        {isHidePerPage ? null : (
          <Dropdown
            listOption={[
              {label: '20', value: 20},
              {label: '50', value: 50},
              {label: '100', value: 100},
              {label: '150', value: 150},
              {label: '200', value: 200},
            ]}
            selected={{label: per_page, value: per_page}}
            cb={item => {
              onSelectPerPage(item)
            }}
            hideScroll={true}
          />
        )}
        {isHidePerPage ? null : (
          <div className="upos-text pagination-right-text">
            {`${t(unit)}/${t("per_page")}`}
          </div>
        )}
        <div className="pagination-wrapper">
          <Pagination
            siblingCount={0}
            boundaryCount={2}
            count={all_page}
            page={current_page}
            onChange={HandleClick}
          />
        </div>
      </div>
    </div>
  )
}
