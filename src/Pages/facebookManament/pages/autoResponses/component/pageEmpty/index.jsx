import {Button} from 'common/button'
import {Text} from 'common/text'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {StyledOrderEmpty} from './_styled'
import useFacebookAutoResponses from '../../hooks/useFacebookAutoResponses'

export const PageEmpty = ({...props}) => {
  const {data} = useFacebookAutoResponses()

  const shouldShowCreateBtn =
    !!!data?.filter?.keyword  && data?.table?.display?.updateList?.length == 0 && data?.filter?.pageSelected?.value == 0
  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 4}}>
        {shouldShowCreateBtn
          ? 'Chưa có kịch bản nào!'
          : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
      <Text as="p" color="#7C88A6" style={{marginBottom: 16}}>
        {shouldShowCreateBtn
          ? 'Hãy thiết lập kịch bản để phản hồi tự động các bình luận của khách hàng'
          : ''}
      </Text>
      {shouldShowCreateBtn && (
        <Button href={'/facebook/auto-responses/create'} icon={ORDER_ICONS.plus}>
          Thêm kịch bản
        </Button>
      )}
    </StyledOrderEmpty>
  )
}
