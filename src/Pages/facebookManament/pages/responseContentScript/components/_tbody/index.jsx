import {Skeleton} from '@mui/material'
import {formatDatetime} from 'common/form/datePicker/_functions'
import {Popper} from 'common/popper'
import { Tooltip } from 'common/tooltip'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import { useState } from 'react'
import useFacebookResponseContentScript from '../../hooks/useFacebookResponseContentScript'
import {FacebookResponseContentScript_Galleries} from '../_galleries'
import {StyledFacebookResponseContentScript_Tbody} from './_styled'

export const FacebookResponseContentScript_Tbody = ({
  data,
  loading,
  ...props
}) => {
  const {methods} = useFacebookResponseContentScript()

  const actions = [
    {
      id: 1,
      name: 'Chỉnh sửa',
      icon: FACEBOOK_ICONS.edit05,
      onClick: () => methods.handleDetailChange({type: 'detail', data}),
    },
    {
      id: 2,
      name: 'Xóa',
      type: 'danger',
      icon: FACEBOOK_ICONS.trash,
      onClick: () => {
        methods.handleConfirmDeleteModalUpdate({id: data?.id})
      },
    },
  ]
  const [styling, setstyling] = useState({
    status: false,
    from: ""
  });

  if (loading)
    return (
      <StyledFacebookResponseContentScript_Tbody {...props}>
        {Array.from(Array(6), (e, i) => (
          <div key={i} className="facebook-response-content-script-tbody__td">
            <Skeleton
              sx={{
                width: '100%',
                height: 33,
                background:
                  'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
              }}
            />
          </div>
        ))}
      </StyledFacebookResponseContentScript_Tbody>
    )

  return (
    <StyledFacebookResponseContentScript_Tbody {...props}>
      <div className="facebook-response-content-script-tbody__td">
        {FACEBOOK_ICONS.threeDotsVertical}
      </div>
      <div className="facebook-response-content-script-tbody__td">
        <div className="--ellipsis">
          {data?.title ? `/${data.title}` : '---'}
        </div>
      </div>
      <div className="facebook-response-content-script-tbody__td">

        <div className="--ellipsis">
          {
             data?.message.length < 200 ?  data?.message :
             <Tooltip placement="bottom-start" title={data?.message} >
             {data?.message || '---'}
             </Tooltip>
          }
          
        </div>

        <div className="--ellipsis-a">
          {styling?.status == true || data?.message.length < 200 ?
                                data?.message
                              : data?.message.substring(0, 200)+'...' || '---'}
          {styling?.status == false && data?.message.length > 200 && <span className='--ellipsis-a-view-more'
            onClick={(e) => {setstyling({ status: true, from:  data.id})}} >Xem thêm
          </span>}
          {styling?.status == true && data?.message.length > 200 && <span className='--ellipsis-a-view-more'
            onClick={(e) => {setstyling({ status: false, from:  data.id})}} >Rút gọn
          </span>}
        </div> 
        
      </div>
      <div className="facebook-response-content-script-tbody__td">
        <FacebookResponseContentScript_Galleries
          list={
            data?.image
              ? ArrayUtils.getQualifiedArray(JSON.parse(data?.image))
              : []
          }
        />
      </div>
      <div className="facebook-response-content-script-tbody__td">
        {data?.dt_created ? formatDatetime(data?.dt_created) : '---'}
      </div>
      <div className="facebook-response-content-script-tbody__td">
        <Popper
          placement="left-start"
          popperProps={{style: {padding: 8}}}
          renderPopper={({onClose}) => (
            <div className="facebook-response-content-script-tbody__menu">
              {actions.map(item => (
                <div
                  key={item?.id}
                  className="facebook-response-content-script-tbody__menu-item"
                  data-type={item?.type}
                  onClick={() => {
                    if (onClose) onClose()
                    if (item?.onClick) item.onClick()
                  }}
                >
                  <i className="facebook-response-content-script-tbody__menu-icon">
                    {item?.icon}
                  </i>
                  <span>{item?.name}</span>
                </div>
              ))}
            </div>
          )}
        >
          <i style={{cursor: 'pointer'}}>{FACEBOOK_ICONS.manipulation}</i>
        </Popper>
      </div>
    </StyledFacebookResponseContentScript_Tbody>
  )
}
