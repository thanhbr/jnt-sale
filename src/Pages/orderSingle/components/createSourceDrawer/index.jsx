import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Modal} from 'common/modal'
import {Spinner} from 'common/spinner'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useContext, useEffect, useState} from 'react'
import {StyledCreateSourceDrawer} from './_styled'
import {Loading} from "../../../../common/loading";
import {orderSingleAction} from "../../provider/_actions";
import {OrderSingleContext} from "../../provider/_context";
import toast from "../../../../Component/Toast";

const initQueries = {name: '', nb_order: '', status: 1}

export const CreateSourceDrawer = ({
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
  const {state, dispatch} = useContext(OrderSingleContext)

  const [name, setName] = useState('')
  const [displayPosition, setDisplayPosition] = useState('')

  const [validate, setValidate] = useState({name: ''})

  const queries = {name, nb_order: displayPosition, status: 1}

  const handleSubmit = async () => {
    if (onLoadingToggle) onLoadingToggle(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/origin/create`,
      JSON.stringify(queries),
    )

    if (response?.data?.success) {
      if (onRefetch) onRefetch()
      toast.success('Thêm mới nguồn đơn hàng thành công')
      if (onLoadingToggle) onLoadingToggle(false)
      if (onClose) onClose()

      dispatch({
        type: orderSingleAction.FORM_SOURCE_UPDATE,
        payload: {value: {data: queries, name: name, value: response?.data?.meta?.insert_id}},
      })
    } else {
      toast.error('Thêm mới nguồn đơn hàng thất bại!')
      if (onLoadingToggle) onLoadingToggle(false)
    }
  }

  const handleValidate = () => {
    let check = true
    let currentValidate = {...validate}

    if (!name || !name.trim()) {
      currentValidate = {
        ...currentValidate,
        name: 'Tên điểm gửi hàng không được để trống',
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
    <StyledCreateSourceDrawer
      {...props}
      className={`common-scrollbar ${props?.className || ''}`}
    >
      <div className="create-source-drawer__header">
        <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 5}}>
          Thông tin nguồn đơn hàng
        </Text>
        <Text as="p" fontSize={15} lineHeight={21}>
          “Giúp bạn quản lý các nguồn phát sinh đơn hàng”
        </Text>
      </div>
      <div className="create-source-drawer__body">
        <div className="create-source-drawer__input-group">
          <div className="create-source-drawer__input-item" data-size="lg">
            <NameInput
              validateText={validate?.name}
              validateType="danger"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setValidate({...validate, name: ''})}
            />
          </div>
        </div>
        <div className="create-source-drawer__input-group">
          <div className="create-source-drawer__input-item" data-size="lg">
            <DisplayPositionInput
              validateText={validate?.displayPosition}
              validateType="danger"
              value={displayPosition}
              onChange={e =>
                setDisplayPosition(
                  e.target.value.toString().replace(/[^0-9]/g, ''),
                )
              }
            />
          </div>
        </div>
        <div className="create-source-drawer__toggle-list">
          <div className="create-source-drawer__toggle-item">
            <Switch defaultChecked={true} disabled style={{marginRight: 8}} />
            <Text color="#191D32" style={{cursor: 'no-drop'}}>
              Kích hoạt/Ngưng sử dụng
            </Text>
          </div>
        </div>
      </div>
      <div className="create-source-drawer__footer">
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
        // <LoadingModal className="create-source-drawer__loading-modal" />
      )}
    </StyledCreateSourceDrawer>
  )
}

const NameInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Nguồn đơn hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập tên nguồn đơn hàng'}
    />
  )
}

const DisplayPositionInput = ({...props}) => {
  return (
    <Input
      {...props}
      label={
        props?.label || (
          <>
            Vị trí hiển thị{' '}
            <Tooltip
              placement="right-end"
              title="Vị trí 0 sẽ xuất hiện đầu tiên, số càng lớn, vị trí càng thấp"
            >
              <Text as="i" color={THEME_SEMANTICS.failed}>
                {ORDER_SINGLE_ICONS.question}
              </Text>
            </Tooltip>
          </>
        )
      }
      placeholder={props?.placeholder || 'Nhập vị trí hiển thị'}
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
      title={props?.title || 'Tạo mới nguồn hàng'}
      width={props?.width || 480}
    >
      <Spinner size={54} thickness={5} />
      <Text style={{marginTop: 24, textAlign: 'center'}}>Loading ...</Text>
    </Modal>
  )
}
