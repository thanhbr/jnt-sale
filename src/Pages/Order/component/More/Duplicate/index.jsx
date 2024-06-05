import React, {useContext, useEffect, useState} from 'react';
import {SCRIPT} from "../../../_script";
import {TAB_USER_PROFILE} from "../../../../../Component/Icons";
import {OrderContext} from "../../../../../LayoutWrapper";

const Index = () => {
  const [showOption, setShowOption] = useState(false)
  const [state, dispatch] = useContext(OrderContext)
  useEffect(() => {
    window.addEventListener('click', function (e) {
      const order_duplicate = document.getElementById('search_order_duplicate')?.contains(e.target)
      if(!order_duplicate) setShowOption(false)
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  return (
    <>
      <div className={'order-filter-more__duplicate order-filter-more__general'}>
        <p className={`order-filter-more__general-select ${showOption ? 'active' : ''}`}
           id={'search_order_duplicate'}
           onClick={() => setShowOption(!showOption)}
        >
          {state.filter.is_duplicate?.name}
          {TAB_USER_PROFILE.arrow}
        </p>
        {showOption ? (
          <div className={'order-filter-more__general-option'}>
            <p onClick={() => {
              dispatch({type: 'SET_FILTER', payload: {is_duplicate: {value: '0', label: SCRIPT.T_FILTER, name: SCRIPT.FILTER.NOT_DUPLICATE}}})
            }}>
              {SCRIPT.FILTER.NOT_DUPLICATE}</p>
            <p onClick={() => {
              dispatch({type: 'SET_FILTER', payload: {is_duplicate: {value: '1', label: SCRIPT.T_FILTER, name: SCRIPT.FILTER.DUPLICATE}}})
            }}>{SCRIPT.FILTER.DUPLICATE}</p>
          </div>
        ) : ''}
      </div>
    </>
  );
};

export default Index;