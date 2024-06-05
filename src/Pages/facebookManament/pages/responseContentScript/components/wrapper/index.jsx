import {useEffect} from 'react'
import useFacebookResponseContentScript from '../../hooks/useFacebookResponseContentScript'
import {FacebookResponseContentScriptTable} from '../table'
import {FacebookResponseContentScript__SearchInput} from '../__searchInput'
import {StyledFacebookResponseContentScriptWrapper} from './_styled'

export const FacebookResponseContentScriptWrapper = ({...props}) => {
  const {data, methods} = useFacebookResponseContentScript()

  useEffect(() => {
    methods.getScripts({origin: true})
  }, [])

  return (
    <StyledFacebookResponseContentScriptWrapper {...props}>
      <div style={{width: 392, margin: '0 0 24px 24px'}}>
        <FacebookResponseContentScript__SearchInput
          onChange={e => methods.handleSearchChange(e.target.value)}
        />
      </div>
      <FacebookResponseContentScriptTable rows={data.script.list} />
    </StyledFacebookResponseContentScriptWrapper>
  )
}
