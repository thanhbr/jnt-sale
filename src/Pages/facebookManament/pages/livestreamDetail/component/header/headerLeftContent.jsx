import { Text } from '../../../../../../common/text'
import styled from 'styled-components'
import { ICON_CONVERSATION } from '../../interface/icon'
import { Tooltip } from '../../../../../../common/tooltip'
import useFilterFacebookLiveStreamDetail from '../../hooks/useFilterFacebookLiveStreamDetail'
import { ExtraPopperSetting } from '../modal/_extraSettingPopper'
import React , {useRef} from 'react'
import useFacebookLiveStreamDetail from '../../hooks/useFacebookLiveStreamDetail'
import useAlert from '../../../../../../hook/useAlert'
import {useLiveStreamMiniGame} from "../../hooks/useLiveStreamMiniGame";

export const HeaderLeftContent = () => {

  const { queries,methods } = useFilterFacebookLiveStreamDetail()
  const liveStream = useFacebookLiveStreamDetail()
  const {functions} = useLiveStreamMiniGame()
  const arrFunction = [()=>functions.handleOpenModalMiniGame(),() => methods?.handleOpenConfigLiveStream()]
  const {showAlert} = useAlert()
  const handleItemClick = (key, data) => {
    (arrFunction[key])(data)
  }
  const liveStreamDetail = liveStream.data.liveStream?.detail
  const listComment = liveStream.data.liveStream.display?.list
  const groupPerson = !!liveStream.data.filter.liveStream.groupPerson ? 1 : 0
  const handlePrintComment = _ => {
    if(listComment.length > 0){
      const comments = {
        'stream_id': liveStreamDetail?.video_id,
        'group_person': groupPerson,
        'comment_id': listComment.map(item => item.comment_id) || []
      }
      liveStream.methods.handlePrintListComment(comments)
    }else{
      showAlert({
        type: 'danger',
        content: 'Không có bình luận nào để in'
      })
    }
  }
  //Export excel 
  const linkRef = useRef(null)
  const handleExportComment = async () => {
    if(listComment.length > 0){
      const stream_id = liveStreamDetail?.video_id;
      queries.group_person = queries.group_person == true ? 1 : 0
      queries.per_page = 0
      const response = await liveStream.methods.handleExportComment(stream_id,queries)
      if (response?.success) {
        linkRef.current.href = response?.data?.url
        linkRef.current.download = response?.data?.url.substr(
          response?.data?.url.lastIndexOf('/') + 1,
        )
        linkRef.current.click()
        showAlert({
          type: 'success',
          content: 'Xuất Excel thành công',
          duration: 3000,
        })
      } else {
        showAlert({
          type: 'danger',
          content: response?.data?.message,
          duration: 3000,
        })
      } 
    }else{
      showAlert({
        type: 'danger',
        content: 'Không có bình luận nào để xuất excel'
      })
    }
  }

  return (
    <StyledHeaderLeft>
      <div className="header-content">
        <Text fontWeight={600} fontSize={'16px'}> Bình luận Livestream </Text>
        <div style={{ display: 'flex' }}>
          <Tooltip title={'In bình luận'} placement="top">
            <Text style={{ marginRight: '8px', display: 'flex', cursor: 'pointer' }}
                  onClick={handlePrintComment}
            >{ICON_CONVERSATION.print}</Text>
          </Tooltip>
          <Tooltip title={'Xuất Excel danh sách bình luận'} placement="top">
            <Text style={{ marginRight: '8px', display: 'flex', cursor: 'pointer' }}
             onClick={handleExportComment}
            >{ICON_CONVERSATION.excel}</Text>
          </Tooltip>
          <Tooltip title={'Làm mới danh sách bình luận'} placement="top">
            <Text style={{ marginRight: '8px', display: 'flex', cursor: 'pointer' }}
                  onClick={methods.syncLiveStream}>{ICON_CONVERSATION.reload}</Text>
          </Tooltip>
          {/*<Tooltip title={'Cài đặt Livestream'} placement="top" style={{display: 'flex', alignItems: 'center'}}>*/}
          {/*  <Text style={{ marginRight: '8px', display: 'flex', cursor: 'pointer' }}*/}
          {/*        onClick={methods?.handleOpenConfigLiveStream}>{ICON_CONVERSATION.liveSetting}</Text>*/}
          {/*</Tooltip>*/}
          <Tooltip title={'Thiết lập khác'} placement="top">
            <ExtraPopperSetting onActionClick={handleItemClick}/>
          </Tooltip>
          <a ref={linkRef} style={{display: 'none'}}></a>
        </div>
      </div>
    </StyledHeaderLeft>
  )
}

const StyledHeaderLeft = styled.div`

  .header-content{
    display: flex;
    padding: 8px 8px 16px 8px;
    align-items: center;
    justify-content: space-between;
  }

`