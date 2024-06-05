import React from 'react'
import {StyledSurveyLogin} from './_styled'
import { Box } from '@material-ui/core'
import {Button} from '../../common/button'
import SURVEYLOGIN_COMPONENTS from './_components'
import useSurveyLoginContext from './hooks/_context'
import UseSurveyLogin from './hooks/index'
import {useForm} from "react-hook-form";

// #lib
export const SurveyBodyLogin = ({...props}) => 
{
  const {TypeBusiness, InforShop} = SURVEYLOGIN_COMPONENTS
  const [state, dispatch]= useSurveyLoginContext();
  return (
      <StyledSurveyLogin>
        <div className='survery-conf'>
        <Box className={ state.typeForm == 1 ?  "survey_login" : "survey_login info_form"} >
            <div className={ state.typeForm == 1 ?  "survey_login_header" : "survey_login_header info_hd_form"} >
              <div className='survey_login_header_ln1'>
                <div className='survey_login_header_ln_w1 color_txt_gr'>
                  <div className='survey_login_header_bg_number_1'>1</div> 
                  <div className='survey_login_header_text_1'>Ngành hàng kinh doanh</div>
                </div>
                <div className={state.typeForm != 2 ? 'rectag' :'rectag color_bg_gr'}></div>
                <div className={state.typeForm != 2 ? 'survey_login_header_ln_w2 color_txt_xa' : 'survey_login_header_ln_w2 color_txt_gr'}>
                  <div className={state.typeForm != 2 ? 'survey_login_header_bg_number_2' : 'survey_login_header_bg_number_1'}>2</div> 
                  <div className='survey_login_header_text_2'>Thông tin cửa hàng</div>
                </div>
              </div>
              {
                state.typeForm == 1 ? 
                <div className='survey_login_header_ln2'>
                  Bạn đang kinh doanh ngành hàng nào?
                </div> :
                <div className='survey_login_header_ln3'>
                Thêm thông tin cửa hàng của bạn để bắt đầu kinh doanh nào
                </div>
              }
            </div>
            {
                state.typeForm == 1 ? 
                <TypeBusiness dataForm={props.dataForm} /> : <InforShop dataForm={props.dataForm}/>
            }

        </Box>
        </div>
      </StyledSurveyLogin>
  )
}
