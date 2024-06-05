import React, { useContext,useState ,useEffect} from 'react'
import "./index.scss"
import { CONSIGNMENT } from 'Component/Icons'
import { Delivery } from 'Pages/DeliveryNote'
import { handleSearch } from './handleSearch'
import { ActionType } from 'Pages/DeliveryNote/store/action'
import { useDelivery } from 'Pages/DeliveryNote/useDelivery/useDelivery'
import { getData, sendRequestAuth } from 'api/api'
import { getListDeliveryNote, getListSearchDeliveryNote } from 'api/url'
import config from 'config'
export default function Searching({ ...props }) {
  const { state, dispatch } = useContext(Delivery)
  const { fetchList } = useDelivery()
  const [focus,setFocus] = useState(false)
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const fetchData = async () => {
        const response = await Promise.all([
          sendRequestAuth('get', `${config.API}/setting/delivery-note/list?keyword=${state.valueSearch}&status=&per_page=20&start=0`),
        ])
        if (response[0].data.success) {

          let meta = response[0].data.meta
          const perPage = meta?.per_page || 0
          const start = meta?.start || 0
          const total = meta?.total || 0
          dispatch({ type: ActionType.LIST_NOTE, payload: response[0].data.data })
          dispatch({
            type: ActionType.GET_PAGINATION, payload: {
              active: Math.floor(start / perPage),
              amount: perPage,
              total: Math.ceil(total / perPage),
              totalItems: total,
            }

          })
        }

      }
      fetchData()
    }, 500)
    return () => clearTimeout(timeOutId)
  }, [state.valueSearch]);
  const handleChange = (e) => {
    let { value } = e.target;
    dispatch({type:ActionType.SET_VALUE_SEARCH,payload:value.trim()})
  }
  return (
    <div className='setting__search'>
      <div onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className= {focus?"setting__search-content setting__search-focus":'setting__search-content'} >
        <input  id='setting__search-input' onChange={handleChange} placeholder='Tìm kiếm theo nội dung ghi chú' className='setting__search-input' />
        <span className='setting__search__iconSearch'>{CONSIGNMENT.iconSearch}</span>
      </div>
    </div>
  )
}
