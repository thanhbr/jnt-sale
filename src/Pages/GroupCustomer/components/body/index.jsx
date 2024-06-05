
import React, { useState,useEffect,useContext} from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from '@material-ui/core'
import Dropdown from 'Component/PureDropdown/Dropdown'
import './row.scss'
import {getData} from '../../../../api/api'
import {CustomerSkeleton} from '../skeleton/index'
import Empty from '../Empty'
import useGroupCustomerContext from '../../hooks/_context'
import config from '../../../../config'
import {Row} from './row'
import {StickyFooter} from '../../../../common/stickyFooter'
import {Pagination} from '../../../../common/pagination'
import ConfirmModal from '../modals/confirmModal'
import useGroupCustomer from '../../hooks/useGroupCustomer'
import CheckboxAll from 'Pages/GroupCustomer/components/CheckboxAll'
import { useTranslation } from "react-i18next";

export const GroupCustomerBody = (status) => {

    
    const [state, dispatch]= useGroupCustomerContext();
    const keyword = state.filter.keyword.value;
    const [selectedList, setSelectedList] = useState([])
    const [nextPage, setNextPage] = useState([])
    const filter = state.filter
    const [page, setPage] = useState(0)
    const [allChecked, setAllChecked] = useState(state.allChecked)
    const [confirm, setConfirm] = useState({
      active: false,
      value: -1,
      isAccept: false,
      title: '',
      message: '',
      btnAccept: 'Accept',
      btnCancel: 'Cancel',
      handleConfirm: () => {},
    })
    const {functions} = useGroupCustomer()
    const { t } = useTranslation();

    const [selectedListAll, setSelectedListAll] = useState([])
  const [selectedListLength, setSelectedListLength] = useState(0)

    const fetchData = async () => {
      dispatch({type: 'SET_LOADING', payload: true})
      getData(
        `${config.API}/customer/groups?keyword=${keyword}&per_page=${state.filter.per_page}&start=${state.filter.start}`,
      )
        .then(res => {
          if (res.data.success) { 
            dispatch({type: 'SET_LIST_GROUP_CUSTOMER', payload: res.data.data})
            dispatch({
              type: 'SET_FILTER',
              payload: {
                total: res.data.meta.total
              },
            })
            dispatch({type: 'SET_LOADING', payload: false})
            if(allChecked == false) {dispatch({type:'SET_CHECKED',payload:[]}) }
            if (res.data.data.length > 0)
              dispatch({type: 'SET_STATUS', payload: true})
          }
        })
        .catch(err => {
          console.log('error')
        })                                           
    }
  
    useEffect(() => {
      fetchData()
    }, [state.filter.start, state.filter.per_page])
    
    
    useEffect(() => {
      const selected = state.listGrCustomer?.map(item => {
        const newItem = selectedListAll.find(y => y.id === item.id)
        return {...item, checked: newItem?.checked || false}
        // return {...item, checked: false}
      })
      setSelectedList(selected)
    }, [state.listGrCustomer])
  
    useEffect(() => {
      setSelectedListAll(prev => {
        const newCheckedList = prev.map(prevItem => {
          const newItem = selectedList.find(y => y.id === prevItem.id)
          return newItem ? newItem : prevItem
        })
        
        return [...newCheckedList]
      })
    }, [selectedListLength])
  
    useEffect(() => {
      if (selectedListAll.find(x => state?.listGrCustomer[0]?.id === x.id)) return
      const selected = state.listGrCustomer?.map(item => ({
        ...item,
        checked: false,
      }))
      
      if(state.isCreated == true) {
          setSelectedListAll(selected) 
          dispatch({type: 'SET_CREATED', payload: false})
       } else {
          setSelectedListAll(prev => [...prev, ...selected]) 
       } 
    }, [state.listGrCustomer])
  
    useEffect(() => {
      setSelectedListLength(
        selectedList.filter(item => item.checked === true).length,
      )
    }, [selectedList])
  
    const handleSelected = (event, index) =>
      setSelectedList(
        selectedList?.map((item, index2) =>
          index2 === index ? {...item, checked: event.target.checked } : {...item, openDetail: false, hoverOff: true},
        ),
      )
    
    const onchangePagination = newPage => {
        setPage(newPage)
        dispatch({type: 'SET_FILTER', payload: {start: newPage * state.filter.per_page, page: newPage}})
        dispatch({type: 'SET_STATUS', payload: false})
        setAllChecked(true)
    }
  
    const handleChangeRowsPerPage = itemPerPage => {
      if (itemPerPage !== filter.per_page) {
        dispatch({
          type: 'SET_FILTER',
          payload: {start: 0, per_page: parseInt(itemPerPage, 10)},
        })
       setPage(0)
        dispatch({type: 'SET_STATUS', payload: false})
        setAllChecked(true)
      }
    }
    const changeAction = async value => {
      const selectedList = selectedListAll.filter(item => item.checked === true)
      if (selectedList.length <= 0) return

      const ids = selectedList.map(item => item.id)
      if (value == 3) {
        await functions.changeDeleteGroupCustomer(ids.join())
      } else {
        await functions.changeGroupCustomerStatus({id: ids, status: value})
      }
      setSelectedListAll([])
      setAllChecked(false)
      fetchData()
    }
  
    const handleActions = action => {
      const value = action.value
      if (value == 3){
        setConfirm({
          ...confirm,
          active: true,
          title: t("delete_customer_group"),
          content: t("warning_delete_customer_group"),
          btnCancel: t("general_cancel"),
          btnAccept: t("general_remove"),
          acceptStyle: 'delete',
          handleConfirm: () => changeAction(value),
        })
      } else {
        changeAction(value)
      } 
    }
  
    return (
      
      <div className="container-table-grcustomer">
      <TableContainer component={Paper} className={selectedList.length > 0 && ('table-mgt-4')}>
        <Table aria-label="simple table" id="table-grcustomer" >
          <TableHead>
            <TableRow>
              <TableCell align="center"  style={{ width:'50px' }}>
              <CheckboxAll
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                  selectedListLength={selectedListAll.filter(x => x.checked).length}
                  selectedListAll={selectedListAll}
                />
              </TableCell>
              {selectedListAll.filter(x => x.checked).length > 0 && (
                <TableCell colSpan={5} >
                  <div className="flex dropdown-table-customer">
                    <label>{selectedListAll.filter(x => x.checked).length} {t("selected_customer_group")}</label>
                    <Dropdown
                      cb={handleActions}
                      filter="order_source"
                      placeHolderText="Order_source"
                      customClass="show-scroll-bar"
                      byPassTran
                      labelKey="name"
                      PlaceHolderText={t("general_operation")}
                      idKey="id"
                      listOption={[
                        {label: t("general_active"), value: 1},
                        {label: t("general_deactivation"), value: 2},
                        {label: t("general_remove"), value: 3, className: 'delete-option'},
                      ]}
                    />
                  </div>
                </TableCell>
              )}
              {selectedListAll.filter(x => x.checked).length <= 0 &&(
                <> 
                  <TableCell align="left" style={{ width:'300px' }}>{t("customer_group_code")}</TableCell>
                  <TableCell align="left" style={{ width:'700px' }}>{t("customer_group_name")}</TableCell>
                  <TableCell align="center" style={{ width:'400px' }}>{t("usage_status")}</TableCell>
                  <TableCell align="right" className="icon-settings"></TableCell>
                 </>
              )} 
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedList.length > 0 && !state.isLoading ? (
              selectedList.map((row, index) => (
                <Row 
                  dataRow={row}
                  key={index}
                  handleSelected={event => handleSelected(event, index)}
                  fetchData={event => fetchData()}
                />
              ))
            ) : state.isLoading ? (
              <CustomerSkeleton rows={selectedList.length > 0 ? selectedList.length : filter?.per_page} />
            ) : (
              <Empty type={keyword =='' ? '' : 'search'}/>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {filter?.total != 0 && (
        <StickyFooter>
          <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            <Pagination
              active={page}
              amount={filter?.per_page || 10}
              total={Math.ceil(filter?.total / filter?.per_page)}
              totalItems={filter?.total}
              onAmountChange={handleChangeRowsPerPage}
              onPageChange={onchangePagination}
            />
          </div>
        </StickyFooter>
      )}
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      </div>
      
    )
}
