import './index.scss'

import {useContext, useEffect, useState, useRef} from 'react'
import {CodContext} from '../../provider/_context'
import {DropdownStatus} from './DropdownStatus'
import StatusItem from './StatusItem'
import CodFilterForm from '../../hooks/useCodFilterForm'

export const TagsStatus = ({className = '', style}) => {
  const {pageState, pageDispatch} = useContext(CodContext)
  const {filter} = pageState
  const {functions, shippingStatus} = CodFilterForm()
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
        className={`d-tags-cod-status ${className}`}
        onScroll={handleScroll}
      >
        <div ref={contentRef} className="d-tags-cod-status__container"  style={pageState.table.loading == false ?  {cursor: 'no-drop',pointerEvents: 'none'} : {pointerEvents: 'auto'}}>
          <div className="scroll__container"></div>
          {filter.shippingStatus?.list?.map((item, index) => {
            return (
              <div key={index}>
                {item.sub_arr?.length > 0 ? (
                  <DropdownStatus
                    containerRef={containerPosition}
                    item={item}
                    active={active}
                    handleChangeSubStatusAll={handleChangeStatus}
                  />
                ) : (
                  <StatusItem
                    item={item}
                    active={active}
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
