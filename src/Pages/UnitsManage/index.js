import {Breadcrumb} from 'common/breadcrumb'
import React, {createContext, useEffect, useReducer} from 'react'
import './index.scss'
import {initial} from './store//initial'
import reducer from './store/reducer'
import {breadCrumbList, unit_button} from './interFace'
import ButtonHeader from './component/buttonHeader'
import Searching from './component/searching'
import TableUnits from './component/table/TableUnits'

import Paginate from './component/paginate/Paginate'
import ModalUnit from './component/modal/Modal'
import {PageHeader} from 'layouts/pageHeader'
import Modalconfirm from './component/modal/Modalconfirm'
export const Unit = createContext()
export default function UnitsManage() {
  const [state, dispatch] = useReducer(reducer, initial)
  const {UNIT_ACTION_BUTTON} = unit_button(state, dispatch)

  return (
    <Unit.Provider value={{state, dispatch}}>
      <div className="units__manage-main">
        <PageHeader
          actions={UNIT_ACTION_BUTTON}
          breadcrumbLinks={breadCrumbList}
          breadcrumbTitle="Quản lý đơn vị tính"
        />
        {state.openModal ? <ModalUnit /> : ''}
        <Modalconfirm />
        <Searching placeholder={'Tìm kiếm theo đơn vị tính/đơn vị viết tắt'} />
        <div className="unit_table">
          <TableUnits />
        </div>
      </div>
    </Unit.Provider>
  )
}
