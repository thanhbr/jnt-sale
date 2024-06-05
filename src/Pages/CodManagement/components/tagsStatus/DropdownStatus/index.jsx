import './index.scss'
import {useContext, useRef, useState} from 'react'
import Dropdown from 'Component/PureDropdown/Dropdown'
import {Checkbox} from 'common/form/checkbox'
import StatusItem from '../StatusItem'
import useClickOutside from 'Pages/customer/useClickOutside'
import {CodContext} from '../../../provider/_context'
import {orderActions} from '../../../provider/_reducer'
import CodFilterForm from '../../../hooks/useCodFilterForm'
import { fNumber } from 'util/formatNumber'

export const DropdownStatus = ({
  className = '',
  style,
  item,
  active,
  handleChangeSubStatusAll,
}) => {
  const {pageState, pageDispatch} = useContext(CodContext)
  const {functions, shippingStatus} = CodFilterForm()

  const [showOption, setShowOption] = useState(false)
  const disableChangeDropdown = item.sub_arr.filter(x => x.checked).length <= 1

  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => {
    setShowOption(false)
  })

  // const selectedList =

  // const [selectedList, setSelectedList] = useState(
  //   item.sub_arr.map(itemArr => ({
  //     label: itemArr.name,
  //     value: itemArr.id,
  //     total: itemArr.total,
  //     checked: true,
  //   })),
  // )

  const handleChangeStatus = (event, index) => {
    event.stopPropagation()

    const newSubArr = [...item.sub_arr]
    newSubArr[index].checked = event.target.checked

    const newStatusList = pageState.filter.shippingStatus.list.map(status => {
      if (status.id === item.id) return {...status, sub_arr: newSubArr}
      else return status
    })

    //change redux status List
    pageDispatch({
      type: orderActions.FILTER_SHIPPING_STATUS_LIST_UPDATE,
      payload: newStatusList,
    })

    //
    shippingStatus.onChange(newSubArr.filter(status => status.checked))

    // call api
    functions.applyDeliveryOtherFilter(newSubArr)
  }

  return (
    <div ref={wrapperRef} className="dropdown-cod-status">
      <div className="status-item" onClick={() => setShowOption(prev => !prev)}>
        <StatusItem
          item={{
            ...item,
            total: item.sub_arr.filter(x => x.checked)?.reduce((prev, curr) => ({...curr, total: curr.total + prev.total})).total,
          }}
          active={active}
          handleChangeStatus={handleChangeSubStatusAll}
        />
      </div>
      <div
        className="status-sub-item"
        style={{display: showOption ? 'block' : 'none'}}
      >
        {item.sub_arr?.map((subStatus, index) => (
          <div className="d-tags-cod-status__list" key={index}>
            <label>
              <Checkbox
                disabled={subStatus.checked && disableChangeDropdown}
                checked={subStatus.checked}
                onChange={event => {
                  if (subStatus.checked && disableChangeDropdown) return
                  handleChangeStatus(event, index)
                }}
              />
              <p
                className={
                  'd-tags-cod-status__drop-title-500' +
                  (subStatus.checked && disableChangeDropdown
                    ? ' d-tags-cod-status__disabled'
                    : '')
                }
              >
                {subStatus.name}
              </p>

              <div className={'d-tags-cod-status__option-total'}>
                {fNumber(subStatus.total)}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
