import React, {useContext, useEffect, useState} from 'react';
import {SCRIPT} from "../../../_script";
import {TAB_USER_PROFILE} from "../../../../../Component/Icons";
import {getUrlWareHousesList} from "../../../../../api/url";
import {getData} from "../../../../../api/api";
import {OrderContext} from "../../../../../LayoutWrapper";

const Index = () => {
  const [state, dispatch] = useContext(OrderContext)
  const [showOption, setShowOption] = useState(false)
  const [selected, setSelected] = useState(SCRIPT.WAREHOUSE)
  const warehouses = state.group.warehouse
  useEffect(() => {
    window.addEventListener('click', function (e) {
      const order_warehouse = document.getElementById('search_order_warehouse')?.contains(e.target)
      if(!order_warehouse) setShowOption(false)
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  const handleSearch = async () => {
    setShowOption(!showOption)
    if(!showOption && warehouses?.length === 0) {
      const url = getUrlWareHousesList()
      getData(url)
        .then((res) => {
          if(res.status === 200 && res.data.success === true) {
            dispatch({type: 'UPDATE_GROUP_FILTER', payload:{warehouse: res.data.data}})
          }
        })
        .catch(() => {
          console.log('ERROR: UPDATE_GROUP_WAREHOUSE')
        })
    }
  }
  return (
    <>
      <div className={'order-filter-more__warehouse order-filter-more__general'}>
        <p className={`order-filter-more__general-select ${showOption ? 'active' : ''}`}
           id={'search_order_warehouse'}
           onClick={handleSearch}
        >
          {selected}
          {TAB_USER_PROFILE.arrow}
        </p>
        {showOption ? (
          <div className={'order-filter-more__general-option scroll-custom'}>
            <p
              onClick={() => {
                setSelected(SCRIPT.ALL)
                dispatch({type: 'SET_FILTER', payload: {warehouse_id: {value:'', label: SCRIPT.WAREHOUSE, name: SCRIPT.ALL}}})
              }}
            >{SCRIPT.ALL}</p>
            {warehouses?.map((warehouse) => (
              <p key={warehouse.id} onClick={() => {
                setSelected(warehouse.warehouse_name)
                dispatch({type: 'SET_FILTER', payload: {warehouse_id: {value:warehouse.id, label: SCRIPT.WAREHOUSE, name: warehouse.warehouse_name}}})
              }}>{warehouse.warehouse_name}</p>
            ))}
          </div>
        ) : ''}
      </div>
    </>
  );
};

export default Index;