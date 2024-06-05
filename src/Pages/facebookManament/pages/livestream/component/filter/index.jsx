import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {orderActions} from 'Pages/refactorOrder/provider/_reducer'
import {transformOriginData} from 'Pages/refactorOrder/utils/transform'
import {memo, useContext, useEffect, useReducer, useState} from 'react'
import {FilterTags} from '../FilterTags'
import {OrderDateTime} from './_orderDateTime'
import {OrderSearch} from './_orderSearch'
import {StyledOrderFilterForm} from './_styled'
import useFacebookFilterForm from '../../hooks/useFacebookFilterForm'
import {FacebookLivestreamContext} from '../../provider/_context'
import {StatusOption} from './_statusOption'
import {OrderPost} from './_orderPost'
import {Input} from 'common/form/input'
import {ICON_FILTER} from '../../interface/icon'
import {Text} from 'common/text'
export const FilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = useFacebookFilterForm()

  const {pageState, pageDispatch} = useContext(FacebookLivestreamContext)
  const {syncVideo} = pageState

  const [shouldCollapse, setShouldCollapse] = useState(false)

  const [showSync, setShowSync] = useState(false)

  return (
    <StyledOrderFilterForm {...props}>
      <div className="livestream-filter-facebook-form__group">
        <div className="livestream-filter-facebook-form__group-child">
          <OrderSearch />
          {/*<OrderAdvancedSearch />*/}
          <Button
            appearance="secondary"
            badge={
              badge.others > 0
                ? badge.others > 9
                  ? '9+'
                  : badge.others
                : undefined
            }
            badgeType="danger"
            icon={ORDER_ICONS.filterFunnel02}
            size="md-"
            onClick={() => setShouldCollapse(!shouldCollapse)}
            style={{marginRight: 12, marginLeft: 12}}
          >
            Bộ lọc khác
          </Button>
          {shouldCollapse && (
            <Button
              appearance="secondary"
              disabled={!canSubmitOtherFilter}
              size="md-"
              onClick={() =>
                canSubmitOtherFilter && functions.applyOrderOtherFilter()
              }
            >
              Áp dụng
            </Button>
          )}
        </div>
        {showSync ? (
          <Input
            {...props}
            className={'livestream-filter-facebook-form__input-video'}
            button={
              <Button
                disabled={!syncVideo?.search}
                className="livestream-filter-facebook-form__btn-video"
                icon={ICON_FILTER.refresh}
                onClick={() => functions.handleVideoLivestreamSync(syncVideo?.search)}
              >
                Tải video
              </Button>
            }
            placeholder="Nhập ID livestream"
            value={syncVideo?.search}
            onChange={e => functions.onChangeSyncVideo(e.target.value)}
          />
        ) : (
          <div
            className="livestream-filter-facebook-form__video-question"
            onClick={() => setShowSync(true)}
          >
            {ORDER_ICONS.question_blue}{' '}
            <Text style={{paddingLeft: '4px', cursor: 'pointer'}}>
              Bạn không tìm thấy video cần xem?
            </Text>
          </div>
        )}
      </div>

      <div
        className="livestream-filter-facebook-form__group livestream-filter-facebook-form__collapse"
        data-collapse={shouldCollapse}
      >
        <OrderDateTime />
        <StatusOption />
      </div>
      <div
        className="livestream-filter-facebook-form__group"
        style={{marginBottom: 4}}
      >
        <FilterTags />
      </div>
    </StyledOrderFilterForm>
  )
})
