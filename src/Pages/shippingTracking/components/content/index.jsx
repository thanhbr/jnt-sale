import {useContext} from 'react'
import {Skeleton} from '@mui/material'
import {SHIPPING_ICONS} from '../../_icons'
import {Tooltip} from 'common/tooltip'
import {ShippingTrackingContext} from 'Pages/shippingTracking'
import {TrackingDetail} from './_trackingDetail'
import {StyledShippingTrackingContent} from './_styled'
import {actions} from '../../_reducer'

export const ShippingTrackingContent = ({...props}) => {

  const {pageState, pageDispatch} = useContext(ShippingTrackingContext)
  const {dataDisplay, dataTracking, positionActive, isLoading} = pageState
  const leftClass = dataDisplay.length<=0 ? 'content__left empty-billcode' : 'content__left'

  const handleChooseItem = (key) => {
    pageDispatch({
      type : actions.CHANGE_POSITION,
      payload : {
        data : dataDisplay,
        position : key
      },
    })
  }

  const handleDeleteItem = (e, key) => {
    e.stopPropagation();

    dataDisplay.splice(key, 1)
    const position = positionActive==0 ? 0 : ( positionActive>key ? (positionActive-1) : positionActive)

    pageDispatch({
      type : actions.FETCH_BILLCODE,
      payload : {
        data : dataDisplay,
        position : position
      },
    })
  }

  return (
    <StyledShippingTrackingContent {...props}>
      {isLoading ? (
        <div className={'content__left'}>
          <div className={'content__left__box'}>
            <LeftLoading/>
          </div>
        </div>
      ) : (
        <>
          <div className={leftClass}>
            {dataDisplay.length <= 0 ? (
              <>
                <div className="empty-billcode__banner"><img src="/img/tools/empty-billcode.png" alt="Empty" /></div>
                <div className="empty-billcode__text">Chưa có thông tin vận đơn!</div>
                <div className="empty-billcode__note">Hãy nhập thông tin mã vận đơn để thực hiện tra cứu hành trình!</div>
              </>
            ) : (
              <div className={'content__left__box'}>
                {dataDisplay.map((item, i) => (
                  <div key={i} className={'content__left__item'} data-active={i==positionActive ?? false} onClick={() => handleChooseItem(i)}>
                    <div className={'content__left__item__field-text__radio'}>
                      <input
                        name={'billcode'}
                        id={'billcode-'+i}
                        type={'radio'}
                        value={item.billcode}
                        checked={i==positionActive ?? false}
                      />
                      <label>{item.billcode}</label>
                      {item.detail.length==0 ? (
                        <Tooltip placement="bottom" title={'Không tìm thấy vận đơn trên hệ thống EVO'}>
                          {SHIPPING_ICONS.warning}
                        </Tooltip>
                      ) : (
                        <>
                        {item.tracking.length==0 ? (
                          <Tooltip placement="bottom" title={'Vận đơn chưa có hành trình'}>
                            {SHIPPING_ICONS.warning}
                          </Tooltip>
                        ) : ('')}
                        </>
                      )}
                      <button className={'content__left__item__btn-delete'} data-active="false" onClick={(e) => handleDeleteItem(e, i)}>{SHIPPING_ICONS.delete}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      <div className="content__right">
        <TrackingDetail/>
      </div>
    </StyledShippingTrackingContent>
  )
}

export const LeftLoading = () => {
  return (
    <ul className="address-table__tr">
      {Array.from(Array(10), (e, i) => (
        <div key={i} className={'content__left__item'} style={{padding : '16px 16px 16px 20px'}}>
          <div className={'content__left__item__field-text__radio'}>
            <Skeleton
              variant="circular"
              sx={{
                width: 20,
                height: 19,
                background:
                  'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
              }}
            />
            <label>
              <Skeleton
                variant="text"
                sx={{
                  width: 130,
                  height: 19,
                  background:
                    'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
                }}
              />
            </label>
          </div>
        </div>
      ))}
    </ul>
  )
}