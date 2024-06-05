import React, {useCallback,useState,useContext, useEffect, useRef} from 'react';
import {ICONS_CUSTOMER_INFOR} from "../../interface/icon";

import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {Textarea} from 'common/form/textarea'
import {THEME_SEMANTICS} from 'common/theme/_semantics'

import {InfoAddress as Address} from './templates/_address'
import {InfoDistrict as District} from './templates/_district'
import {InfoProvince as Province} from './templates/_province'
import {InfoWard as Ward} from './templates/_ward'
import {StyledCustomerInfor, StyledCustomerModalPrint } from './_styled'
import { FacebookConversationContext } from '../../provider/_context'
import useFacebookCustomerInfor from '../../hooks/useFacebookCustomerInfor';
import Slider from 'react-slick'
import {ORDER_SHIPPING_STATUSES} from '../../interface/_constants'
import { Tooltip } from 'common/tooltip'
import { Link } from 'react-router-dom'
import { Button } from 'common/button'
import Modal from '@material-ui/core/Modal'
import './_modal.scss'


export const CustomerInformation = () => {
  const {state, dispatch}= useContext(FacebookConversationContext)
  const {methods,functions, validates} = useFacebookCustomerInfor()
  const [shouldOpenPhoneAdressCollapse, setShouldOpenPhoneAdressCollapse] = useState(true)
  const [shouldOpenHistoryCollapse, setshouldOpenHistoryCollapse] = useState(true)
  const [activeAdress, setActiveAdress] = useState(0)
  const [openPrintModal, setOpenPrintModal] =useState(false)
  const [rowOrderPrint, setRowOrderPrint] =useState([])

  useEffect(() => {
    methods.onDefaultAddress();
  }, [state.detail.customerInfor.list.city_id])

  useEffect(() => {
    methods.onDefaultAddress();
    validates.handleValidateCustomerMobile()
    functions.handleCustomerAddress(state.detail.customerInfor.list.customer_id)
    state.detail.customerInfor.list.customer_mobile && functions.handleCustomerAddress(state.detail.customerInfor.list.customer_mobile)
  }, [])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    arrows: true,
    nextArrow: (
      ICONS_CUSTOMER_INFOR.nextSlideArrow
    ),
    prevArrow: (
      ICONS_CUSTOMER_INFOR.nextSlideArrow
    ),
  }
  const sliderRef = useRef()
  const containerSlide = useRef()
  const scroll = useCallback(
    y => {
      if (y > 0) {
        return sliderRef?.current?.slickNext() /// ? <- using description below
      } else {
        return sliderRef?.current?.slickPrev()
      }
    },
    [sliderRef]
  )
  useEffect(() => {
    containerSlide.current.addEventListener("wheel", e => {
      scroll(e.deltaY);
    });
    return () => {
      containerSlide.current?.removeEventListener("wheel", scroll, true);
    };
  }, [scroll]);
  const renderNetWork = (net)=>{
    switch (net) {
      case 'Mobi':
        return(
            <Text
                style={{background:'#0060AE26',padding:'3px 12px',borderRadius:'60px'}}
                color={'#0060AE'}
                fontSize={10}
                fontWeight={600}
                lineHeight={16}
            >
              {net}
            </Text>
        )
      case 'Viettel':
        return(
            <Text
                style={{background:'#EE003226',padding:'3px 12px',borderRadius:'60px'}}
                color={'#EE0032'}
                fontSize={10}
                fontWeight={600}
                lineHeight={16}
            >
              {net}
            </Text>
        )
      case 'Vina':
        return(
            <Text
                style={{background:'#00A0E426',padding:'3px 12px',borderRadius:'60px'}}
                color={'#00A0E4'}
                fontSize={10}
                fontWeight={600}
                lineHeight={16}
            >
              Vinaphone
            </Text>
        )
      case 'G-Mobile':
        return(
            <Text
                style={{background:'#FEC31E26',padding:'3px 12px',borderRadius:'60px'}}
                color={'#FEC31E'}
                fontSize={10}
                fontWeight={600}
                lineHeight={16}
            >
              Gmobile
            </Text>
        )
      case 'VN-Mobile':
        return(
            <Text
                style={{background:'#F4822E26',padding:'3px 12px',borderRadius:'60px'}}
                color={'#F4822E'}
                fontSize={10}
                fontWeight={600}
                lineHeight={16}
            >
              Vietnamobile
            </Text>
        )
      case 'Itelecom':
        return(
            <Text
                style={{background:'#D7192126',padding:'3px 12px',borderRadius:'60px'}}
                color={'#D71921'}
                fontSize={10}
                fontWeight={600}
                lineHeight={16}
            >
              {net}
            </Text>
        )
      default:
        break
    }
  }
  return (
    <>
      <StyledCustomerInfor>
        <div className="customerInfor_fb common-scrollbar">
          <div className="group_title" style={{'marginTop':'0px','justify-content':' space-between'}}>
            <div className="tt_customer">
            Thông tin liên hệ
            </div>
            <div className="tt_save_customer" 
            onClick={e => {
              functions.saveCustomerInfor()
            }}
            >
            {ICONS_CUSTOMER_INFOR.save} Lưu thông tin khách hàng
            </div>
          </div>
          <div className="general" >
            <div className="group_name_phone">
              <div className="lb_group_name">
                <div className="lb_group">
                  <Input
                    label={
                      <>
                        Tên khách hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
                        
                      </>
                    }
                    placeholder="Nhập tên khách hàng"
                    value={state.detail.customerInfor.list.customer_name ? state.detail.customerInfor.list.customer_name : ''}             
                    onChange={e => methods.onScriptNameChange(e.target.value)}
                    onBlur={e => validates.handleValidateCustomerName() }
                    validateText={state.detail.customerInfor.validate.customer_name == true ? 
                      state.detail.customerInfor.list.customer_name.length > 80 ? "Tên khách hàng không được quá 80 kí tự!" : "Tên khách hàng không được bỏ trống!" : ''
                    }
                    validateType="danger"
                  />
                </div>
              </div>
              <div className="lb_group_phone">
                <div className="lb_group">
                  <Input
                      label={
                        <>
                          Điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
                          {
                          state.detail.customerInfor.total_reports > 0 && (
                            <Tooltip placement="bottom" className="lb_group_name_total_report"
                                   title={`Đã báo xấu: ${state.detail.customerInfor.total_reports} lần`}
                                   baseOn={'width'}>
                            {ICONS_CUSTOMER_INFOR.warning_report}
                            </Tooltip>
                          )
                          }
                        </>
                      }
                      placeholder="Nhập điện thoại"
                      value={state.detail.customerInfor.list.customer_mobile ? state.detail.customerInfor.list.customer_mobile :''}
                      onChange={e =>{ 
                        const newValue = e.target.value
                                      .toString()
                                      .replace(/[^0-9]/g, '')
                                      .substring(0, 11)
                        methods.onScriptPhoneChange(newValue)
                      }}
                      onBlur={e => validates.handleValidateCustomerMobile() }
                      validateText={state.detail.customerInfor.validate.customer_mobile.status == true ? state.detail.customerInfor.validate.customer_mobile.message : ''}
                      validateType="danger"
                      iconProps={{style: {
                          right:'8px',
                          width: 'fit-content'
                        }}}
                      icon={
                        state.detail.customerInfor?.list?.network && renderNetWork(state.detail.customerInfor?.list?.network) }
                    />
                </div>
              </div>
            </div>
            <div className="lb_group_address">
              <div className="lb_group">
                <Address />
              </div>
            </div>
            <div className="lb_group_address_option">
              <div className='lb_group_address_item'>
                <Province
                /></div><div className='lb_group_address_item'>
                <District
                /></div><div className='lb_group_address_item_end'>
                <Ward
                /></div>
            </div>
            <div className='lb_group_address_option_validate'>
              {
                 state.detail.customerInfor.errorSeparate ? "evoshop chưa nhận diện được địa chỉ này, hãy kiểm tra lại hoặc tự chọn địa chỉ ở bên dưới bạn nhé!" : 
              state.detail.customerInfor?.isNotEnoughCustomerInfo && (!state.detail.customerInfor.list.customer_address || !state.detail.customerInfor.list.city_id || !state.detail.customerInfor.list.district_id || !state.detail.customerInfor.list.ward_id ) ? "Địa chỉ không được bỏ trống" :''}
            </div>
            <div className='lb_group_notes_item'>
            <Textarea
                label="Ghi chú khách hàng"
                placeholder="Nhập ghi chú khách hàng"
                value={state.detail.customerInfor.list.customer_notes ? state.detail.customerInfor.list.customer_notes :''}
                onBlur={e => validates.handleValidateCustomerNotes() }
                onChange={e => methods.onScriptNoteChange(e.target.value)}
                validateText={state.detail.customerInfor.validate.customer_notes == true ? 'Ghi chú không được nhập quá 255 kí tự!' : ''}
                validateType="danger"
              />
            </div>
          </div>
          <div className="group_title">
            <div className="tt_phone_address">
              Số điện thoại & địa chỉ gần đây
            </div>
            {state.detail.customerInfor.list.customer_mobile  &&
            (<div>
              <i
                className="tt_phone_address__header-toggle"
                data-expand={shouldOpenPhoneAdressCollapse}
                onClick={() => setShouldOpenPhoneAdressCollapse(!shouldOpenPhoneAdressCollapse)}
              >
                {ICONS_CUSTOMER_INFOR.up_arrow}
              </i>
            </div>)
            }
          </div>
          {!state.detail.customerInfor.list.customer_mobile && state.detail.customerInfor.listPhone <= 0  && <div className='tt_phone_address_empty'>Chưa có SĐT hay địa chỉ nào được lưu với khách hàng này.</div>}
          {shouldOpenPhoneAdressCollapse && (<div className="tt_phone_address__body" data-collapse={shouldOpenPhoneAdressCollapse}>
              <div className='line_pn_phone' 
                  ref={containerSlide}> 
                <Slider {...settings} ref={sliderRef}>
                  {[...new Set(state.detail.customerInfor.listPhone)].map((row, index) => (
                    row && (
                    <div className={row == state.detail.customerInfor.list.customer_mobile ? 'pn_phone pn_phone_active' : 'pn_phone pn_phone_deactive' }
                    onClick={e => {
                      methods.onChangePhoneCustomer(row)
                    }}
                    >
                    <span>{row == state.detail.customerInfor.list.customer_mobile ? ICONS_CUSTOMER_INFOR.phone : ICONS_CUSTOMER_INFOR.phone_deactive}</span> {row}
                    {state.detail.customerInfor.list_report.find((item,ind) => item.phone == row) && (
                      <Tooltip placement="bottom" className="lb_group_name_total_report" style={{paddingLeft: '6px'}}
                              title={`Đã báo xấu: ${state.detail.customerInfor.list_report.find((item,ind) => item.phone == row)?.totals} lần`}
                              baseOn={'width'}>
                      {ICONS_CUSTOMER_INFOR.warning_report}
                      </Tooltip>
                    )}
                    </div>) 
                  ))}
                </Slider>
              </div>
              <div className='line_pn_address'>
                {state.detail.customerInfor.listAddress.map((row, index) => (
                  row.customer_address && (
                  <div className={index== activeAdress ? 'pn_address pn_address_active' : 'pn_address pn_address_deactive'}
                  onClick={e => {
                    methods.onChangeAddressCustomer(row)
                    setActiveAdress(index)
                  }}
                  >
                  <span>{index== activeAdress ? ICONS_CUSTOMER_INFOR.circle_check : ICONS_CUSTOMER_INFOR.unradio}</span>
                  { row.customer_address.length > 70 ? 
                      <Tooltip placement="top" className="line_pn_address_tooltip"
                      title={row.customer_address}
                      baseOn={'width'}>
                      {row.customer_address} </Tooltip> : 
                      row.customer_address
                  }
                  </div>)
                ))}
              </div>
          </div>)}
          <div className="group_title">
            <div className="tt_history_order">
              Lịch sử đơn hàng ({state.detail.customerInfor.listOrder.length })
            </div>
            {state.detail.customerInfor.listOrder.length > 0  &&
            (<div>
              <i
                className="tt_history_order__header-toggle"
                data-expand={shouldOpenHistoryCollapse}
                onClick={() => setshouldOpenHistoryCollapse(!shouldOpenHistoryCollapse)}
              >
                {ICONS_CUSTOMER_INFOR.up_arrow}
              </i>
            </div>)}
          </div>
            {shouldOpenHistoryCollapse && (<div className="tt_history_order__body common-scrollbar" data-collapse={shouldOpenHistoryCollapse}>
              {state.detail.customerInfor.listOrder.map((row, index) => (
                  <div className='row_history_order' key={index} >
                    {ICONS_CUSTOMER_INFOR.clock} <div className='tt_history_order_text__date'>{row.date}</div>
                    <div className='tt_history_order_text__orderid'><span>Đơn hàng:</span> <b>
                      <Link to={`/orders?search=${row?.id}`} target="_blank">{row.id}</Link>
                    </b>
                    </div>

                    <div className='tt_history_order_text__status_name' ><span style={{
                      background: ORDER_SHIPPING_STATUSES['_'+row.status].background,
                      color: ORDER_SHIPPING_STATUSES['_'+row.status].color,padding: '5px'
                    }}>{row.status_name}</span></div>
                    <div className='tt_history_order_text__orderid' style={{width: '142px'}}><span>Vận đơn: </span>
                      <b> <Link to={`/delivery/management?search=${row?.billcode}`} target="_blank">{row.billcode}</Link></b>
                    </div>
                    <div className='tt_history_order_text__printr' onClick={()=> {
                      if(row.status == 1){
                        setOpenPrintModal(true);
                        setRowOrderPrint(row)
                      }}}
                    >{row.status == 1 && ICONS_CUSTOMER_INFOR.printr}</div>
                  </div>
              ))}
            </div>)}
        </div>
        {openPrintModal == true && (<ModalPrintOrder open={openPrintModal} close={()=>setOpenPrintModal(false)} row={rowOrderPrint} />)}

      </StyledCustomerInfor>
    </>
  );
};

export const ModalPrintOrder =({...prop}) =>{
  const {functions} = useFacebookCustomerInfor()
  return (
    <Modal
      open={prop.open}
      onClose={prop.close}
      width={640}
      > 
      <div id='customerInfor_fb_modal_print_order'>
        <div className='printr_order_modal_title'>
          In vận đơn
        </div>
        <div className='printr_order_modal_body'>
          <div className='printr_order_modal_content'>
              Nhấp chọn từng nút để in theo mẫu tương ứng.
          </div>
          <div className='printr_order_modal_content_btn'>
              <Button size={'sm'} appearance={'primary'} className="printr_order_template"  onClick={()=>functions.handlePrint('others',prop.row.id,'_'+prop.row.partner_ship)}> Mẫu ĐVVC </Button>
              <Button size={'sm'} appearance={'primary'} className="printr_order_template" onClick={()=>functions.handlePrint('a5',prop.row.id,'_'+prop.row.partner_ship)}> Mẫu evoshop A5 </Button>
              <Button size={'sm'} appearance={'primary'} className="printr_order_template" onClick={()=>functions.handlePrint('a4',prop.row.id,'_'+prop.row.partner_ship)}> Mẫu evoshop A4 </Button>
              <Button size={'sm'} appearance={'primary'} className="printr_order_template" onClick={()=>functions.handlePrint('k80',prop.row.id,'_'+prop.row.partner_ship)}> Mẫu evoshop K80 </Button>
          </div>
          <Button size={'sm'} appearance={'ghost'} className="printr_order_cancel" onClick={prop.close}> Đóng </Button>
        </div>
      </div> 
    </Modal>
  )
}
