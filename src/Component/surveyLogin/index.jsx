import React from 'react'
import {SurveyContext} from './hooks/_context'
import {SurveyBodyLogin} from './body'
// #lib
export const SurveyLogin = ({...props}) => 
{
  return (
    <SurveyContext>
      <SurveyBodyLogin dataForm={props.dataForm} />
    </SurveyContext>
  )
}
