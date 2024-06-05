import './index.scss'
import {useContext, useEffect, useRef, useState} from 'react'
import Dropdown from 'Component/PureDropdown/Dropdown'
import {Checkbox} from 'common/form/checkbox'
import StatusItem from '../StatusItem'
import useClickOutside from 'Pages/customer/useClickOutside'
import {DeliveryContext} from 'Pages/deliveryManagement/provider/_context'
import {orderActions} from 'Pages/deliveryManagement/provider/_reducer'
import DeliveryFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { fNumber } from 'util/formatNumber'

export const DropdownStatus = ({
  className = '',
  style,
  item,
  active,
  handleChangeSubStatusAll,
  containerRef,
  disable
}) => {
  const popupRef = useRef()
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {functions, shippingStatus} = DeliveryFilterForm()

  const [showOption, setShowOption] = useState(false)
  const disableChangeDropdown = item.sub_arr.filter(x => x.checked).length <= 1

  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => {
    setShowOption(false)
  })

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

  const handleShowPopup = () => {
    if (disable) return
    setShowOption(prev => !prev)
  }

  const onResize = () => {
    if (wrapperRef.current) {
      let rect = wrapperRef.current.getBoundingClientRect();
      popupRef.current.style.left = rect.left - containerRef?.x + 'px'
    }
  }
  onResize()

  useEffect(() => {
    document.addEventListener('resize', onResize)
    return () => document.removeEventListener('resize', onResize)
  }, [])

  return (
    <div ref={wrapperRef} className="dropdown-status">
      <div className="status-item" onClick={handleShowPopup}>
        <StatusItem
          item={{
            ...item,
            total: item.sub_arr.filter(x => x.checked)?.reduce((prev, curr) => ({...curr, total: curr.total + prev.total})).total,
          }}
          active={active}
          disable={disable}
          handleChangeStatus={handleChangeSubStatusAll}
        />
      </div>
      <div
        ref={popupRef}
        className={`status-sub-item`}
        style={{display: showOption ? 'block' : 'none'}}
      >
        {item.sub_arr?.map((subStatus, index) => (
          <div className="d-tags-status__list" key={index}>
            <label>
              <Checkbox
                disabled={(subStatus.checked && disableChangeDropdown) || disable}
                checked={subStatus.checked}
                onChange={event => {
                  if (disable) return
                  if (subStatus.checked && disableChangeDropdown) return
                  handleChangeStatus(event, index)
                }}
              />
              <p
                className={
                  'd-tags-status__drop-title-500' +
                  (subStatus.checked && disableChangeDropdown
                    ? ' d-tags-status__disabled'
                    : '')
                }
              >
                {subStatus.name}
              </p>

              <div className={'d-tags-status__option-total'}>
                {fNumber(subStatus.total)}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
