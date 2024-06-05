import {TableCell, TableRow} from '@material-ui/core'
import React, { useRef, useState} from 'react'
import './row.scss'
import {Switch} from '../../../../common/switch'
import useClickOutside from '../../hooks/useClickOutside'
import GroupCustomerModal from '../modals/GroupCustomerModal'
import useGroupCustomer from '../../hooks/useGroupCustomer'
import ConfirmModal from '../modals/confirmModal'
import {ICONS} from "../../interfaces/_icons";
import useGroupCustomerContext from '../../hooks/_context'
import {Tooltip} from 'common/tooltip'
import { useTranslation } from "react-i18next";

export const Row = ({
  dataRow,
  fetchData,
  handleSelected
}) => {
  const [state, dispatch]= useGroupCustomerContext();
  const {openDetail, hoverOff} = dataRow
  const [isTableHover, setIsTableHover] = useState(false)
  const [isActionActive, setIsActionActive] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const closeModal =  () => setShowModal(false);
  const { t } = useTranslation();
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
  const {functions} = useGroupCustomer()

  const handleDelete = e => {
    setConfirm({
      ...confirm,
      active: true,
      title: t("delete_customer_group"),
      content: t("warning_delete_customer_group"),
      btnCancel: t("general_cancel"),
      btnAccept: t("general_remove"),
      acceptStyle: 'delete',
      handleConfirm: async () => {
        await functions.changeDeleteGroupCustomer(dataRow.id)
        fetchData()
      },
    })
  }

  const changeStatus = async status => {
    await functions.changeGroupCustomerStatus({
      id: [dataRow.id],
      status: status,
    })
  }

  const handleChangeStatus = async event => { 
    if (dataRow.status == '1'){
      await changeStatus('2')
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
        className={`table_body_customer${openDetail ? ' active' : ''}`}
      >
        <TableCell align="center" className="table_checkbox">
        <input
            type={'checkbox'}
            checked={dataRow.checked}
            onChange={e => {
              handleSelected(e)
            }}
          />
        </TableCell>
        <TableCell align="left" className="customer-code-rows">
          <span>{dataRow.code.length <= 24 ? dataRow.code
                              : 
                              <Tooltip
                                        placement="bottom-start"
                                        title={dataRow.code}
                                      >
                                        {dataRow.code.substring(0, 25)+' ...'}
                                      </Tooltip>}</span>
        </TableCell>
        <TableCell
          align="left"
          className="customer-address-rows"
        >
         <span>{dataRow.name}</span>
        </TableCell>
        <TableCell
          align="center"
          className="customer-status-rows"
        >
          <div className="customer-switch">
            <Switch
              defaultChecked={dataRow.status == '1' ? true : false} key={dataRow.status}
              onChange={handleChangeStatus}
            />
          </div>
        </TableCell>
        <TableCell
          align="right"
          className="table_setting"
        >
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
                    <p>{t("edit")}</p>
                  </div>
                  <div className="drop-delete" onClick={() => {handleDelete();setIsActionActive(false)}} >
                  {ICONS.delete}
                    <p>{t("general_remove")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TableCell>
      </TableRow>
      
      {showModal ? <GroupCustomerModal show={showModal} closeModal={closeModal} dataRow={dataRow} />  : ''}
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
    </>
  )
}
