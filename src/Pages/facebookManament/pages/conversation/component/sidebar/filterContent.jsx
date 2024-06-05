import useFilterFacebookConversation from '../../hooks/useFilterFacebookConversation'
import { Calendar } from '../filter/calendar'
import { ReadStatus } from '../filter/readStatus'
import { Phone } from '../filter/phone'
import { Star } from '../filter/star'
import { TagsCustomer } from '../filter/tags'
import { Post } from '../filter/post'
import { ICON_FILTER } from '../../interface/icon'

export const FilterContent = () => {
  return (
    <div className={'filter-content'}>
      <div className={'filter-content__item'}>
        <div className="filter-content__item-icon">
          {ICON_FILTER.dots}
        </div>
      </div>
      <Calendar/>
      <ReadStatus/>
      <Phone/>
      <TagsCustomer/>
      <Post/>
      <Star/>
    </div>
  )
}