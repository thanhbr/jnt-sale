import { ICON_FILTER } from '../../../interface/icon'
import { Tooltip } from '../../../../../../../common/tooltip'
import React, { useEffect, useRef, useState } from 'react'
import useFilterFacebookLiveStreamDetail from '../../../hooks/useFilterFacebookLiveStreamDetail'

export const UserGroup = ({ ...props }) => {
  const { data, methods } = useFilterFacebookLiveStreamDetail()
  const userGroup = data.filter?.liveStream?.groupPerson
  const [over, setOver] = useState(false)
  const [isActionActive, setIsActionActive] = useState(false)
  const wrapperRef = useRef(null)
  const wrapperRef2 = useRef(null)
  useEffect(() => {
    function handleClickOutside (event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !wrapperRef2.current.contains(event.target)
      ) {
        setIsActionActive(false)
        methods.closeFilter()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])
  return (
    <div style={{ position: 'relative' }}>
      <div
        className={'filter-content__item'}
        ref={wrapperRef2}
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        data-show={!!isActionActive}
        data-filter={!!userGroup}
      >
        {
          !isActionActive
            ?
            <Tooltip placement="right" title={'Gom bình luận theo người dùng'}>
              <div
                className={'filter-content__item-icon'}
                onClick={e => {
                  setIsActionActive(prev => !prev)
                  methods.handleGroupPerson(true)
                  e.stopPropagation()
                }}>
                {ICON_FILTER.userGroup}
              </div>
            </Tooltip>
            :
            <div
              className={'filter-content__item-icon'}
              onClick={e => {
                setIsActionActive(prev => !prev)
                methods.handleGroupPerson(false)
                e.stopPropagation()
              }}>
              {ICON_FILTER.userGroup}
            </div>
        }
        {!!userGroup
        &&
        <div className={'close-filter'} onClick={() => {
          setIsActionActive(prev => !prev)
          methods.handleGroupPerson(false)
        }}>
          <Tooltip placement="right" title={'Bỏ lọc'}>{ICON_FILTER.close}</Tooltip>
        </div>
        }
      </div>
    </div>
  )
}

