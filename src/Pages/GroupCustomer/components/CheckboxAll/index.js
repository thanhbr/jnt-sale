import { CustomerContext } from 'Pages/customer'
import {useContext, useEffect, useState} from 'react'
import './style.scss'
import useGroupCustomerContext from '../../hooks/_context'

const CheckboxAll = ({setSelectedList, selectedList, selectedListLength, selectedListAll}) => {
  const [allChecked, setAllChecked] = useState(false)
  const [state, dispatch]= useGroupCustomerContext();
  const [countChecked, setCountChecked] = useState(0)

  const handleCheckAll = event => {
      setSelectedList(
        selectedList?.map(item => ({
          ...item,
          checked: event.target.checked,
        })),
      )
      setAllChecked(event.target.checked)
  }

  useEffect(() => {
    if (
      selectedList &&
      selectedList.length > 0 &&
      selectedList.find(item => item.checked === false)
    ){
      
      setAllChecked(false)
    }
    
    let obj = [];
    selectedList?.map(item => (
      item.checked == true && (obj.push(item))
    ))
    setCountChecked(obj.length)
    // if(selectedList &&
    //   selectedList.length > 0 && selectedListLength != selectedList.length) setAllChecked(true)
  }, [selectedList])

  useEffect(() => {
    if (selectedListLength === state?.filter?.total) setAllChecked(true)    
  }, [selectedListLength])

  return (
    <div className="checkbox-all-group">
      <input
        className={
          selectedListLength > 0 && countChecked < selectedList.length
            ? 'checked-less'
            : ''
        }
        type={'checkbox'}
        checked={countChecked < selectedList.length ? allChecked : (selectedListLength > 0 ? true: false)}
        onChange={handleCheckAll}
      />
    </div>
  )
}

export default CheckboxAll
