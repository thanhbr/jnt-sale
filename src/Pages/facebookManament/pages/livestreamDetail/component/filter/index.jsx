import { ConversationSearch } from './conversationSearch'
import { ExtraSort } from './extraSort'

export const LeftFilterConverSation = () => {
  return (
    <div style={{padding: '0 8px'}}>
      <ConversationSearch/>
      <ExtraSort/>
    </div>
  )
}