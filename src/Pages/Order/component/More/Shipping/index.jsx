import React, {useContext, useEffect, useState} from 'react';
import {SCRIPT} from "../../../_script";
import {TAB_USER_PROFILE} from "../../../../../Component/Icons";
import {getUrlShippingList} from "../../../../../api/url";
import {getData} from "../../../../../api/api";
import {OrderContext} from "../../../../../LayoutWrapper";

const Index = () => {
  const [state, dispatch] = useContext(OrderContext)
  const [showOption, setShowOption] = useState(false)
  const [selected, setSelected] = useState(SCRIPT.SHIPPING.P_SHIPPING)
  const shippings = state.group.shipping

  useEffect(() => {
    window.addEventListener('click', function (e) {
      const order_shipping = document.getElementById('search_order_shipping')?.contains(e.target)
      if(!order_shipping) setShowOption(false)
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  const handleSearch = async () => {
    setShowOption(!showOption)
    if(!showOption && shippings?.length === 0) {
      const url = getUrlShippingList()
      getData(url)
        .then((res) => {
          if(res.status === 200 && res.data.success === true) {
            dispatch({type: 'UPDATE_GROUP_FILTER', payload:{shipping: res.data.data}})
          }
        })
        .catch(() => {
          console.log('ERROR: UPDATE_GROUP_SHIPPING')
        })
    }
  }
  return (
    <>
      <div className={'order-filter-more__shipping order-filter-more__general'}>
        <p className={`order-filter-more__general-select ${showOption ? 'active' : ''}`}
           id={'search_order_shipping'}
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
                dispatch({type: 'SET_FILTER', payload: {shipping_partner: {value:'', label: SCRIPT.SHIPPING.P_SHIPPING, name: SCRIPT.ALL}}})
              }}
            >{SCRIPT.ALL}</p>
            {shippings?.map((shipping) => (
              <p key={shipping.id} onClick={() => {
                setSelected(shipping.name)
                dispatch({type: 'SET_FILTER', payload: {shipping_partner: {value:shipping.id, label: SCRIPT.SHIPPING.P_SHIPPING, name: shipping.name}}})
              }}>{shipping.name}</p>
            ))}
          </div>) : ''}
      </div>
    </>
  );
};

export default Index;