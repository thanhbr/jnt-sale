import * as React from 'react'
import {ORDER_PAGE} from '../../../../Component/Icons'
import {SCRIPT} from '../../_script'
import './index.scss'
import {useContext} from "react";
import {OrderContext} from "../../../../LayoutWrapper";
import { replaceAllCustom } from '../../../../util/functionUtil'

const Filter = () => {
  const [, dispatch] = useContext(OrderContext)
  const handleChange = e => {
    e.target.value = replaceAllCustom(e.target.value,' ', ',')
    setTimeout(() => {
      const keyword = e.target.value
      dispatch({ type: 'SET_FILTER', payload:{keyword:{value:keyword, label: SCRIPT.T_KEYWORD, name:keyword}} })
      dispatch({ type: 'SET_LOAD_DETAIL' })
      dispatch({type: 'SET_CHIP_FILTER'})
    }, 500)
  }
  return (
    <>
      <div className={'order-filter__search'}>
        <input className={'order-filter__search-input'}
               autoComplete={'off'}
               placeholder={SCRIPT.PL_SEARCH}
               onChange={handleChange}
        />
        {ORDER_PAGE.search}
      </div>
    </>
  )
}

export default Filter;