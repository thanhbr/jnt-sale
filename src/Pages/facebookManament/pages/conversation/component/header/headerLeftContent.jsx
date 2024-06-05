import { Text } from '../../../../../../common/text'
import { Button } from '../../../../../../common/button'
import styled from 'styled-components'
import { ICON_CONVERSATION } from '../../interface/icon'
import useFilterFacebookConversation from '../../hooks/useFilterFacebookConversation'
import { Tooltip } from '../../../../../../common/tooltip'
import { PostCommentModal } from '../modal/postComment'
import {useState} from 'react';

export const HeaderLeftContent = () => {
  const { methods } = useFilterFacebookConversation()
  const [openExportExcelModal, setOpenExportExcelModal] = useState(false)
  return (
    <StyledHeaderLeft>
      <div className="header-content">
        <Text fontWeight={600} fontSize={'16px'}> Quản lý hội thoại </Text>
        <div style={{ display: 'flex' }}>
          <Tooltip title={'Xuất Excel danh sách bình luận theo bài viết'} placement="bottom">
            <Text style={{ marginRight: '8px', display: 'flex', cursor: 'pointer' }} onClick={()=>setOpenExportExcelModal(true)}>{ICON_CONVERSATION.excel}</Text>
          </Tooltip>
          <Tooltip title={'Làm mới danh sách hội thoại'} placement="bottom">
            <Text style={{ display: 'flex', cursor: 'pointer' }}
                  onClick={methods.approveFilter}>{ICON_CONVERSATION.reload}</Text>
          </Tooltip>
        </div>
      </div>
      {openExportExcelModal && <PostCommentModal open={openExportExcelModal} close={()=>{setOpenExportExcelModal(false)}}/>}
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