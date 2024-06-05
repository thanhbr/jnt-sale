import config from 'config'
import {sendRequestAuth} from 'api/api'
import {Text} from 'common/text'
import {Input} from 'common/form/input'
import {Button} from 'common/button'
import {useContext, useEffect} from 'react'
import {ShippingTrackingContent} from '../content'
import {ShippingTrackingContext} from 'Pages/shippingTracking'
import {StyledShippingTrackingBody} from './_styled'
import {actions} from '../../_reducer'
import {SHIPPING_ICONS} from 'Pages/shippingTracking/_icons'
import { useSearchParams } from 'react-router-dom'

export const ShippingTrackingBody = ({...props}) => {
  const {pageState, pageDispatch} = useContext(ShippingTrackingContext)
  const {keyword} = pageState
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? ''
  const handleChange = e => {
    var value = e.target.value
    value = value.replace(/\s+/g, ',')
    value = value.replace(/,+/g, ',')
    pageDispatch({
      type: actions.CHANGE_KEYWORD,
      payload: {
        keyword: value,
      },
    })
  }
  useEffect( () => {
    if(!!search) {
      handleTracking(search)
      pageDispatch({
        type: actions.CHANGE_KEYWORD,
        payload: {
          keyword: search,
        },
      })
    }
  }, [])

  const handleClearKeyword = () => {
    pageDispatch({type: actions.CLEAR_KEYWORD})
  }

  const handleTracking = async (search='') => {
    let billcodes = ''
    if (!!search) billcodes = search
    else{
      if (!keyword) return
      billcodes = keyword
    }
    pageDispatch({type: actions.FETCH_LOADING})

    const response = await sendRequestAuth(
      'get',
      `${config.API}/tool/shipping/tracking?billcodes=${billcodes}`,
    )

    if (response?.status !== 200) return

    const data = response?.data?.data || []

    pageDispatch({
      type: actions.FETCH_BILLCODE,
      payload: {
        data: data,
        position: 0,
      },
    })
  }

  return (
    <StyledShippingTrackingBody {...props}>
      <div className="shipping-tracking-tool-body__heading">
        <Text>
          Nhập mã vận đơn (cách nhau bởi dấu phẩy) để thực hiện tra cứu (tối đa
          10 vận đơn/1 lần tra cứu):
        </Text>
        <div className="bt-filter__header">
          <div className="bt-filter__header-input">
            {keyword ? (
              <Input
                placeholder="802000260582,802000260582,.."
                onChange={handleChange}
                icon={SHIPPING_ICONS.delete}
                onIconClick={handleClearKeyword}
                value={keyword}
                onKeyDown={e => {
                  if (e.key === 'Enter') return handleTracking()
                }}
              />
            ) : (
              <Input
                placeholder="802000260582,802000260582,.."
                onChange={handleChange}
                value={keyword}
              />
            )}
          </div>
          <Button
            className="bt-filter__action-btn"
            appearance="primary"
            onClick={() => handleTracking()}
          >
            Tra cứu
          </Button>
        </div>
      </div>
      <div className="shipping-tracking-tool-body__content">
        <ShippingTrackingContent />
      </div>
    </StyledShippingTrackingBody>
  )
}
