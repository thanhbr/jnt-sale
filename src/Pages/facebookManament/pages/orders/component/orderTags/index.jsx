import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ORDER_FILTER_FACE_BOOK} from '../../interface/_const'
import { useContext } from 'react'
import {StyledOrderTags} from './_styled'
import {OrderTag} from './_tag'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";
import useFacebookPost from "../../hooks/useFacebookPost";
import useFacebookAutoResponses from "../../hooks/useFacebookAutoResponse";

export const OrderTags = ({...props}) => {
  const {
    dateTime,
    employee,
    functions,
    orderStatus
  } = useFacebookFilterForm()
  const {post} = useFacebookPost()
  const {pageSelected} = useFacebookAutoResponses()
  const shouldShowResetAll = functions.hasFilter()
  const handleDeleteAll = () => functions.filterTagDeleteAll()
  return (
    <StyledOrderTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {dateTime.activeValue.type.name}: {dateTime.activeValue.value}
        </OrderTag>
      )}

      {Array.isArray(pageSelected.activeValue?.value) &&
      pageSelected.activeValue.value.length > 0 && (
          <OrderTag
              onDelete={() =>
                  functions.filterTagDelete(ORDER_FILTER_FACE_BOOK[2])
              }
          >
            {pageSelected.activeValue.type.name}:{' '}
            {pageSelected.activeValue.value.map(item => item?.name).join(', ')}
          </OrderTag>
      )}
      {Array.isArray(post.activeValue?.value) &&
      post.activeValue.value.length > 0 && (
          <OrderTag
              onDelete={() =>
                  functions.filterTagDelete(ORDER_FILTER_FACE_BOOK[3])
              }
          >
            {post.activeValue.type.name}:{' '}
            {post.activeValue.value.map(item => item?.name? item?.name :'---').join(', ')}
          </OrderTag>
      )}
      {Array.isArray(employee.activeValue?.value) &&
      employee.activeValue.value.length > 0 && (
          <OrderTag
              onDelete={() =>
                  functions.filterTagDelete(ORDER_FILTER_FACE_BOOK[1])
              }
          >
            {employee.activeValue.type.name}:{' '}
            {employee.activeValue.value.map(item => item?.name).join(', ')}
          </OrderTag>
      )}
      {Array.isArray(orderStatus.activeValue) &&
      orderStatus.activeValue.length > 0 && (
          <OrderTag
              onDelete={() =>
                  functions.filterTagDelete(ORDER_FILTER_FACE_BOOK[4])
              }
          >
            Trạng thái đơn hàng:{' '}
            {orderStatus.activeValue.map(item => item?.name).join(', ')}
          </OrderTag>
      )}


      {shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          Đặt lại mặc định
        </Text>
      )}
    </StyledOrderTags>
  )
}
