import { PageHeader } from 'layouts/pageHeader'
import { WarehouseManager } from 'Pages/WarehouseManagement'
import { breadCrumbList, warehouseManager_button } from 'Pages/WarehouseManagement/interFace'
import React, { useContext } from 'react'

const Header = () => {
  const {state, dispatch} = useContext(WarehouseManager)
  const {WAREHOUSEMANAGER_ACTION_BUTTON} = warehouseManager_button(state, dispatch)
  return (
    <PageHeader
      actions={WAREHOUSEMANAGER_ACTION_BUTTON}
      breadcrumbLinks={breadCrumbList}
      breadcrumbTitle="Quản lý danh sách kho"
    />
  )
}

export default Header