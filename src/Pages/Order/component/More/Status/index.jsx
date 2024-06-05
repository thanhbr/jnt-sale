import React, {useContext, useEffect, useState} from 'react';
import {SCRIPT} from "../../../_script";
import {TAB_USER_PROFILE} from "../../../../../Component/Icons";
import {OrderContext} from "../../../../../LayoutWrapper";
import {getUrlShippingStatusList} from "../../../../../api/url";
import {getData} from "../../../../../api/api";

const Index = () => {
  const [state, dispatch] = useContext(OrderContext)
  const [showOption, setShowOption] = useState(false)
  const [selected, setSelected] = useState(0)
  const [checked, setChecked] = useState([])
  const statuses = state.group.status
  useEffect(() => {
    window.addEventListener('click', function (e) {
      const drp_status = document.getElementById('drp-order-status')?.contains(e.target)
      const order_employee = document.getElementById('search_order_status')?.contains(e.target)
      if(!order_employee && !drp_status) setShowOption(false)
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  const handleSearch = async () => {
    setShowOption(!showOption)
    if(!showOption && statuses?.length === 0) {
      const url = getUrlShippingStatusList()
      getData(url)
        .then((res) => {
          if(res.status === 200 && res.data.success === true) {
            dispatch({type: 'UPDATE_GROUP_FILTER', payload: {status: res.data.data}})
          }
        })
        .catch(() => {
          console.log('ERROR: UPDATE_GROUP_SHIPPING_STATUS')
        })
    }
  }
  const handleCheck = (id, name) => {
    setChecked(prevState => {
      const isChecked = checked.includes(id)
      if (isChecked) {
        setSelected(selected-1)
        return checked.filter(item => item !== id)
      } else {
        setSelected(selected+1)
        return [...prevState, id]
      }
    })
    dispatch({type: 'SET_FILTER', payload: {shipping_status: {value:checked.toString(), label: SCRIPT.STATUSES.P_STATUS, name: name}}})
  }
  return (
    <>
      <div className={'order-filter-more__status order-filter-more__general'}>
        <div className={`order-filter-more__general-select ${showOption ? 'active' : '' }`}
           id={'search_order_status'}
           onClick={handleSearch}
        >
          <p className={'order-filter-more__general-select-place'}>
            <span className={`order-placehoder ${selected !== 0 ? 'active' : ''}`}>{SCRIPT.STATUSES.P_STATUS}</span>
            {selected !== 0 ? <span>({SCRIPT.T_SELECT} {selected})</span> : ''}
          </p>
          {TAB_USER_PROFILE.arrow}
        </div>
        {showOption ? (
          <div className={'order-filter-more__general-option scroll-custom'}
               id={'drp-order-status'}  aria-labelledby="dropdownMenuButton"
          >
            {statuses?.map((status) => (
              <div className={'order-filter-more__general-group dropdown-item'}  key={status.id}>
                <input type={'checkbox'}
                       id={`order-status-${status.id}`}
                       checked={checked.includes(status.id)}
                       onChange={() => handleCheck(status.id, status.name)}
                />
                <label className={'order-filter-more__general-item'}
                       htmlFor={`order-status-${status.id}`}
                >{status.name}</label>
              </div>
            ))}
          </div>
        ) : ''}
      </div>
    </>
  );
};

export default Index;