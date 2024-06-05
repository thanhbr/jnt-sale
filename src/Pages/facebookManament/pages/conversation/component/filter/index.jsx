import { ConversationSearch } from './conversationSearch'
import { TypeConversation } from './typeConversation'

export const LeftFilterConverSation = () => {
  return (
    <div style={{padding: '0 8px'}}>
      <ConversationSearch/>
      <TypeConversation/>
    </div>
  )
}