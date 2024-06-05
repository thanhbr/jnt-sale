import React, { useContext,useState ,useEffect} from 'react'
import "./index.scss"
import { CONSIGNMENT } from 'Component/Icons'
import { Unit } from 'Pages/UnitsManage'
import { handleSearch } from './handleSearch'
import { ActionType } from 'Pages/UnitsManage/store/action'
import { useUnit } from 'Pages/UnitsManage/hooks/useUnit'
import { getData, sendRequestAuth } from 'api/api'
import { getListUnit, getListSearchUnit } from 'api/url'
import config from 'config'
export default function Searching({ ...props }) {
  const { state, dispatch } = useContext(Unit)
  const { fetchList } = useUnit()
  const [focus,setFocus] = useState(false)
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const fetchData = async () => {
        const response = await Promise.all([
          sendRequestAuth('get', `${config.API}/product/unit/list?keyword=${state.valueSearch}`),
        ])
        if (response[0].data.success) {

          let meta = response[0].data.meta
          const perPage = meta?.per_page || 0
          const start = meta?.start || 0
          const total = meta?.total || 0
          dispatch({ type: ActionType.LIST_UNIT, payload: response[0].data.data })
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
        <input value={state.valueSearch} id='setting__search-input' onChange={handleChange} placeholder='Tìm kiếm theo đơn vị tính/đơn vị viết tắt' className='setting__search-input' />
        <span className='setting__search__iconSearch'>{CONSIGNMENT.iconSearch}</span>
      </div>
    </div>
  )
}
