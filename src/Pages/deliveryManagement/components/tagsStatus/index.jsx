import './index.scss'

// import {DELIVERY_MANAGEMENT_TAGS_STATUS} from 'Pages/deliveryManagement/interfaces/_constants'
import {useContext, useEffect, useRef, useState} from 'react'
import {DeliveryContext} from 'Pages/deliveryManagement/provider/_context'
import {DropdownStatus} from './DropdownStatus'
import StatusItem from './StatusItem'
import DeliveryFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { Button } from '@mui/material'

export const TagsStatus = ({className = '', style}) => {
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {filter, table} = pageState
  const {functions, shippingStatus} = DeliveryFilterForm()
  const [active, setActive] = useState(0)
  const [containerPosition, setContainerPosition] = useState(null)
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

  const containerRef = useRef()
  const contentRef = useRef()
  const btnLeftRef = useRef()
  const btnRightRef = useRef()
  const handleScroll = () => {
    const startPoint = 0
    const endPoint =
      contentRef.current.scrollWidth - contentRef.current.offsetWidth
    const curPoint = Math.floor(containerRef.current.scrollLeft)

    if (curPoint >= endPoint) btnRightRef.current.style.display = 'none'
    else btnRightRef.current.style.display = 'block'

    if (curPoint === 0) btnLeftRef.current.style.display = 'none'
    else btnLeftRef.current.style.display = 'block'

    if (containerRef.current) {
      const containerPos = containerRef.current?.getBoundingClientRect()
      setContainerPosition({y: containerPos.top, x: containerPos.left})
    }
  }

  const handleScrollRight = e => {
    e.stopPropagation()
    const endPoint =
      contentRef.current.scrollWidth - contentRef.current.offsetWidth

    let newPoint = containerRef.current.scrollLeft + 100
    if (newPoint > endPoint) newPoint = endPoint

    containerRef.current.scrollLeft = newPoint
  }

  const handleScrollLeft = (e) => {
    e.stopPropagation()
    setTimeout(() => {
      let newPoint = containerRef.current.scrollLeft - 100
      if (newPoint < 0) newPoint = 0
  
      containerRef.current.scrollLeft = newPoint

    }, 0)
  }

  const handleTagHover = (e) => {
    const endPoint =
      contentRef.current.scrollWidth - contentRef.current.offsetWidth
    const curPoint = Math.floor(containerRef.current.scrollLeft)

    if (curPoint < endPoint) btnRightRef.current.style.display = 'block'

    if (curPoint !== 0) btnLeftRef.current.style.display = 'block'
  }

  const handleMouseLeave = (e) => {
    btnRightRef.current.style.display = 'none'
    btnLeftRef.current.style.display = 'none'
  }

  return (
    <div className="tag-status-container" onMouseOver={handleTagHover} onMouseLeave={handleMouseLeave}>
      <div
        ref={btnLeftRef}
        className="scroll-to-left"
        onClick={handleScrollLeft}
      >
        <div className="img-wrapper">
          <img src='/svg/arrow-left.svg' alt='arrow-left' />
        </div>
      </div>
      <div
        ref={btnRightRef}
        className="scroll-to-right"
        onClick={handleScrollRight}
      >
        <div className="img-wrapper">
          <img src='/svg/arrow-right.svg' alt='arrow-right' />
        </div>
      </div>

      <div
        ref={containerRef}
        className={`d-tags-status ${className}`}
        onScroll={handleScroll}
      >
        <div ref={contentRef} className="d-tags-status__container">
          <div className="scroll__container"></div>
          {filter.shippingStatus?.list?.map((item, index) => {
            return (
              <div key={index}>
                {item.sub_arr?.length > 0 ? (
                  <DropdownStatus
                    containerRef={containerPosition}
                    item={item}
                    disable={!table?.loading}
                    active={active}
                    handleChangeSubStatusAll={handleChangeStatus}
                  />
                ) : (
                  <StatusItem
                    item={item}
                    active={active}
                    disable={!table?.loading}
                    index={index}
                    handleChangeStatus={handleChangeStatus}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
