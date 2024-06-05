import React, {useContext, useEffect, useState} from 'react';
import {SCRIPT} from "../../../_script";
import {TAB_USER_PROFILE} from "../../../../../Component/Icons";
import {OrderContext} from "../../../../../LayoutWrapper";
import {getUrlDetailsListAll} from "../../../../../api/url";
import {getData} from "../../../../../api/api";
import InputTag from "./InputTag/index"
import './index.scss'
import {ORDER_PAGE} from "../../../../../Component/Icons";

const Index = () => {
  const [state, dispatch] = useContext(OrderContext)
  const [showOption, setShowOption] = useState(false)
  const [checked, setChecked] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const products = state.group.product
  useEffect(() => {
    window.addEventListener('click', function (e) {
      const drp_product = document.getElementById('drp-order-product')?.contains(e.target)
      const order_product = document.getElementById('search_order_product')?.contains(e.target)
      const order_product_more = document.getElementById('order_product_more')?.contains(e.target)
      if(!order_product && !drp_product && !order_product_more) {
        setShowDetail(false)
        setShowOption(false)
      }
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  const handleSearch = async () => {
    setShowOption(!showOption)
    if(!showOption && products?.length === 0) {
      const url = getUrlDetailsListAll()
      getData(url)
        .then((res) => {
          if(res.status === 200 && res.data.success === true) {
            dispatch({type: 'UPDATE_GROUP_FILTER', payload:{product: res.data.data}})
          }
        })
        .catch(() => {
          console.log('ERROR: UPDATE_GROUP_PRODUCT')
        })
    }
  }
  const handleSearchProduct = async (e) => {
    setTimeout(() => {
      const url = getUrlDetailsListAll(e.target.value)
      getData(url)
      .then((res) => {
        if(res.status === 200 && res.data.success === true) {
          dispatch({type: 'UPDATE_GROUP_FILTER', payload:{product: res.data.data}})
        }
      })
        .catch(() => {
          console.log('ERROR: UPDATE_GROUP_PRODUCT')
        })
    }, 500)
  }
  const handleCheck = (id, name) => {
    setChecked(prevState => {
      const isChecked = checked.find(item => item.id === id)
      if (isChecked) {
        dispatch({type: 'SET_FILTER', payload: {product_id: {value:checked.filter(item => item.id !== id).map((item) => item.id).toString(), label: SCRIPT.T_PRODUCT, name: name}}})
        return checked.filter(item => item.id !== id)
      } else {
        dispatch({type: 'SET_FILTER', payload: {product_id: {value:checked.map((item) => item.id).toString(), label: SCRIPT.T_PRODUCT, name: name}}})
        return [...prevState, {
          id: id,
          name: name
        }]
      }
    })
  }

  const onDismiss = (child) => {
    setShowOption(true)
    setShowDetail(true)
    setChecked(() => {
        return checked.filter(item => item.id !== child)
    })
  }


  return (
    <>
      <div className={'order-filter-more__product order-filter-more__general'}>
        <div className={`order-filter-more__general-select or_product ${showOption ? 'active':''}`}
           id={'search_order_product'}
        >
          <div className={'order-filter-product__group-select-custom'}>
            <div className={'select-custom__input-container'}>
              <input className={'order-filter-product__input'}
                     placeholder={SCRIPT.T_PRODUCT}
                     onChange={handleSearchProduct}
                     onClick={handleSearch}
              />
            </div>
          </div>
          <div className={'order-filter-more__general-toggle'}>
            {TAB_USER_PROFILE.arrow}
          </div>
        </div>
        {showOption ? (
          <>
            <div className={'order-filter-more__general-option scroll-custom'}
                 id={'drp-order-product'}  aria-labelledby="dropdownMenuButton">
              {products?.map((product) => (
                <div key={product.id} className={'order-filter-more__general-option-item'}>
                  <label htmlFor={`order_product_${product.id}`}
                         onClick={() => {handleCheck(product.id, product.product_name)}}>
                    <span>{product.product_name}</span>
                    <span>SKU: {product.sku}</span>
                  </label>
                </div>
              ))}
            </div>
            {checked.length > 0 ? (
              <>
                <div className={'order-filter-more__general-option-active'}
                     id={'order_product_more'}
                     onClick={() => setShowDetail(true)}
                >
                  <span>Đã chọn {checked.length > 0 ? checked.length : 1} sản phẩm</span>
                  <span>{ORDER_PAGE.chevron_right}</span>
                </div>
                {showDetail ? <InputTag products={checked} dismiss={onDismiss}/> : ''}
              </>
              ) : '' }
          </>) : ''}
      </div>
    </>
  );
};

export default  Index;