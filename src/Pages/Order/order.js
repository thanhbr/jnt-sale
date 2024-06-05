import TabView from 'Component/Tabview/tabview'
import { useTranslation } from 'react-i18next'
import {OrderTable} from './component/table1/Table'
import Filter from "./component/Filter";
import React, { useState } from 'react'
import { OrderHeader } from './component/header'
import { OrderStore } from '../../LayoutWrapper'
import Notification from './component/TabDetail/Notification';


const Orders1 = () => {
  const { t } = useTranslation()
  const [failOrderList, setFailOrderList] = useState([])
  return (
    <OrderStore>
      <OrderHeader/>
      <Notification failList={failOrderList}/>
      <Filter />
      <OrderTable setFailOrderList={setFailOrderList}/>
    </OrderStore>
  )
}
export default Orders1
