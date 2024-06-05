import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Input} from 'common/form/input'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useEffect} from 'react'
import {useState} from 'react'
import {StyledCreatePaymentMethodDrawer} from './_styled'
import { Loading } from 'common/loading'
import { OrderContext } from 'Pages/refactorOrder/provider/_context'

const initQueries = {
  name: '',
  is_active: '0',
  status: 1,
}

export const CreatePaymentMethodDrawer = ({
  exit,
  loading,
  onClose,
  onExitToggle,
  onLoadingToggle,
  onModified,
  onRefetch,
  ...props
}) => {
  const {showAlert} = useAlert()

  const [name, setName] = useState('')
  const [shouldSetDefault, setShouldSetDefault] = useState(false)

  const [validate, setValidate] = useState({name: ''})
  const {pageDispatch} = useContext(OrderContext)

  const queries = {
    name,
    is_active: shouldSetDefault ? '1' : '0',
    status: 1,
  }

  const handleSubmit = async () => {

    if (onLoadingToggle) onLoadingToggle(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/payment/create`,
      JSON.stringify(queries),
    )

    if (response?.data?.success) {
      if (onRefetch) onRefetch()
      showAlert({
        type: 'success',
        content: 'Thêm mới phương thức thanh toán thành công',
      })
      if (onLoadingToggle) onLoadingToggle(false)
      if (onClose) onClose()

      const paymentMethod = {
        data: queries,
        name: name,
        value: response?.data?.meta?.insert_id
      }
      pageDispatch({
        type: 'PAYMENT_METHOD_UPDATE',
        payload: {value: paymentMethod},
      })
    } else {
      showAlert({
        type: 'danger',
        content: 'Thêm mới phương thức thanh toán thất bại',
      })
      if (onLoadingToggle) onLoadingToggle(false)
    }
  }

  const handleValidate = () => {
    let check = true
    let currentValidate = {...validate}

    if (!name || !name.trim()) {
      currentValidate = {
        ...currentValidate,
        name: 'Tên phương thức thanh toán không được để trống',
      }
      check = false
    }

    setValidate({...currentValidate})

    if (check) handleSubmit()
  }

  useEffect(() => {
    if (onModified)
      onModified(JSON.stringify(queries) !== JSON.stringify(initQueries))
  }, [queries])

  return (
    <StyledCreatePaymentMethodDrawer
      {...props}
      className={`common-scrollbar ${props?.className || ''}`}
    >
      <div className="create-payment-method-drawer__header">
        <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 5}}>
          Thông tin phương thức thanh toán
        </Text>
        <Text as="p" fontSize={15} lineHeight={21}>
          “Sử dụng khi bạn thực hiện thanh toán mua/bán hàng”
        </Text>
      </div>
      <div className="create-payment-method-drawer__body">
        <div className="create-payment-method-drawer__input-group">
          <div
            className="create-payment-method-drawer__input-item"
            data-size="lg"
          >
            <NameInput
              validateText={validate?.name}
              validateType="danger"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setValidate({...validate, name: ''})}
            />
          </div>
        </div>
        <div className="create-payment-method-drawer__option-list">
          <div className="create-payment-method-drawer__option-item">
            <Checkbox
              checked={shouldSetDefault}
              style={{margin: '1px 10px 0 0'}}
              onClick={() => setShouldSetDefault(!shouldSetDefault)}
            />
            <Text
              color="#191D32"
              style={{cursor: 'pointer'}}
              onClick={() => setShouldSetDefault(!shouldSetDefault)}
            >
              Là phương thức thanh toán mặc định
            </Text>
          </div>
        </div>
        <div className="create-payment-method-drawer__toggle-list">
          <div className="create-payment-method-drawer__toggle-item">
            <Switch defaultChecked={true} disabled style={{marginRight: 8}} />
            <Text color="#191D32" style={{cursor: 'no-drop'}}>
              Kích hoạt/Ngưng sử dụng
            </Text>
          </div>
        </div>
      </div>
      <div className="create-payment-method-drawer__footer">
        <Button
          appearance="ghost"
          style={{minWidth: 74}}
          onClick={() => onExitToggle(true)}
        >
          Hủy
        </Button>

        <Button
          style={{minWidth: 110, marginLeft: 12}}
          onClick={handleValidate}
        >
          Lưu
        </Button>
      </div>
      {exit && (
        <ConfirmModal
          onClose={() => onExitToggle && onExitToggle(false)}
          onSubmit={() => {
            if (onExitToggle) onExitToggle(false)
            if (onClose) onClose()
          }}
        />
      )}
      {loading && (
        <Loading />
      )}
    </StyledCreatePaymentMethodDrawer>
  )
}

const NameInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Tên phương thức thanh toán{' '}
            <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập tên phương thức thanh toán'}
    />
  )
}

const ConfirmModal = ({onClose, onSubmit, ...props}) => {
  return (
    <Modal
      {...props}
      actions={
        props?.actions || [
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            Hủy
          </Button>,
          <Button
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={onSubmit}
          >
            Xác nhận
          </Button>,
        ]
      }
      title={props?.title || 'Xác nhận rời khỏi trang'}
      width={props?.width || 480}
    >
      <Text>
        Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi
        thay đổi chưa được lưu?
      </Text>
    </Modal>
  )
}

const LoadingModal = ({...props}) => {
  return (
    <Modal
      {...props}
      title={props?.title || 'Tạo mới phương thức thanh toán'}
      width={props?.width || 480}
    >
      <Spinner size={54} thickness={5} />
      <Text style={{marginTop: 24, textAlign: 'center'}}>Loading ...</Text>
    </Modal>
  )
}
