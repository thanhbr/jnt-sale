import { Grid } from '@mui/material'
import { CustomToolTip } from 'Component/tooltip/CustomTooltip'
import { ICONS } from 'Pages/Order/_icon'
import { fDateTimeSuffix } from '../../../../../util/formatTime'
import './Shipping.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useContext, useState } from 'react'
import { Button } from '../../../../../common/button'
import useAlert from '../../../../../hook/useAlert'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import { orderStatus, shippingRequirement, StatusOrderDetail } from '../../../_constants'
import { OrderContext } from '../../../../../LayoutWrapper'

export const Shipping = ({ orderDetail }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [, dispatch] = useContext(OrderContext)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '1.5rem',
  }
  const { showAlert } = useAlert()

  const handleSubmit = async () => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/update_status`,
      {
        order_ids: [orderDetail.id],
        status: StatusOrderDetail.cancel_delivery,
      },
    )
    if (!!response?.data?.success) {
      showAlert({ content: 'Hủy giao hàng thành công', type: 'success' })
      dispatch({ type: 'SET_LOAD_DETAIL' })
    } else showAlert({ content: 'Hủy giao hàng Thất bại', type: 'danger' })
    handleClose()
  }
  return (
    <>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <div className="ship-header">
          <label className="text-base font-bold pb-3">
            <div className="m-bill-code">
              Mã vận đơn:{' '}
              <span className="bill-code">{orderDetail?.billcode}</span>{' '}
              <img src={'svg/copy-03.svg'} alt="copy-03" />
            </div>
          </label>
          {orderDetail.shipping_status_id == orderStatus.GUIDONGIAOHANG.id &&
            <Grid xs={4} sm={4} md={4} lg={4} item>
              <Button
                className="!text-sm button_small_size mr-2"
                onClick={handleOpen}
                appearance="secondary"
                size="sm"
              >
                Hủy giao hàng
              </Button>
              <Button className="!text-sm !text-white" size="sm">
                In vận đơn
              </Button>
            </Grid>
          }
        </div>

        <Grid xs={12} sm={12} md={12} lg={12} container>
          <Grid xs={4} sm={4} md={4} lg={4} item className="flex ">
            <div>
              <p className="shipping-details">Đơn vị vận chuyển: </p>
              <p className="shipping-details">Ngày gửi đơn: </p>
              <p className="shipping-details">Yêu cầu lấy hàng: </p>
              <p className="shipping-details">Yêu cầu khi giao: </p>
            </div>
            <div>
              <p className="data-shipping-details">
                {orderDetail?.partner_name}
              </p>
              <p className="data-shipping-details">
                {orderDetail.pick_date
                  ? fDateTimeSuffix(orderDetail.pick_date)
                  : ''}
                &nbsp;
              </p>
              <p className="data-shipping-details">{shippingRequirement.request_goods[orderDetail.request_goods]}</p>
              <p className="data-shipping-details">{shippingRequirement.recipient_view[orderDetail.recipient_view]}</p>
            </div>
          </Grid>
          <Grid xs={4} sm={4} md={4} lg={4} item className="flex ">
            <div>
              <p className="shipping-details">
                Tiền thu hộ:
                <CustomToolTip
                  title="Trời ơi bão táp mưa sa, Chưa có nội dung!!! "
                  placement="top-start"
                >
                  {ICONS.tooltip}
                </CustomToolTip>
              </p>
              <p className="shipping-details">Bảo hiểm hàng hóa: </p>
              <p className="shipping-details">Người trả phí: </p>
            </div>
            <div>
              <p className="data-shipping-details">120,000 đ</p>
              <p className="data-shipping-details">Không</p>
              <p className="data-shipping-details">
                Người gửi cuối tháng thanh toán
              </p>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Xác nhận hủy giao hàng
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#00081D',
                marginBottom: '1rem',
              }}
            >
              Bạn có chắc muốn hủy gia hàng đơn hàng này không?
            </Typography>
            <div className="confirm-the-file-has-been-filed__footer">
              <Button
                className="confirm-the-file-has-been-filed__btn"
                appearance="ghost"
                onClick={handleClose}
              >
                Đóng
              </Button>
              <Button
                className="confirm-the-file-has-been-filed__btn btn-submit-status_order"
                onClick={handleSubmit}
              >
                Xác nhận
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}
