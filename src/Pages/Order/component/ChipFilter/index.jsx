import React, { useContext } from 'react'
import './index.scss'
import { ORDER_PAGE } from '../../../../Component/Icons/index'
import { fDateTimeSuffix } from '../../../../util/formatTime'
import { OrderContext } from '../../../../LayoutWrapper'

const Index = () => {
  const [state, dispatch] = useContext(OrderContext)
  const filter = state.chipFilter
  let keyFilter = Object.keys(filter)
  const removeFilter = (obj) => {
    filter[obj].value = ""
    filter[obj].name = ""
    filter[obj].label = ""
    dispatch({type: "SET_FILTER", payload: filter})
    dispatch({type: "SET_CHIP_FILTER"})
    dispatch({type: "SET_APPLY_SEARCH"})
    dispatch({type: 'SET_LOADING', payload: true})
    dispatch({ type: 'SET_LOAD_DETAIL' })
    dispatch({type: 'SET_LOADING_PANEL', payload: true})
  }
  return (
    <>
      <div className={'order-filter__grp-chip'}>
        {keyFilter.map((fill, index) => {

          if(fill === 'end_date'){
            return ''
          }
          if(fill === 'start_date'){
            return (
              <div className={'order-filter__chips'} key={index}>
                <p
                  className={'order-filter__chip'}>{`${state.filter.date_type.label}: ${fDateTimeSuffix(filter[fill].value)} - ${fDateTimeSuffix(filter.end_date.value)}`} </p>
                <span>{ORDER_PAGE.cancel}</span>
              </div>
            )
          }else
            return (
              filter[fill].value &&
              <div className={'order-filter__chips'} key={index}>
                <p
                  className={'order-filter__chip'}>{`${filter[fill].label}: ${filter[fill].name}`} </p>
                <span onClick={()=> removeFilter(fill)}>{ORDER_PAGE.cancel}</span>
              </div>
            )
        })}
      </div>
    </>
  )
}

export default Index