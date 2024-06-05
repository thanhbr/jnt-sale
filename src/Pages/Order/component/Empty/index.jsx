import { Grid } from '@mui/material'
import { ICONS } from '../../_icon'
import { Button } from '../../../../common/button'
import "./index.scss"

export default () => {
  return (
    <tr className={'order-tr-empty'}>
      <td colSpan={9}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <div className="container-empty">
            {ICONS.empty_order}
            <p className="text-empty">Không tìm thấy dữ liệu phù hợp</p>
            <Button
              className="address-separate-tool-header__action-btn"
              icon={ICONS.plus}
            >
              Tạo đơn hàng
            </Button>
          </div>
        </Grid>
      </td>
    </tr>
  )
}