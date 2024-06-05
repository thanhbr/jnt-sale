import { Input } from 'common/form/input'
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'
import { ICON_CONVERSATION } from '../../../interface/icon'
import { Text } from '../../../../../../../common/text'
import useFilterFacebookConversation from '../../../hooks/useFilterFacebookConversation'

export const TypeConversation = () => {
  // const {search} = useDeliveryFilterForm()
  const { data , methods } = useFilterFacebookConversation()
  const {meta,filter} = data
  const typeConversation = [
    {id: 0, name: 'Tất cả', icon: (ICON_CONVERSATION.allConversation), unread: meta?.unread?.all},
    {id: 1, name: 'Tin nhắn', icon: (ICON_CONVERSATION.message), unread: meta?.unread?.messages},
    {id: 2, name: 'Bình luận', icon: (ICON_CONVERSATION.comment), unread: meta?.unread?.comments},
  ]
  return (
    <StyledTypeConversation>
      {
        typeConversation.map((item,index) =>
          <div className={'tab-conversation'} key={index} onClick={() => methods.handleTypeChange(item.id)} data-active={filter.conversation.type == item.id ? true : false}>
            {item.icon}
            <Text className={'tab-conversation__label-type'} color={'#7C88A6'} fontWeight={400} style={{margin: '0 2px 0 6px'}}>{item.name}</Text>
            <Text fontWeight={600} color={'#ffffff'} lineHeight={'150%'} fontSize={10}
                  style={{
                    background: '#FF424F', padding: '1px 4px', borderRadius: '8px',
                    border: '1px solid #FFFFFF',  textAlign: 'center',
                    maxWidth: '35px',
                    minWidth: '20px'
                  }}>{item.unread}</Text>
          </div>
        )
      }
    </StyledTypeConversation>
  )
}

const StyledTypeConversation = styled.div`
  display: flex;
  margin: 8px 0;
  .tab-conversation{
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 7px 0;
    justify-content: center;
    width: 33.33%;
    :hover{
      cursor: pointer;
    }
    &[data-active='true']{
      background: #EFF3FB;
      .tab-conversation__label-type{
        color: #1e9a98!important;
        font-weight: 600!important;
      }
      svg{
        color: #1e9a98;
        path[stroke] {
          stroke: #1e9a98;
        }
        path[fill] {
          fill: #1e9a98;
        }
      }
    }
    :hover{
      background: #EFF3FB;
      .tab-conversation__label-type{
        color: #1e9a98!important;
      }
      svg{
        color: #1e9a98;
        path[stroke] {
          stroke: #1e9a98;
        }
        path[fill] {
          fill: #1e9a98;
        }
      }
    }
  }

`