import {Breadcrumb} from 'common/breadcrumb'
import {Button} from 'common/button'
import {CUSTOMER_BREADCRUMB, MODAL} from 'Pages/customer/_constants'
import {ICONS} from 'Pages/customer/_icons'
import {StyledCustomerHeader} from './_styled'
import {Link} from 'react-router-dom'
import CreateCustomer from '../../CreateCustomer/createCustomer'
import {PATH} from '../../../../const/path'
import useCustomerFilterForm from '../hooks/useCustomerFilterForm'
import { useContext } from 'react'
import { CustomerContext } from '../../index'
import useExport from '../hooks/useExport'
import { ImportAddressSeparatorFileModal } from '../import'
import { Export } from '../Export'

export const CustomerHeader = ({...props}, style) => {
  const {state, dispatch} = useContext(CustomerContext)
  const {modal} = state
  const {functions} = useCustomerFilterForm({state, dispatch})
  const {exportUrl, exportLink, exportModalData, handleExportClick} = useExport()
  
  return (
    <StyledCustomerHeader {...props}>
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
      {exportModalData && <Export data={exportModalData} />}

      <ImportAddressSeparatorFileModal
        open={modal?.id === MODAL.IMPORT}
        onClose={() => dispatch({type: 'TOGGLE_MODAL', payload: { id: '' }})}
      />

      <Breadcrumb links={CUSTOMER_BREADCRUMB} title="Quản lý khách hàng"/>
      <div className="address-separate-tool-header__actions">
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ICONS.reload}
          onClick={
              functions.resetPage
          }
        ></Button>
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ICONS.upload}
          onClick={() => dispatch({type: 'TOGGLE_MODAL', payload: { id: MODAL.IMPORT }})}
        >
          Import danh sách khách hàng
        </Button>
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ICONS.download}
          onClick={handleExportClick}
        >
          Xuất Excel
        </Button>
        <Link to={PATH.CREATE_CUSTOMER} component={<CreateCustomer />}>
          <Button
            className="address-separate-tool-header__action-btn-accept"
            icon={ICONS.plus}
            to={PATH.CREATE_CUSTOMER}
            component={<CreateCustomer />}
          >
            Thêm mới
          </Button>
        </Link>
      </div>
    </StyledCustomerHeader>
  )
}
