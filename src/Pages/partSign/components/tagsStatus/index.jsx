import './index.scss'

// import {DELIVERY_MANAGEMENT_TAGS_STATUS} from 'Pages/partSign/interfaces/_constants'
import {useContext, useEffect, useState} from 'react'
import {DeliveryContext} from 'Pages/partSign/provider/_context'
import {DropdownStatus} from './DropdownStatus'
import StatusItem from './StatusItem'
import PartSignFilterForm from 'Pages/partSign/hooks/usePartSignFilterForm'

export const TagsStatus = ({className = '', style}) => {
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {filter} = pageState
  const {functions, shippingStatus} = PartSignFilterForm()
  const [active, setActive] = useState(0)

  const handleChangeStatus = item => {
    const hasSubArray = item.sub_arr?.length > 0
    const value = hasSubArray ? item.sub_arr : [item]
    // setActive(item.id)
    // change redux status
    shippingStatus.onChange(value)
    // call api
    functions.applyDeliveryOtherFilter(value)
  }

  useEffect(() => {
    const activeItem = shippingStatus.list.find(item => {
      const activeItem = shippingStatus.activeValue[0]
      if (item.id === activeItem?.id) return true
      return item.sub_arr?.find(x => x.id === activeItem?.id)
    })
    if (activeItem) {
      setActive(activeItem.id)
    } else setActive(0)
  }, [shippingStatus.activeValue])
  

  return (
    <div className={`d-tags-status ${className}`}>
      <div className="d-tags-status__container">
        {filter.shippingStatus?.list?.map((item, index) => {
          return (
            <div key={index}>
              {item.sub_arr?.length > 0 ? (
                <DropdownStatus item={item} active={active} handleChangeSubStatusAll={handleChangeStatus}/>
              ) : (
                <StatusItem item={item} active={active} index={index} handleChangeStatus={handleChangeStatus}/>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
