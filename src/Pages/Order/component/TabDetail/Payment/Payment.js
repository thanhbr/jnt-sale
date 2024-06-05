import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMore from '@mui/icons-material/ExpandMore'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button } from '../../../../../common/button'
import { formatMoney } from '../../../../../util/functionUtil'
import { fDateTimeSuffix } from '../../../../../util/formatTime'
import './Payment.scss'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useContext, useState } from 'react'
import { getData, sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useAlert from '../../../../../hook/useAlert'
import { OrderContext } from '../../../../../LayoutWrapper'
import { Grid, Input } from '@mui/material'
import Select from 'react-select'

export const Payment = ({ orderDetail }) => {
  const [open, setOpen] = useState(false)
  const [listPayment, setListPayment] = useState([])
  const [paramRequest, setParamRequest] = useState([])
  const handleOpen = () => {
    const getOrderDetails = async () => getData(`${config.API}/payment/payment-method`)
      .then(res => {
        let types = []
        if (res.data.success) {
          res.data.data.map((payment) => {
            types = [...types, { value: payment.id, label: payment.name }]
          })
        }
        setListPayment(types)
      })
      .catch(err => {
        console.log('error')
      })
    getOrderDetails()
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const { showAlert } = useAlert()
  const [, dispatch] = useContext(OrderContext)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '1.5rem',
  }

  const handleSubmit = async () => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/payment/${orderDetail.id}`,
      paramRequest,
    )
    if (!!response?.data?.success) {
      showAlert({ content: 'Hủy giao hàng thành công', type: 'success' })
      dispatch({ type: 'SET_LOAD_DETAIL' })
    } else showAlert({ content: 'Hủy giao hàng Thất bại', type: 'danger' })
    handleClose()
  }
  return (
    <div>
      <div className="payment-container">
        <div className="flex flex-row justify-between">
          <div className="paid">
            <label className="text-base font-bold pb-3">
              Đã thanh toán:
              <span className="text-[#00AB56]">
                {formatMoney(orderDetail?.total_payment)}
              </span>
            </label>
          </div>
          <div className="pay">
            <label className="text-base font-bold pb-3">
              Còn phải trả:
              <span className="text-[#FF424E]">
                {formatMoney(
                  orderDetail?.total_amount - orderDetail?.total_payment,
                )}
              </span>
            </label>
          </div>
        </div>
        <div class="">
          {(orderDetail?.total_amount - orderDetail?.total_payment > 0) &&
            <Button className="!text-sm !text-white payment-confirm" onClick={handleOpen}>
              Xác nhận thanh toán
            </Button>}
        </div>
      </div>
      <div>
        {orderDetail.order_payments.length > 0 &&
          orderDetail.total_payment != 0 &&
          orderDetail.order_payments.map(payment => (
            <Accordion className="rounded-none border-l-[#00AB56] border-l-2 mb-3 payment_method_name">
              <AccordionSummary
                expandIcon={<img src="/svg/chevron-left.svg" alt="chevron-left" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div>
                  <label className="text-base font-bold pb-3 p-payment-success">
                    Xác nhận thanh toán {formatMoney(payment?.total_amount)}{' '}
                    thành công
                  </label>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="tab-payment">
                  <div className="w-1/6">
                    <p className="text-[#7C88A6] txt-payment">
                      Số tiền thanh toán:
                    </p>
                    <p className="text-payment-data">{formatMoney(payment?.total_amount)}</p>
                  </div>
                  <div className="w-1/6">
                    <p className="text-[#7C88A6] txt-payment">
                      Phương thức thanh toán:
                    </p>
                    <p className="text-payment-data">{payment?.payment_method_name}</p>
                  </div>
                  <div className="w-1/6">
                    <p className="text-[#7C88A6] txt-payment">
                      Nhân viên xác nhận:
                    </p>
                    <p className="text-payment-data">{payment?.fullname}</p>
                  </div>
                  <div className="w-1/6">
                    <p className="text-[#7C88A6] txt-payment">
                      Thời gian thanh toán:
                    </p>
                    <p className="text-payment-data">{fDateTimeSuffix(payment?.dt_created)}</p>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              XÁC NHẬN THANH TOÁN CHO HÓA ĐƠN {orderDetail.id}
            </Typography>
            <Grid className="container-payment-form" xs={12} sm={12} md={12} lg={12} xl={12} container>
              <Grid className="container-payment-form" xs={6} sm={6} md={6} lg={6} xl={6}>
                <p className="label-payment">Đã thanh toán</p>
                <p className="payment-Paid">{formatMoney(orderDetail?.total_payment)}</p>
              </Grid>
              <Grid className="container-payment-form" xs={6} sm={6} md={6} lg={6} xl={6}>
                <p className="label-payment">Còn phải trả</p>
                <p className="payment-unPaid">{formatMoney(orderDetail?.total_amount - orderDetail?.total_payment)}</p>
              </Grid>
              <Grid className="container-payment-form" xs={6} sm={6} md={6} lg={6} xl={6}>
                <Select placeholder="Chọn phương thức thanh toán" options={listPayment}
                  onChange={(newValue) => setParamRequest({
                    ...paramRequest,
                    payment_method_id: newValue.value
                  })} />
              </Grid>
              <Grid className="container-payment-form" xs={6} sm={6} md={6} lg={6} xl={6}>
                <input type="number" />
              </Grid>
            </Grid>
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
    </div>
  )
}
