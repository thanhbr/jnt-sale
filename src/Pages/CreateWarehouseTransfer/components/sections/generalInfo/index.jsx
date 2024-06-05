import {useContext} from 'react'
import {WarehouseTransferContext} from '../../../provider/_context'
import { WarehouseTSExport } from './_export'
import { StyledWarehouseTSCustomerInfo } from './_styled'
import { WarehouseTSImport } from './_import'
import DrawerCreateWarehouse from '../../modal/Modal'
import ModalClose from '../../modal/ConfirmClose'
import ModalInfo from '../../modal/ModalInfo'

export const WarehouseTransferGeneralInfo = ({...props}) => {
  const {state} = useContext(WarehouseTransferContext)

  return (
    <StyledWarehouseTSCustomerInfo {...props}>
      <div className="order-single-customer-info__form-group">
        <div className="order-single-customer-info__form-input">
          <WarehouseTSExport validate={state.validate} />
        </div>
        <div className="order-single-customer-info__form-input">
          <WarehouseTSImport validate={state.validate} />
        </div>
      </div>
      <DrawerCreateWarehouse />
      <ModalClose />
      <ModalInfo />
    </StyledWarehouseTSCustomerInfo>
  )
}
