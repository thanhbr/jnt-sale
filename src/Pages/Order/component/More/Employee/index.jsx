import React, {useContext, useEffect, useState, useTransition, memo} from 'react';
import {SCRIPT} from "../../../_script";
import {TAB_USER_PROFILE} from "../../../../../Component/Icons";
import './index.scss'
import {getUrlEmployeeList, getUrlEmployeeListByGroup} from "../../../../../api/url";
import {getData} from "../../../../../api/api";
import {OrderContext} from "../../../../../LayoutWrapper";

const Index = () => {
  const [state, dispatch] = useContext(OrderContext)
  const [showOption, setShowOption] = useState(false)
  const [showEmployee, setShowEmployee] = useState(false)
  const [position, setPosition] = useState(SCRIPT.EMPLOYEES.GROUP)
  const [groupId, setGroupId] = useState('')
  const [, startTransition] = useTransition()
  const positions = state.group.position
  const employees = state.group.employee

  useEffect(() => {
    window.addEventListener('click', function (e) {
      const order_group = document.getElementById('search_order_group')?.contains(e.target)
      const order_employee = document.getElementById('search_order_employee')?.contains(e.target)
      if(!order_group) setShowOption(false)
      if(!order_employee) setShowEmployee(false)
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])
  const handleSearchGroup = async () => {
    setShowOption(!showOption)
    setShowEmployee(false)
    if(!showOption && positions?.length === 0) {
      const url = getUrlEmployeeList()
      getData(url)
        .then((res) => {
          if(res.status === 200 && res.data.success === true) {
            dispatch({type: 'UPDATE_GROUP_FILTER', payload: {position:res.data.data}})
          }
        })
        .catch(() => {
          console.log('ERROR: UPDATE_GROUP_EMPLOYEE_POSITION')
        })
    }
  }

  const handleSearchEmployee = async (e) => {
    startTransition(() => {
      const keyword = e.target.value
      setShowEmployee(!showEmployee)
      setShowOption(false)
      // && employees?.length === 0
      if(!showEmployee) {
        const url = getUrlEmployeeListByGroup(keyword, groupId)
        getData(url)
          .then((res) => {
            if(res.status === 200 && res.data.success === true) {
              dispatch({type: 'UPDATE_GROUP_FILTER', payload: {employee:res.data.data}})
            }
          })
          .catch(() => {
            console.log('ERROR: UPDATE_GROUP_EMPLOYEE')
          })
      }
    });
  }

  return (
    <>
      <div className={'order-filter-more__grp-employee'}>
        <div className={'order-filter-more__employee order-filter-more__general'}>
          <p className={`order-filter-more__employee-select ${showOption ? 'active' : ''} `}
             id={'search_order_group'}
             onClick={handleSearchGroup}
          >
            {position}
            {TAB_USER_PROFILE.arrow}
          </p>
          {showOption ? (
            <div className={'order-filter-more__employee-option'}>
              {positions?.map((position) => (
                <p key={position.id}
                   onClick={() => {
                     setPosition(position.group_name)
                     setGroupId(position.id)
                   }}
                >{position.group_name}</p>
              ))}
            </div>
          ): ''}
          {showEmployee ? (
            <div className={'order-filter-more__employee-list scroll-custom'}>
              {employees?.map((employee) => (
                <p key={employee.user_id}
                   onClick={() => {
                     document.getElementById('search_order_employee').value = employee.fullname
                     dispatch({type: 'SET_FILTER', payload: {user_id: {label: SCRIPT.EMPLOYEES.T_EMPLOYEE, value: employee.user_id, name: employee.fullname}}})
                   }}
                >{employee.fullname}</p>
              ))}
            </div>
          ) : ''}
        </div>
        <input placeholder={SCRIPT.EMPLOYEES.P_EMPLOYEE}
               id={'search_order_employee'}
               onClick={handleSearchEmployee}
               onChange={handleSearchEmployee}
               autoComplete={'off'}
        />
      </div>
    </>
  );
};

export default memo(Index);