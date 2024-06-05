import {TableCell, TableRow} from '@material-ui/core'
import React, { useRef, useState} from 'react'
import './row.scss'
import {Switch} from '../../../../common/switch'
import useClickOutside from '../../hooks/useClickOutside'
import OrderOriginModal from '../modals/OrderOriginModal'
import useOrderOrigin from '../../hooks/useOrderOrigin'
import {ICONS} from "../../interfaces/_icons";
import {Text} from "../../../../common/text";
import {Tooltip} from "../../../../common/tooltipv2";
import {SwitchStatus} from "../../../../Component/SwitchStatus/SwitchStatus";
import CheckBoxConsignment from "../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import ConfirmDeleteModal from "../modals/confirmDeleteModal";

export const Row = ({
  dataRow,
  fetchData,
  handleSelected, isCheck,handleClick,isActive,handleChange,disable,handleMinus
}) => {
  const {openDetail, hoverOff} = dataRow
  const [isActionActive, setIsActionActive] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const closeModal =  () => setShowModal(false);
  const [confirm, setConfirm] = useState({
    active: false,
    value: -1,
    isAccept: false,
    title: '',
    message: '',
    btnAccept: 'Accept',
    btnCancel: 'Cancel',
    handleConfirm: () => {},
  })
  const {functions} = useOrderOrigin()

  const handleDelete = e => {
    setConfirm({
      ...confirm,
      active: true,
      title: 'Xóa nguồn đơn hàng',
      content:'Nguồn đơn hàng sau khi xoá sẽ không thể khôi phục. Lưu ý, với các nguồn đơn hàng đã có sử dụng trong thông tin đơn hàng thì sau khi xoá xong, trường này sẽ bị trống nên hãy kiểm tra lại trước khi xoá.' ,
      content_2: 'Bạn vẫn chắn chắn muốn xoá nguồn đơn hàng đã chọn?',
      btnCancel: 'Hủy',
      btnAccept: 'Xóa',
      acceptStyle: 'delete',
      handleConfirm: async () => {
        await functions.changeDeleteOrderOrigin(dataRow.id)
        fetchData()
        handleMinus(dataRow.id)
      },
    })
  }

  const changeStatus = async status => {
    await functions.changeOrderOriginStatus({
      id: [dataRow.id],
      status: status,
      nb_order: dataRow.nb_order,
      name: dataRow.name,
    })
  }

  const handleChangeStatus = async event => {
    if (dataRow.status == '1'){
      await changeStatus('0')
    } else {
      await changeStatus('1')
    }
    functions.fetchData()
  }


  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => {
    setIsActionActive(false)
  })
 

  return (
    <>
      <TableRow
        className={`table_body_origin${openDetail ? ' active' : ''}`}
      >
        <TableCell align="center" className={dataRow?.is_default == 1? "table_checkbox table_disable":"table_checkbox"}>
          <CheckBoxConsignment
              handleClick={(e) => handleClick(e,dataRow?.id)}
              isChecked={dataRow?.is_default == 1?false:isCheck.includes(dataRow?.id)}
              disable={dataRow?.is_default == 1?true:false}
          />
        </TableCell>
        <TableCell align="left" className="customer-code-rows">
          <Tooltip className = {'customer-code-rows_tooltip'} title={dataRow?.name} baseOn={'width'} placement={'top'}>
            <Text>{dataRow?.name}</Text>
          </Tooltip>
        </TableCell>
        <TableCell
          align="left"
          className="customer-address-rows"
        >
         <span>{dataRow.nb_order}</span>
        </TableCell>
        <TableCell
          align="center"
          className="customer-status-rows"
        >
          {dataRow?.is_default!=='1' ?
              <div className="customer-switch">
                <SwitchStatus
                    status={isActive[dataRow?.id] == undefined ? dataRow?.status : isActive[dataRow?.id]}
                    handleChange={(e)=>handleChange(e,dataRow?.id)}
                    disabled={disable}
                />
              </div>
              : ''
          }
        </TableCell>
        <TableCell
          align="right"
          className="table_setting"
        >
          {dataRow?.is_default!=='1' ?
            <div
            className="setting"
            >

            <div className="settingHide">
            <div
            className="table_icon"
            onClick={e => {
            setIsActionActive(prev => !prev)
            e.stopPropagation()
          }}
            >
            {ICONS.dots}
            </div>
            {isActionActive && (
                <div ref={wrapperRef} className="action-popup">
                  <div className="drop-edit" onClick={() => {setShowModal(true);  setIsActionActive(false)}}>
                    {ICONS.edit}
                    <p>Chỉnh sửa</p>
                  </div>
                  {dataRow?.is_default!=='1' ?
                      <div className="drop-delete" onClick={() => {handleDelete();setIsActionActive(false)}} >
                        {ICONS.delete}
                        <p>Xóa</p>
                      </div>
                      : ''
                  }
                </div>
            )}
            </div>
            </div>
              :''
          }

        </TableCell>
      </TableRow>
      
      {showModal ? <OrderOriginModal show={showModal} closeModal={closeModal} dataRow={dataRow} />  : ''}
      <ConfirmDeleteModal confirm={confirm} setConfirm={setConfirm} />
    </>
  )
}
