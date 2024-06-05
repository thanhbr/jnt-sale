import useFacebookFanpage from '../../hooks/useFacebookFanpage'
import {FacebookFanpage__AddCard} from '../_addCard'
import {FacebookFanpage_Card} from '../_card'
import {StyledFacebookFanpageCardList} from './_styled'
import useGlobalContext from '../../../../../../containerContext/storeContext'

export const FacebookFanpageCardList = ({list, ...props}) => {
  const {data, properties, methods} = useFacebookFanpage()
  const {filter, fanpage} = data
  const [GlobalState] = useGlobalContext()
  const checkIsChecked = obj => {
    if(GlobalState.facebook.fanpage.length > 0){
      return  !!GlobalState.facebook.fanpage.find(
        find => obj?.page_id && find?.page_id === obj.page_id,
      )
    }else{
      return !!fanpage.selected.find(
        find => obj?.page_id && find?.page_id === obj.page_id,
      )
    }
  }

  return (
    <StyledFacebookFanpageCardList {...props}>
      <div className="facebook-fanpage-card-list__container">
        {list.map(item => (
          <div key={item?.page_id} className="facebook-fanpage-card-list__item">
            <FacebookFanpage_Card
              data={item}
              checked={checkIsChecked(item)}
              disabled={
                !checkIsChecked(item)
                  ? item.connected
                    ? false
                    : !properties.canSelectDisconnectedFanpage
                  : false
              }
              onDeleteLink={() => methods.setModal('deleteLink')}
              onToggle={() => methods.toggleSelectedFanpage(item)}
            />
          </div>
        ))}
        {filter.connected &&
          properties.isExistedDisconnectedFanpage &&
          list.length < fanpage.maxConnection && (
            <div className="facebook-fanpage-card-list__item">
              <FacebookFanpage__AddCard
                onClick={() => {
                  methods.toggleFilterConnected(false)
                  methods.unselectAllConnectedFanpages()
                }}
              />
            </div>
          )}
      </div>
    </StyledFacebookFanpageCardList>
  )
}
