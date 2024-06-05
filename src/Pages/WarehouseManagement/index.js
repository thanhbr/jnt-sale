import React, {createContext, useReducer} from 'react'
import './index.scss'
import {initial} from './store//initial'
import reducer from './store/reducer'
import TableWarehouseManagement from './component/table/TableWarehouseManagement'
import ModalUnit from './component/modal/Modal'
import ModalClose from './component/modal/Modalconfirm'
import ModalConfirm from './component/modal/ModalDelete'
import Header from './component/PageHeader'
import ModalInfo from './component/modal/ModalInfo'

export const WarehouseManager = createContext()

export default function WarehouseManagement() {
  const [state, dispatch] = useReducer(reducer, initial)

  return (
    <WarehouseManager.Provider value={{state, dispatch}}>
      <div className="warehouseManager__manage-main">
        <Header />
        <div className="warehouseManager_note-table">
          <TableWarehouseManagement />
        </div>

        {state.openModal ? <ModalUnit /> : ''}
        
        <ModalClose />
        <ModalConfirm />
        <ModalInfo />
      </div>
    </WarehouseManager.Provider>
  )
}
