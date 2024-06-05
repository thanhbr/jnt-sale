import { Grid } from '@mui/material'
import { Button } from 'common/button'
import { ICONS } from 'Pages/customer/_icons'
import "./index.scss"
import {PATH} from "../../../../const/path";
import CreateCustomer from "../../CreateCustomer/createCustomer";
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { CustomerContext } from 'Pages/customer';

export default () => {
  const {state} = useContext(CustomerContext)
  const { keyword, group, city, district, ward} = state.filter
  const hasFilter = keyword.value || group.value || city.value || district.value || ward.value

  return (
    <tr className={'customer-tr-empty'}>
      <td colSpan={9}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <div className="container-empty">
            <img src={'/img/customer/no-image.svg'} alt={'no image customer'}/>
            <p className="text-empty">{hasFilter ? "Không tìm thấy dữ liệu phù hợp" : "Bạn chưa có khách hàng nào"}</p>
            <Link to={PATH.CREATE_CUSTOMER} component={<CreateCustomer />}>
              { !hasFilter && <Button
                className="address-separate-tool-header__action-btn-accept"
                icon={ICONS.plus}
                to={PATH.CREATE_CUSTOMER}
                component={<CreateCustomer />}
              >
                Tạo mới khách hàng
              </Button>}
            </Link>
          </div>
        </Grid>
      </td>
    </tr>
  )
}