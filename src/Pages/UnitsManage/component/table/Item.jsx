import {Text} from 'common/text'
import {Tooltip} from 'common/tooltipv2'
import CheckBoxConsignment from 'Component/CheckBoxConsignment/CheckBoxConsignment'
import {SwitchStatus} from 'Component/SwitchStatus/SwitchStatus'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import {Unit} from 'Pages/UnitsManage'
import {changeDateTime} from 'Pages/UnitsManage/changeDateTime'
import {useUnit} from 'Pages/UnitsManage/hooks/useUnit'
import {UNIT_ICON} from 'Pages/UnitsManage/icon/_icon'
import {ActionType} from 'Pages/UnitsManage/store/action'
import {ICONS} from 'Pages/UnitsManage/_icons'
import {useContext, useEffect, useRef, useState} from 'react'
import {failIcon, successIcon} from '../SuccessMessage'
import {useCheckBox} from './useCheckbox'
import './Item.scss'
import ConfirmModal from 'Pages/customer/components/ConfirmModal'
import {deleteData, getData, sendRequestAuth} from 'api/api'
import {getDeleteUnit} from 'api/url'
import useAlert from 'hook/useAlert'
import config from 'config'

const Item = ({index, item}) => {
  const {fetchList} = useUnit()
  const [isHover, setIsHover] = useState(-1)
  const {changeStatus, isActive, is_check, disable} = useCheckBox()
  const {formatTime} = changeDateTime()
  const {getDetailUnit} = useUnit()
  const {state, dispatch} = useContext(Unit)
  const {showAlert} = useAlert()

  const openDetail = id => {
    dispatch({type: ActionType.OPEN_MODAL, payload: true})
    dispatch({type: ActionType.DISABLE_SAVE, payload: false})
    getDetailUnit(id)
  }
  let check = state.isCheck

  const [isActionActive, setIsActionActive] = useState(false)
  const [isTableHover, setIsTableHover] = useState(false)
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
      setIsTableHover(true)
      dispatch({type: 'CLEAR_UNIT_STATUS'})
    }
  }, [openDetail])

  const handleDelete = e => {
    e.stopPropagation()
    dispatch({
      type: ActionType.SET_CONFIRM,
      payload: {
        ...state.confirm,
        open: true,
        title: 'Xóa đơn vị tính',
        type: 'DELETE',
        message: 'Bạn có chắc chắn muốn xoá đơn vị tính đã chọn?',
        action: deleteItem,
      },
    })
  }

  const deleteItem = async () => {
    try {
      const res = await sendRequestAuth(
        'delete',
        `${config.API}/product/unit/delete/${item.id}`,
      )
      if (res.data.success) {
        showAlert({content: 'Đã xoá đơn vị tính thành công', type: 'success', duration: 2000})
        fetchList()
      } else if (res.data?.errors) {
        showAlert({content: res.data?.errors?.message, type: 'danger', duration: 2000})
      }
    } catch (er) {
      console.log(er)
    }
  }

  const handleEdit = () => {
    dispatch({type:ActionType.OPEN_MODAL,payload:true})
    dispatch({type:ActionType.DISABLE_SAVE,payload:true})
    dispatch({type:ActionType.SET_EDIT_ID,payload:item.id})
  }

  return (
    <Tr
      key={index}
      className="table__unit-row"
      onMouseEnter={() => setIsHover(index)}
      onMouseLeave={() => setIsHover(-1)}
    >
      <Td className="table__unit-checkbox">
        <CheckBoxConsignment
          isChecked={check.includes(item.id)}
          disable={item.is_default == 1 ? true : false}
          handleClick={() => is_check(item.id)}
        />
      </Td>
      <Td className="table__unit-note">
        <Text className="tooltipv2-text">{item.unit_name}</Text>
      </Td>
      <Td className="table__unit-date">
        <Text className="table__unit-content">{item.unit_short_name}</Text>
      </Td>
      <Td className="table__unit-status">
        <SwitchStatus
          disabled={disable}
          id={item.id}
          status={
            isActive[item.id] == undefined ? item.status : isActive[item.id]
          }
          handleChange={changeStatus}
        />
      </Td>
      <Td className="table__unit-option">
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
            <div ref={wrapperRef} className="table__unit-actionPopup">
              <div className="drop-edit" onClick={handleEdit}>
                {UNIT_ICON.edit}
                <p>Chỉnh sửa</p>
              </div>
              <div className="drop-delete" onClick={handleDelete}>
                {UNIT_ICON.delete}
                <p>Xóa</p>
              </div>
            </div>
          )}
        </div>
      </Td>
    </Tr>
  )
}

export default Item
