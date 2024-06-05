import {Text} from 'common/text'
import {StyledOrderEmpty} from './_styled'

export const PageEmpty = ({...props}) => {

  return (
    <StyledOrderEmpty {...props}>
      <img
        className="order-empty__banner"
        src="/img/order/order-empty.png"
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 4}}>
          Không tìm thấy dữ liệu phù hợp
      </Text>
    </StyledOrderEmpty>
  )
}
