import React, {useContext, useEffect, useState} from 'react';
import {SCRIPT} from "../../../_script";
import {TAB_USER_PROFILE} from "../../../../../Component/Icons";
import {getData} from "../../../../../api/api";
import {getUrlOriginsList} from "../../../../../api/url";
import {OrderContext} from "../../../../../LayoutWrapper";

const Index = () => {
  const [state, dispatch] = useContext(OrderContext)
  const [showOption, setShowOption] = useState(false)
  const [selected, setSelected] = useState(SCRIPT.ORIGIN.TITLE)
  const origins = state.group.origin

  useEffect(() => {
    window.addEventListener('click', function (e) {
      const order_origin = document.getElementById('search_order_origin')?.contains(e.target)
      if(!order_origin) setShowOption(false)
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  const handleSearch = async () => {
    setShowOption(!showOption)
    if(!showOption && origins?.length === 0) {
      const url = getUrlOriginsList()
      getData(url)
        .then((res) => {
          if(res.status === 200 && res.data.success === true) {
            dispatch({type: 'UPDATE_GROUP_FILTER', payload: {origin:res.data.data}})
          }
        })
        .catch(() => {
          console.log('ERROR: UPDATE_GROUP_ORIGIN')
        })
    }
  }

  return (
    <>
      <div className={'order-filter-more__origin order-filter-more__general'}>
        <p className={`order-filter-more__general-select ${showOption ? 'active' : ''}`}
           id={'search_order_origin'}
           onClick={handleSearch}
        >
          {selected}
          {TAB_USER_PROFILE.arrow}
        </p>
        {showOption ? (
          <div className={'order-filter-more__general-option scroll-custom'}>
            {origins?.map((origin) => (
              <p key={origin.id} onClick={() => {
                setSelected(origin.name)
                dispatch({type: 'SET_FILTER', payload: {order_origin_id: {value:origin.id, label: SCRIPT.ORIGIN.TITLE, name: origin.name}}})
              }}>{origin.name}</p>
            ))}
          </div>
        ) : ''}
      </div>
    </>
  );
};

export default Index;