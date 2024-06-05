import React, {useEffect, useState} from 'react'
import {Checkbox} from 'common/form/checkbox'
import {Input} from 'common/form/input'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {StyledTypeBussiness, StyledInforShop} from './_styled'
import useSurveyLoginContext from './hooks/_context'
import useSurveyLogin from './hooks/index'
import {Button} from 'common/button'
import {useForm} from "react-hook-form";
import {InfoAddress as Address} from './templates/_address'
import {InfoDistrict as District} from './templates/_district'
import {InfoProvince as Province} from './templates/_province'
import {InfoWard as Ward} from './templates/_ward'
import {sendRequestAuth} from "../../api/api";
import config from "../../config";
import toast from "Component/Toast";


const TypeBusiness = ({...props}) => {

  const [state, dispatch]= useSurveyLoginContext();
  const {functions,methods} = useSurveyLogin()
  useEffect(() => {
    functions.getListBusiness();
  },[]);

  return (
    <StyledTypeBussiness>
    <div className='survey_login_body'>
      <div className='survey_login_body_ln1'>
      { state.listBusiness.length > 0 && (state.listBusiness.map((row, index) => (

          <div className={state.typeMajors != row.id ? 'survey_login_body_item item_'+(index+1) :'survey_login_body_item item_'+(index+1)+' fl_checked'} key={index} >
            <Checkbox className="survey_fl"
              checked={state.typeMajors == row.id ? true: false}
              onClick={ (e)=>{
                if(row.id == state.typeMajors){
                  dispatch({type:"SET_TYPE_MAJORS", payload: ''})
                } else {
                  dispatch({type:"SET_TYPE_MAJORS", payload: row.id})
                }
              }
              }
            /> 
            <div className={"survey_login_body_item_text text_"+(index+1)}
            onClick={ (e)=>{
              if(row.id == state.typeMajors){
                dispatch({type:"SET_TYPE_MAJORS", payload: ''})
              } else {
                dispatch({type:"SET_TYPE_MAJORS", payload: row.id})
              }
            }
            }
            >{row.name}</div>
          </div>
      )))
      }
      </div>
    </div>
    <div className='survey_login_footer'>
      <div className=''>
        <Button className="survey_login_footer_button" 
          appearance="primary" 
          disabled={state.typeMajors != 0 ? false: true}
          onClick={()=>{
            dispatch({type:"SET_TYPE_FORM",payload:2})
            methods.defineData(props.dataForm)
          }}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
    </StyledTypeBussiness>
  )
}

const InforShop = ({...props}) => {

  const [state, dispatch]= useSurveyLoginContext();
  const {functions} = useSurveyLogin();
  const [errors,setErrors] =useState({});
  const checkProperties = (obj) => {
      let ra= true;
      Object.keys(obj).map(function(key) {
          if(key !='email' && (obj[key] == null || obj[key] == "")){
            ra = false;
          }
      });
      return ra;
  }
  const { register, handleSubmit} = useForm({
    mode: 'all'});
  const onSubmit = async data => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/shop/update-address`,
      state.dataUpdate
    )
    if (response?.status === 200) {
      toast.success('Cập nhật thông tin cửa hàng thành công!')
      window.location.reload()
    } else {
      toast.error('TCập nhật thông tin cửa hàng thất bại!')
    }
  }
  return (
    <StyledInforShop>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='survey_infor'>
          <div className="survey_infor_form">
            <Input
                className="survey_infor_name"
                label={
                  <>
                    Tên cửa hàng <span style={{color: THEME_SEMANTICS.failed}}>*</span>
                  </>
                }
                placeholder="Nhập tên cửa hàng"
                validateText={state.dataUpdate.shopname == '' ? "Vui lòng nhập tên cửa hàng" :""}
                validateType="danger"
                value={state.dataUpdate.shopname}
                onBlur={e => {
                  dispatch({type: 'SET_SHOPNAME_UPDATE', payload: e.target.value})
                }}
                onChange={e => {
                  dispatch({type: 'SET_SHOPNAME_UPDATE', payload: e.target.value})
                }}
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
              />
              <div className='survey_infor_group_pe'>
              <Input
                className="survey_infor_phone"
                label="Điện thoại"
                disabled={true}
                onChange={()=>{}}
                value={props.dataForm.phone}
              />
              <Input
                className="survey_infor_email"
                label="Email"
                placeholder="Nhập email cửa hàng"
                value={state.dataUpdate.email}
                onChange={e => {
                  dispatch({type: 'SET_EMAIL_UPDATE', payload: e.target.value})
                }}
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
              />
              </div>
              <div className="survey_infor_address" data-size="xl">
                <Address className="survey_infor_address" />
              </div>
              <div className="survey_infor_group_pe" data-size="xl">
                  <Province className={(errors.city_id) && state.dataUpdate.city_id == '' ? "survey_infor_phone survey_input_validate_err" : "survey_infor_phone"}
                  onClick={e => {
                    state.dataUpdate.city_id == '' ? setErrors({city_id:"Vui lòng nhập tỉnh, thành phố"}) : setErrors({})
                  }}
                  />
                  <District className={((errors.district_id) && state.dataUpdate.district_id == '')  ? "survey_infor_district survey_input_validate_err" : "survey_infor_district" } 
                    onClick={e => {
                      state.dataUpdate.district_id == '' ? setErrors({district_id:"Vui lòng nhập quận huyện"}) : setErrors({})
                    }}
                  />
                  <Ward className={((errors.ward_id) && state.dataUpdate.ward_id == '') ? "survey_infor_district survey_input_validate_err" : "survey_infor_district"}
                    onClick={e => {
                    state.dataUpdate.ward_id == '' ? setErrors({ward_id:"Vui lòng nhập phường xã"}) : setErrors({})
                  }}
                  />
              </div>
              <div>
              {((errors.city_id) && state.dataUpdate.city_id == '' ) && <span className="survey_input_validate">{errors.city_id}</span>}
              {((errors.district_id) && state.dataUpdate.district_id == '' ) && <span className="survey_input_validate">{errors.district_id}</span>}
              {((errors.ward_id) && state.dataUpdate.ward_id == '')  && <span className="survey_input_validate">{errors.ward_id}</span>}
              </div>
              <div className="survey_infor_cbx_default" >
                <Checkbox className="survey_fl"
                  checked={true}
                  disabled={true}
                /> 
                <div className="">EVO sẽ lấy địa chỉ trên làm điểm gửi hàng cho cửa hàng của bạn</div>
              </div>
          </div>
      </div>
      <div className='survey_login_footer'>
        <div className=''>
          <Button className="survey_login_footer_button" appearance="primary" disabled={checkProperties(state.dataUpdate) == true? false: true}>Bắt đầu kinh doanh</Button>
        </div>
      </div>
    </form>
    </StyledInforShop>
  )
}


const SURVEYLOGIN_COMPONENTS = {TypeBusiness,InforShop}

export default SURVEYLOGIN_COMPONENTS
