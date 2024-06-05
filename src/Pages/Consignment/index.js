import React, { useEffect, useReducer, useState } from 'react'
import './index.scss'
import { PATH } from '../../const/path'
import { Breadcrumb } from 'common/breadcrumb'
import { CONSIGNMENT } from 'Component/Icons'
import { Modal, Box } from '@mui/material'
import Search from './component/searching'
import TableConsignment from './component/table'
import ShippingPointInfomation from './component/shippingPointInfomantion'
import Reducer from './store/reducer'
import { getData, postData } from 'api/api'
import { getInfoConsignment, getConsignment, createAddress } from 'api/url'
import { InitialState } from './store/initState'
import PaginateConsignment from './component/paginatConsignment/PaginateConsignment'
import { Pagination } from 'common/pagination'
import { StickyFooter } from 'common/stickyFooter'
import { PageHeader } from 'layouts/pageHeader'
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons'
import { handleError } from './confirmOnchange'
import Index from 'Component/ModalConfirm'
import {Button} from "../../common/button";
// import css from './index.scss'
// import cls from 'clsx'
export default function Consignment() {
  const [aniModalClose, setAniModalClose] = useState(false)
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [isId, setIsId] = useState()
  const [state, dispatch] = useReducer(Reducer, InitialState)
  const [isCreate, setIsCreate] = useState(false)
  const [isDefault, setIsDefault] = useState()
  const [checkAll, setCheckAll] = useState(false)
  const [title, setTitle] = useState('Bạn chưa có điểm gửi hàng nào')
  const [page,setPage]=useState()
  const [checkConfirm,setCheckConfirm]=useState(false)
  const [check_id_default,setCheck_id_default] = useState('')
  useEffect(() => {
    if (isId) {
      const getInfo = async () => {
        try {
          const res = await getData(getInfoConsignment(isId))
          // console.log(res.data.data);
          dispatch({ type: 'GET_INFO_CONSINGMENT', payload: res.data.data })
        } catch (er) {
          console.log(er)
        }
      }
      getInfo()
    }
    setIsId()
  }, [isId])
  useEffect(() => {
    getConsignments()
  }, [state.meta.start, isCreate])
  const getConsignments = async () => {
    try {
      const res = await getData(
          getConsignment(state.meta.per_page, state.meta.start),
      )
      if (res.status == 200) {
        dispatch({ type: 'GET_META', payload: res.data.meta })
        dispatch({ type: 'GET_CONSIGNMENT', payload: res.data.data })
        dispatch({ type: 'IS_LOAIDNG', payload: false })
        let id_default = res.data.data.find(item => item.is_default == 1)
        if(id_default !== undefined) setCheck_id_default(id_default?.id)
        else setCheck_id_default(check_id_default)
      }
    } catch (er) {
      console.log(er)
    }
  }
  const handleCheckConfirm=()=>{
    setCheckConfirm(true)

  }
  const [keyword ,setKeyword] =useState('')
  const handleSearch = (data,key) => {
    if (data.data.length == 0) setTitle('Không tìm thấy dữ liệu phù hợp')
    setKeyword(key)
    dispatch({ type: 'GET_CONSIGNMENT', payload: data.data })
    dispatch({type:'GET_META',payload:data.meta})
    dispatch({ type: 'IS_LOAIDNG', payload: false })
  }
  const onChangePage = page => {
    const amount = state.meta.per_page
    dispatch({ type: 'SET_META_START', payload: page * amount })
    dispatch({ type: 'IS_LOAIDNG', payload: true })
    setCheckAll(!checkAll)
    setPage({per_page: amount,start:page * amount})
  }
  const handleAmountChange = amount => {
    dispatch({ type: 'SET_META_PAGE', payload: amount })
    dispatch({ type: 'SET_META_START', payload: 0 })
    dispatch({ type: 'IS_LOAIDNG', payload: true })
    setIsCreate(!isCreate)
    setCheckAll(!checkAll)
    setPage({per_page: amount,start:0})

  }
  const handleDefault=()=>{
    dispatch({ type: 'SET_META_START', payload: 0 })
    dispatch({ type: 'SET_META_PAGE', payload: 20 })
  }
  const handleAddNew = () => {
    setOpen(true)
    setAniModalClose(false)
  }
  const handleFlag = () => {
    if (isCreate) setIsCreate(false)
    else setIsCreate(true)
  }
  const handleOpenModal = id => {
    setOpen(true)
    setAniModalClose(false)
    setIsId(id)
    dispatch({type:'GET_ID_INFO',payload:id})
  }
  const handleClosePopup = () => {
    // if(!bolUpdate) {
    setOpenConfirm(false)
    setCheckConfirm(false)
    setAniModalClose(true)
    setIsId('')
   
    setTimeout(() => {
      setOpen(false)
      dispatch({ type: 'GET_INFO_CONSINGMENT', payload: '' })
      // setToggle(false)
    }, 300)
    // } else {
    //   setConfirm(true)
    // }
  }
  const handleClose=()=>{
    if(checkConfirm) handleConfirm()
    else{
      dispatch({ type: 'GET_INFO_CONSINGMENT', payload: '' })
      setAniModalClose(true)
      setTimeout(() => {
        setOpen(false)
      }, 300)
      //  } else {
      //    setConfirm(true)
      //  }
    }
  }
  const handleCloseConfirm = () => {
    
    setTimeout(() => {
      setOpenConfirm(false)
      // setToggle(false)
    }, 300)
  }
  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const consign = [
    { id: 1, name: 'Cấu hình & cài đặt', url: PATH.SETTING },
    { id: 2, name: 'Điểm gửi hàng', url: '#' },
  ]
  const breadcrumbAction=[
    {
      id: 1,
      name: null,
      appearance: 'secondary',
      icon: ORDER_ICONS.repeat,
      onClick: async () =>{
        dispatch({ type: 'IS_LOAIDNG', payload: !state.isLoading })
        try {
          const res = await getData(
              getConsignment(state.meta.per_page, state.meta.start,keyword),
          )
          if (res.status == 200) {
            dispatch({ type: 'GET_META', payload: res.data.meta })
            dispatch({ type: 'GET_CONSIGNMENT', payload: res.data.data })
            dispatch({ type: 'IS_LOAIDNG', payload: false })
          }
        } catch (er) {
          console.log(er)
        }
      } ,
      tooltip:'Làm mới dữ liệu',
    },
    
    {
      id: 4,
      name: 'Thêm mới',
      appearance: 'primary',
      icon: ORDER_ICONS.plus,
      onClick: () => handleAddNew(),
    },
  ]
  const handleConfirm=()=>{
    setOpenConfirm(true)
  }
  return (
    <div className="congsignment__main">
      <div className="congsignment__header">
        <PageHeader
          actions={breadcrumbAction}
          breadcrumbLinks={consign}
          breadcrumbTitle="Điểm gửi hàng"
        />
      </div>
      <Search search={state} handleSearch={handleSearch} page={page} />
      <TableConsignment
        isDefault={isDefault}
        handleOpenModal={handleOpenModal}
        title={title}
        data={state}
        isloading={state}
        handleAddNew={handleAddNew}
        handleFlag={handleFlag}
        checkAll={checkAll}
        check_id_default={check_id_default}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="modal"
      >
        <Box className={`box_modal ${aniModalClose && 'modal_custom'}`}>
          <div
            className={'dismiss_consginment'}
            onClick={() => {
              if(checkConfirm) handleConfirm()
              else{
                dispatch({ type: 'GET_INFO_CONSINGMENT', payload: '' })
                setAniModalClose(true)
                setTimeout(() => {
                  setOpen(false)
                }, 300)
                //  } else {
                //    setConfirm(true)
                //  }
              }
              //  if(!bolUpdate) {
              
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1L1 13M1 1L13 13"
                stroke="#F4F7FC"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

            <div className="general">
              <ShippingPointInfomation
                  data={state}
                  handleFlag={handleFlag}
                  handleClosePopup={handleClosePopup}
                  handleOpenConfirm={handleOpenConfirm}
                  handleCheckConfirm={handleCheckConfirm}
                  handleDefault={handleDefault}
              />
            </div>
          </Box>
        </Modal>
        <Modal
            open={openConfirm}
            onClose={handleCloseConfirm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box className="box_confirm_consignment">
            <div className="confirm_title">Xác nhận rời khỏi trang</div>
            <div className="confirm_text">
              {' '}
              Bạn đã thực hiện một số thay đổi. Bạn có chắc chắn muốn thoát khi dữ liệu chưa được lưu?
            </div>
            <div className='confirm_button'>
              <Button className='confirm_cancel' appearance={'ghost'} onClick={handleCloseConfirm}>Hủy</Button>
              <Button className='confirm_acept' onClick={handleClosePopup}>Xác nhận</Button>
            </div>
          </Box>
        </Modal>
        { state.meta.total < 20 && state.getConsignment.length == 0?'' : <StickyFooter>
          <div className="consignment__paginate">
            <Pagination
                active={
                  state.meta.start != 0
                      ? Math.floor(state.meta.start / state.meta?.per_page)
                      : 0
                }
                amount={state.meta?.per_page || 10}
                total={Math.ceil(state.meta?.total / state.meta?.per_page)}
                totalItems={state.meta?.total ? state.meta?.total : 0}
                onAmountChange={handleAmountChange}
                onPageChange={onChangePage}
            />
          </div>
        </StickyFooter> }

      </div>
  )
}
