import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {useState} from 'react'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'

export const ScriptNameInput = ({width,...props}) => {
  const {data, methods} = useCreateFacebookAutoResponses()
  const {scriptName} = data
  return (
    <div style={{width: width}}>
      <Input
        {...props}
        label={
          <>
            Tên kịch bản <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        }
        placeholder="Nhập tên kịch bản"
        value={scriptName}
        onChange={e => methods.onScriptNameChange(e.target.value)}
        onBlur={_ => methods.onValidateScriptName(scriptName !== '' ? true : false )}
        validateText={data.validate?.basicInfo?.scriptName}
        validateType="danger"
      />
    </div>
  )
}
