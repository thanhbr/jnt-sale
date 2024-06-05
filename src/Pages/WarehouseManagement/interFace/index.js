import {getData} from 'api/api'
import {getListWarehouseManager, getListSearchUnit} from 'api/url'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {PATH} from '../../../const/path'
import {useWarehouse} from '../hooks/useUnit'
import {ActionType} from '../store/action'

export const breadCrumbList = [
  {id: 1, name: 'Kho', url: '#'},
  {id: 2, name: 'Danh sách kho', url: '#'},
]
export const warehouseManager_button = (state, dispatch) => {
  const {meta} = state
  const {fetchList} = useWarehouse()
  const WAREHOUSEMANAGER_ACTION_BUTTON = [
    {
      id: 0,
      children: 
        <div className="page-header__none-actions">
          <p>Cửa hàng của bạn chỉ được tạo tối đa {meta.store_limit} kho</p>
          <p className="txt-green">(Đã có: {meta.total}/{meta.store_limit} kho)</p>
        </div>
    },
    {
      id: 1,
      name: null,
      appearance: 'secondary',
      icon: ORDER_ICONS.repeat,
      onClick: () => {
        dispatch({type: ActionType.IS_LOADING, payload: false})
        fetchList()
      },
      tooltip: 'Làm mới dữ liệu',
    },
    {
      id: 2,
      name: 'Thêm mới',
      appearance: 'primary',
      icon: ORDER_ICONS.plus,
      onClick: () => {
        dispatch({type: ActionType.OPEN_MODAL, payload: !state.openModal})
        dispatch({type: ActionType.SET_EDIT_ITEM_ID, payload: ''})
      }
    },
  ]
  return {WAREHOUSEMANAGER_ACTION_BUTTON}
}

export const tableHeader = [
  {title: 'Tên kho', align: 'left', class: '-name'},
  {title: 'Địa chỉ', align: 'left', class: '-address'},
  {title: 'Tỉnh/Thành phố', align: 'center', class: '-general'},
  {title: 'Quận/Huyện', align: 'center', class: '-general'},
  {title: 'Phường/Xã', align: 'center', class: '-general'},
  {title: 'Là kho nhập hàng', align: 'center', class: '-iswarehouse'},
  {title: 'Trạng thái sử dụng', align: 'center', class: '-status'},
]
export const listDrop = [
  {value: 1, label: 'Kích hoạt'},
  {value: -1, label: 'Ngưng sử dụng'},
]
