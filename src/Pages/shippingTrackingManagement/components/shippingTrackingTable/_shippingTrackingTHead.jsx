import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import useShippingTracking from '../../hooks/useShippingTrackingTHead'
import {useEffect, useState} from 'react'
import ConfirmModal from 'Pages/customer/components/ConfirmModal'
import { ShippingTrackingContext } from '../../provider/_context'
import { useContext } from 'react'
import { Loading } from '../../../../common/loading'
import useAlert from '../../../../hook/useAlert'

export const ShippingTrackingTHead = ({...props}) => {
  const {checkbox, selected, print,loading} = useShippingTracking()
  const [confirm, setConfirm] = useState({})
  const {pageState} = useContext(ShippingTrackingContext)
  const displayList = pageState.table.display.list

  const {showAlert} = useAlert()

  const checkFullPageChecked = () => {
    let checkFullPage = true
    displayList.forEach(item => {
      const findItem = selected.list.find(find => find.order_id === item.order_id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }

  useEffect(() => {
    if (print?.url && print?.url !== '#') {
      if (print?.link?.current) print?.link.current.click()
    }
  }, [print.url])
  
  return (
    <Tr {...props} type="tHead">
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      <Th className="shippingTracking-management-table__cell">
        <Checkbox
          checked={checkbox.checked}
          indeterminate={!checkFullPageChecked()}
          onClick={e => {
            e.stopPropagation()
            checkbox.onClick()
          }}
        />
      </Th>
      {checkbox.checked ? (
        <Th
          className="shippingTracking-management-table__cell"
          data-selected="true"
          data-type="th"
        >
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={600}
            lineHeight={20}
          >
            {selected.list.length > 9
              ? selected.list.length
              : `0${selected.list.length}`}{' '}
            đơn hàng được chọn
          </Text>
          <div className="shippingTracking-management-table__selected-action-dropdown">
            {selected.list.length > 10 ?
              <Button
                className="shippingTracking-management-table__selected-action-toggle"
                size="xs"
                onClick={() => showAlert({
                  content:
                    'Bạn chỉ có thể chọn tối đa 10 vận đơn để tra cứu hành trình',
                  type: 'danger',
                })}
              >
                Tra cứu vận đơn
              </Button>
              :
              <Button
                href={'/tools/shipping-tracking?search='+selected.list.map((item)=> item.billcode)?.toString()}
                className="shippingTracking-management-table__selected-action-toggle"
                size="xs"
                target={'_blank'}
              >
                Tra cứu vận đơn
              </Button>
            }
          </div>
        </Th>
      ) : (
        <>
          <Th className="shippingTracking-management-table__cell">Mã vận đơn</Th>
          <Th className="shippingTracking-management-table__cell">Người nhận</Th>
          <Th className="shippingTracking-management-table__cell">Trạng thái vận đơn</Th>
          <Th className="shippingTracking-management-table__cell">Nội dung kiện vấn đề</Th>
          <Th className="shippingTracking-management-table__cell">Trạng thái xử lý</Th>
          <Th className="shippingTracking-management-table__cell">Nội dung xử lý với khách</Th>
          <Th className="shippingTracking-management-table__cell"></Th>
        </>
      )}
      <a
        ref={print.link}
        href={print.url}
        style={{display: 'none'}}
        target={'_blank'}
      ></a>
      {loading && <Loading/>}
    </Tr>
  )
}
