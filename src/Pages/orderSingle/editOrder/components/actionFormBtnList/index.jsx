import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import {SuccessfulEditOrder} from '../successfulOrderModal'
import {useState} from 'react'
import {Loading} from '../../../../../common/loading'
import useEditOrderSingle from "../../../hooks/useEditOrderSingle";
import toast from "../../../../../Component/Toast";
import {useNavigate} from "react-router-dom";

export const ActionFormEditBtnList = ({...props}) => {
  const navigate = useNavigate()
  const {functions, loading, shippingInfo, productInfo, form, shippingStatus, properties} = useEditOrderSingle()
  const [dataOrder, setDataOrder] = useState()

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const editOrder = opt => {
    if(debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)

      const response = functions.onSubmit(opt)
      response.then(res => {
        if(res?.data?.success) {
          toast.success("Cập nhật thông tin giao hàng thành công")
          navigate('/orders')
        } else {
          setDataOrder({
            ...res.data,
            ...opt,
            isStorePickUp: shippingInfo.isStorePickUp,
          })
        }
      })
    }
  }

  return (
    <>
      {shippingStatus.value === '21' && (
        <>
          {dataOrder && <SuccessfulEditOrder data={dataOrder} />}
          <StyledActionFormBtnList {...props}>
            <Button appearance="ghost" href="/orders">
              Hủy
            </Button>
            {!(productInfo.inventory && shippingInfo.isStorePickUp) && (
              <Button
                appearance="ghost"
                style={{minWidth: 107, marginLeft: 12}}
                disabled={!properties.canSaveDraft}
                onClick={() => properties.canSaveDraft && editOrder({is_draft: 1})}
              >
                Lưu nháp
              </Button>
            )}
            <Button
              style={{minWidth: 168, marginLeft: 12}}
              disabled={!properties.canSaveOrder}
              onClick={() =>
                properties.canSaveOrder && editOrder({is_delivery: 1})
              }
            >
              {form?.productInfo.inventory && form?.shippingInfo.isStorePickUp
                ? 'Hoàn tất đơn hàng'
                : 'Lưu và gửi giao hàng'}
            </Button>
          </StyledActionFormBtnList>
          {loading && <Loading />}
        </>
      )}
      {shippingStatus.value === '1' && (
        <>
          {dataOrder && <SuccessfulEditOrder data={dataOrder} />}
          <StyledActionFormBtnList {...props}>
            <Button appearance="ghost" href="/orders">
              Hủy
            </Button>
            <Button
              style={{minWidth: 222, marginLeft: 12}}
              disabled={!properties.canSaveOrder}
              onClick={() =>
                properties.canSaveOrder && editOrder({is_delivery: 1})
              }
            >
              {form?.productInfo.inventory && form?.shippingInfo.isStorePickUp
                ? 'Hoàn tất đơn hàng'
                : 'Cập nhật thông tin giao hàng'}
            </Button>
          </StyledActionFormBtnList>
          {loading && <Loading />}
        </>
      )}
      {shippingStatus.value === '8' && (
        <>
          {dataOrder && <SuccessfulEditOrder data={dataOrder} />}
          <StyledActionFormBtnList {...props}>
            <Button appearance="ghost" href="/orders">
              Hủy
            </Button>
            <Button
              style={{minWidth: 168, marginLeft: 12}}
              disabled={!properties.canSaveOrder}
              onClick={() =>
                properties.canSaveOrder && editOrder({is_delivery: 1})
              }
            >
              {form?.productInfo.inventory && form?.shippingInfo.isStorePickUp
                ? 'Lưu đơn hàng'
                : 'Lưu và gửi giao hàng'}
            </Button>
          </StyledActionFormBtnList>
          {loading && <Loading />}
        </>
      )}
    </>
  )
}
