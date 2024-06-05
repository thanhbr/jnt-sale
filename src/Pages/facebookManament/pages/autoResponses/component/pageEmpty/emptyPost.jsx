import {Button} from 'common/button'
import {Text} from 'common/text'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import Empty from '../../interface/images/empty-post.png'
import styled from 'styled-components'
import useCreateFacebookAutoResponses from '../../hooks/useCreateFacebookAutoResponses'

export const PostEmpty = ({...props}) => {
  const {data,methods}  = useCreateFacebookAutoResponses()
  const {fanPage} = data
   const {validate} = data
  return (
    <StyledEmpty {...props}>
      <img
        className="order-empty__banner"
        src={Empty}
        alt="empty"
      />
      <Text as="p" color={!!validate?.postAndComment?.post ? "#FF424E" : "#7C88A6"} fontWeight={600} style={{marginBottom: 4,width: '100%important'}}>
        {fanPage?.value ? 'Chưa có bài viết được chọn'
          : 'Bạn chưa chọn Trang áp dụng.'
        }
      </Text>
      <Text as="p" color="#7C88A6" style={{marginBottom: 16,width: '100%important'}}>
        {fanPage?.value ? 'Bạn có thể chọn một hoặc nhiều bài viết cho kịch bản, mỗi bài viết chỉ áp dụng cho một kịch bản.'
                        : 'Vui lòng chọn trang áp dụng trước để thực hiện lựa chọn bài viết.'
        }
      </Text>
      <Button disabled={!fanPage?.value} onClick={methods?.onShowListPost} icon={ORDER_ICONS.plus}>
        Chọn bài viết
      </Button>
    </StyledEmpty>
  )
}

export const StyledEmpty = styled.div`
  height: 304px;
  text-align: center;
  padding: 24px;
`
