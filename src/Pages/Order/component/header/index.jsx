import {Breadcrumb} from 'common/breadcrumb'
import {Button} from 'common/button'
import {ORDER_BREADCRUMB} from 'Pages/Order/_constants'
import {ICONS} from '../../_icon'
import {StyledCustomerHeader} from './_styled'

export const OrderHeader = ({...props}) => {
  return (
    <StyledCustomerHeader {...props}>
      <Breadcrumb links={ORDER_BREADCRUMB} title="Quản lý đơn hàng" />
      <div className="address-separate-tool-header__actions">
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ICONS.reload}
        />
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ICONS.download}
        >
          Xuất Excel
        </Button>
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ICONS.multipleOrder}
        >
          Lên đơn hàng loạt
        </Button>
        <Button
          className="address-separate-tool-header__action-btn"
          icon={ICONS.plus}
        >
          Tạo đơn hàng
        </Button>
      </div>
    </StyledCustomerHeader>
  )
}
