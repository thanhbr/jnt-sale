import {postData, sendRequestAuth} from 'api/api'
import {getUrlWarehouseManagerActive} from 'api/url'
import {Switch} from '../switch'
import {Text} from 'common/text'
import {SwitchStatus} from 'Component/SwitchStatus/SwitchStatus'
import config from 'config'
import useAlert from 'hook/useAlert'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import {WarehouseManager} from 'Pages/WarehouseManagement'
import {useContext, useEffect, useRef, useState} from 'react'
import {useWarehouse} from '../../hooks/useUnit'
import {WAREHOUSEMANAGER_ICON} from '../../icon/_icon'
import {ActionType} from '../../store/action'
import {ICONS} from '../../_icons'
import './Item.scss'
import toast from 'Component/Toast'
import {Tooltip} from 'common/tooltipv2'

const Item = ({index, item}) => {
  const {fetchList} = useWarehouse()
  const {getDetailWarehouseManager} = useWarehouse()
  const {state, dispatch} = useContext(WarehouseManager)
  const {showAlert} = useAlert()

  const openDetail = id => {
    dispatch({type: ActionType.OPEN_MODAL, payload: true})
    dispatch({type: ActionType.DISABLE_SAVE, payload: false})
    getDetailWarehouseManager(id)
  }

  const [isActionActive, setIsActionActive] = useState(false)
  const [over, setOver] = useState(false)

  const wrapperRef = useRef(null)
  const wrapperRef2 = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !wrapperRef2.current.contains(event.target)
      ) {
        setIsActionActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    if (openDetail) {
      dispatch({type: 'CLEAR_WAREHOUSEMANAGER_STATUS'})
    }
  }, [openDetail])

  const handleDelete = e => {
    setIsActionActive(prev => !prev)
    e.stopPropagation()
    dispatch({
      type: ActionType.SET_CONFIRM,
      payload: {
        ...state.confirm,
        open: true,
        title: 'Xóa kho',
        type: 'danger',
        confirmButtonName: 'Xóa',
        message:
          'Kho bị xoá đi sẽ không thể khôi phục. Bạn có chắc chắn muốn xoá kho đã chọn?',
        action: deleteItem,
      },
    })
  }
  const deleteItem = async () => {
    dispatch({type: ActionType.IS_LOADING, payload: false})
    try {
      const res = await sendRequestAuth(
        'delete',
        `${config.API}/warehouse/delete/${item.id}`,
      )
      if (res.data.success) {
        showAlert({content: 'Đã xóa kho thành công', type: 'success'})
        fetchList()
      } else if (res.data?.errors) {
        dispatch({type: ActionType.IS_LOADING, payload: true})
        showAlert({content: res.data?.errors?.message, type: 'danger'})
      }
    } catch (er) {
      console.log(er)
    }
  }

  const handleEdit = () => {
    dispatch({type: ActionType.SET_EDIT_ITEM_ID, payload: item.id})
    getDetailWarehouseManager(item.id)
  }

  const handleChangeStatus = value => {
    if (item.status === '1')
      dispatch({
        type: ActionType.SET_CONFIRM,
        payload: {
          ...state.confirm,
          open: true,
          title: 'Ngưng sử dụng kho',
          type: 'info',
          confirmButtonName: 'Xác nhận',
          message:
            'Kho bị ngưng sử dụng sẽ không thể được chọn để lưu trữ hàng hoá hay xuất hàng bán nữa. Bạn có chắc chắn muốn ngưng sử dụng kho đã chọn?',
          action: () => updateStatus(false),
        },
      })
    else updateStatus(true)
  }

  const updateStatus = async value => {
    try {
      const res = await postData(getUrlWarehouseManagerActive(), {
        id: [item.id],
        status: value ? 1 : 0,
      })
      fetchList()
      toast.success({title: res.data?.message})
    } catch (er) {
      showAlert({type: 'danger', content: er.message})
      console.log(er)
    }
    dispatch({type: ActionType.IS_LOADING, payload: true})
  }

  return (
    <Tr key={index} className="table__warehouse-manager-row">
      <Td className="table__warehouse-manager-name">
        <div>
          <Tooltip
            className={'tooltipv2-warehouse-name'}
            placement="top"
            title={item.warehouse_name}
            baseOn="width"
          >
            <Text className="tooltipv2-text">{item.warehouse_name}</Text>{' '}
          </Tooltip>
          {item?.is_main === '1' && (
            <div className="table__warehouse-manager-default">
              {WAREHOUSEMANAGER_ICON.buildings} <span>Kho mặc định</span>
            </div>
          )}
        </div>
      </Td>
      <Td className="table__warehouse-manager-address">
        <Tooltip
          className={'tooltipv2-warehouse-address'}
          placement="top"
          title={item.warehouse_address}
          baseOn="height"
        >
          {' '}
          <Text className="tooltipv2-text">{item.warehouse_address}</Text>
        </Tooltip>
      </Td>
      <Td className="table__warehouse-manager-general">
        <Text className="tooltipv2-text">{item.city_name}</Text>
      </Td>
      <Td className="table__warehouse-manager-general">
        <Text className="tooltipv2-text">{item.district_name}</Text>
      </Td>
      <Td className="table__warehouse-manager-general">
        <Text className="tooltipv2-text">{item.ward_name}</Text>
      </Td>
      <Td className="table__warehouse-manager-iswarehouse">
        <Text className="table__warehouse-manager-content">
          {item.is_purchase === '1' ? 'Có' : 'Không'}
        </Text>
      </Td>
      <Td className="table__warehouse-manager-status">
        {item.is_main !== '1' && (
          <Switch checked={item.status === '1'} onChange={handleChangeStatus} />
        )}
      </Td>
      <Td className="table__warehouse-manager-option">
        <div
          ref={wrapperRef2}
          className="table_icon"
          onClick={e => {
            setIsActionActive(prev => !prev)
            e.stopPropagation()
          }}
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
        >
          {over || isActionActive
            ? ICONS.manipulation_hover
            : ICONS.manipulation}

          {isActionActive && (
            <div
              ref={wrapperRef}
              className="table__warehouse-manager-actionPopup"
            >
              <div className="drop-edit" onClick={handleEdit}>
                {WAREHOUSEMANAGER_ICON.edit}
                <p>Chỉnh sửa</p>
              </div>

              {item?.is_main !== '1' && (
                <div className="drop-delete" onClick={handleDelete}>
                  {WAREHOUSEMANAGER_ICON.delete}
                  <p>Xóa</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Td>
    </Tr>
  )
}

export default Item
