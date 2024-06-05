import { ICON_CONVERSATION } from '../../../interface/icon'
import { Text } from '../../../../../../../common/text'

export const TagCustomer = () => {

  const list = Array.from(Array(5).keys())
  return (
    <div style={{display: 'flex'}}>
      <div style={{marginRight: '6px'}}>
        {ICON_CONVERSATION.plusTag}
      </div>
      {list.map((item) =>
        <div style={{marginRight: '6px'}}>
          <Text color={'#ffffff'} style={{background: '#0086FF', borderRadius: '4px', padding : '5px 8px'}} fontSize={'12px'} lineHeight={'150%'}>Tiềm năng {item}</Text>
        </div>
      )}
    </div>
  )
}