import React, { useEffect, useReducer, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import "./index.scss";
import { CONSIGNMENT } from 'Component/Icons';
import { getData } from 'api/api';
import { getConsignment } from 'api/url';
import { SwitchStatus } from 'Component/SwitchStatus/SwitchStatus';
import CheckBoxConsignment from 'Component/CheckBoxConsignment/CheckBoxConsignment';
import Dropdown from '../dropDown/Dropdown';
import { CustomToolTip } from 'Component/tooltip/CustomTooltip';
import { useTranslation } from 'react-i18next';
import { CustomerSkeleton } from 'Pages/customer/components/skeleton';
import SkeletoComponent from 'Component/Skeloton/SkeletoComponent';
import NoConsignment from '../noConsignment/NoConsignment';
import Reducer from 'Pages/Consignment/store/reducer';
import { InitialState } from 'Pages/Consignment/store/initState';
import { activeStatus } from 'Pages/Consignment/store/getAddress';
import toast from 'Component/Toast';
import { Checkbox } from 'common/form/checkbox';
import { Tooltip } from 'common/tooltipv2';
export default function TableConsignment({ checkAll, handleOpenModal, data, handleAddNew, isloading, title, isDefault, handleFlag,check_id_default }) {
  const dataConsignment = data.getConsignment;
  const [state, dispatch] = useReducer(Reducer, InitialState)
  const loading = isloading.isLoading;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState({});
  const [isHover, setIsHover] = useState(-1)
  const [disable, setDisabled] = useState(false)
  const [checkDefault,setCheckDefault] =useState('')
  const { t } = useTranslation()

  const shouldActiveCheckbox = count > 0

  const isActiveAll =
      dataConsignment.length <= 0
          ? false
          : isCheck?.length < dataConsignment.length
          ? false
          : !!!dataConsignment.find(
              item => !!!isCheck.find(find => find === item?.id),
          )
  const checkFullPageChecked = () => {
    let checkFullPage = true;
    dataConsignment.forEach(item => {
      const findItem = isCheck?.find(find => find === item.id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }
  const handleSelectAll = e => {
    let newSelectedList = []
    if (isActiveAll)
      newSelectedList = isCheck?.filter(
          item => !!!dataConsignment.find(find => find?.id === item),
      )
    else {
      let addingList = []
      dataConsignment.forEach(item => {
        if (!!!isCheck.find(find => find === item?.id))
          addingList.push(item?.id)
      })
      newSelectedList = [...isCheck, ...addingList]
    }
    setIsCheck(newSelectedList)
    const findDefault = dataConsignment.find(item=>{
      if(item?.is_default == 1) return item
    })
    const id_default = newSelectedList.find(item=> item == check_id_default)
    if(id_default !== undefined){
      setCount(newSelectedList.length-1)
      setCheckDefault(findDefault?.id)
    }
    else {
      setCount( newSelectedList.length )
    }
  };
  // useEffect(() => {
  //   if (isCheckAll) handleSelectAll()

  // }, [checkAll])
  const handleClick = (e, id) => {
    let check = isCheck.find(item => item === id)
    if (check !== undefined) {
      setIsCheck(isCheck.filter(item => item !== id));
      setCount(count -1)
    } else {
      setIsCheck([...isCheck, id]);
      setCount(count +1)
    }
  };
  const handleActive = () => {
    let ArrTemp = []
    isCheck.map(item => {
      ArrTemp = { ...ArrTemp, [item]: 1 }
    })
    setIsActive({ ...isActive, ...ArrTemp })
    activeStatus({ id: isCheck, status: 1 })
    setIsCheck([]);
  }

  const handleDeActive = () => {
    let ArrTemp = []
    isCheck.map(item => {
      if(item !== checkDefault)  ArrTemp = { ...ArrTemp, [item]: -1 }
    })
    setIsActive({ ...isActive, ...ArrTemp })
      activeStatus({ id: isCheck.map(item=>{if( item !== checkDefault) return item}), status: -1 })
    setIsCheck([]);
      setCount(0)
  }
  const handleChange = (e) => {
    setDisabled(true)
    const { checked } = e.target;
    setIsActive({ ...isActive, [e.target.id]: checked })
    activeStatus({ id: [e.target.id], status: checked ? 1 : -1 })
    setTimeout(() => {
      setDisabled(false)
    }, 2000)
  }
  const showTable = () => {
    if (dataConsignment.length > 0 && !loading) {
      return dataConsignment.map((item, index) => {
        let title = `${item.address}, ${item.ward_name}, ${item.district_name}, ${item.city_name}`
        return (
            <TableRow key={index} className='table_body' hover onMouseEnter={() => setIsHover(index)} onMouseLeave={() => setIsHover(-1)}>
              <TableCell align="center" className='table_checkbox'>
                <CheckBoxConsignment
                    name={item.fullname}
                    handleClick={(e) => handleClick(e, item.id)}
                    isChecked={item.is_default == 1?false:isCheck.includes(item.id)}
                    disable={item.is_default == 1?true:false}
                />
              </TableCell>
              <TableCell align="left" className='table_consignment'>
                <Tooltip placement="top" title={item.fullname} baseOn='height'>
                <span className='table_consignment_span'>
                  {item.fullname}

                </span>
                </Tooltip>
                {item.is_default == 1 ? <div className='table_default_address'>{CONSIGNMENT.iconBuilding} Địa chỉ mặc định</div> : ''}
                {/* <CustomToolTip placement="top" title={item.fullname}>
                
              </CustomToolTip> */}
              </TableCell>
              <TableCell align="left" className='table_phone'>{item.phone}</TableCell>
              <TableCell align="left" className='table_address'>
                <Tooltip placement="top" title={title} baseOn='height'>
                  <span className='table_consignment_span'>{item.address}, {item.ward_name}, {item.district_name}, {item.city_name} </span>
                </Tooltip>

              </TableCell>
              <TableCell className='table_status'>
                {item.is_default == 1 ? '' : <SwitchStatus disabled={disable} id={item.id} status={isActive[item.id] == undefined ? item.status : isActive[item.id]} name={item.fullname} handleChange={handleChange} />}

              </TableCell>
              <TableCell className='table_setting' >
                <CustomToolTip title={t('tooltip_fix')} placement="bottom">
                  {
                    isHover == index ? <span className='table_icon_fix' onClick={() => handleOpenModal(item.id)}>
                    {CONSIGNMENT.iconFix}
                  </span> : <span className='table_icon'>
                    {CONSIGNMENT.iconDots}
                  </span>
                  }
                </CustomToolTip>
              </TableCell>

            </TableRow>
        )
      })
    } else if (loading) {
      return <SkeletoComponent numb={dataConsignment?dataConsignment.length:20} />

    } else return <NoConsignment title={title} handleAddNew={handleAddNew} />
  }
  return (
      <TableContainer component={Paper} className="table__consignment">
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead>
            <TableRow >
              <TableCell align="center" className='table_checkbox'>
                <CheckBoxConsignment name="selectAll"
                                     minus={!checkFullPageChecked()}
                                     handleClick={handleSelectAll}
                                     isChecked={shouldActiveCheckbox}
                />
            </TableCell>
            {count == 0 ? <>
              <TableCell align="left" className='table_consignment'>Tên điểm gửi hàng</TableCell>
              <TableCell align="left" className='table_phone'>Điện thoại</TableCell>
              <TableCell align="left" className='table_address'>Địa chỉ</TableCell>
              <TableCell className='table_status'>Trạng thái sử dụng</TableCell>
              <TableCell className='table_setting'></TableCell></>
              : <Dropdown count={count}  handleActive={handleActive} id={isCheck} title={'điểm gửi hàng được chọn'} handleDeActive={handleDeActive} />}

            </TableRow>
          </TableHead>
          <TableBody>
            {showTable()}
          </TableBody>
        </Table>
      </TableContainer>
  )
}
