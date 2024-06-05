import { Calendar } from '../filter/calendar'
import { ReadStatus } from '../filter/readStatus'
import { Phone } from '../filter/phone'
import { Star } from '../filter/star'
import { TagsCustomer } from '../filter/tags'
import { ICON_FILTER } from '../../interface/icon'
import { UserGroup } from '../filter/userGroup'
import { OrderStatus } from '../filter/orderStatus'

export const FilterContent = () => {
  return (
    <div className={'filter-content'}>
      <div className={'filter-content__item'}>
        <div className="filter-content__item-icon">
          {ICON_FILTER.dots}
        </div>
      </div>
      <UserGroup/>
      <Calendar/>
      <ReadStatus/>
      <Phone/>
      <TagsCustomer/>
      <OrderStatus/>
      <Star/>
    </div>
  )
}