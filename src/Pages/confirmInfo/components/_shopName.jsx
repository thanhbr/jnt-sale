import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useConfirmInfo from 'Pages/confirmInfo/hooks/useConfirmInfo'
import {ICONS} from 'Pages/confirmInfo/interface/_icons'
import styled from 'styled-components'

export const ShopName = ({...props}) => {
  const {data, properties, methods} = useConfirmInfo()
  const {shopName} = data

  return (
    <StyledAddress>
      <Input
        {...props}
        className="confirm-info-shop-name"
        dropdown={() => (
          <div>
            {data?.suggestAddress?.length > 0 && (
              <div className="suggest-search-list">
                {data.suggestAddress.map(item => (
                  <Item
                    key={item?.value}
                    data={item}
                    onClick={() => {
                      methods.onSuggestAddressValidate(item)
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        label={
          <div style={{fontSize: 14}}>
            Địa chỉ cửa hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
          </div>
        }
        placeholder="Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,.."
        value={shopName.value}
        onChange={e => methods.onAddressChange(e.target.value)}
        validateText={props.validate?.shopName}
        validateType="danger"
      />
    </StyledAddress>
  )
}
const Item = ({data, ...props}) => {
  return (
    <div
      {...props}
      className={`suggest-search-list__item ${props?.className || ''}`}
    >
      <div className="suggest-search-list__info">
        <div className="suggest-search-list__name">
          {data?.suggest}, {data?.ward_name} ,{data?.district_name},{' '}
          {data?.city_name}
        </div>
        <div className="suggest-search-list__name_sm">
          {data?.ward_name}/{data?.district_name}/{data?.city_name}
        </div>
      </div>
    </div>
  )
}
const StyledAddress = styled.div`
  .suggest-search-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 16px;

    &__info {
      &:hover {
        cursor: pointer;
      }
    }

    &__item {
      gap: 2px;
      isolation: isolate;

      width: 571px;
      height: 55px;
    }
    &__name {
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      color: #00081d;

      &_sm {
        font-weight: 400;
        font-size: 12px;
        line-height: 140%;
        color: #7c88a6;
      }
    }
  }
  .confirm-info-shop-name {
    margin-bottom: 17px;

    .input__input {
      background: #f3f3f4;
    }

    .input__button,
    .input__input {
      height: 44px;
      margin: 0.6rem 0;
    }

    .input__label {
      margin: 0;
      font-site: 14px !important;
    }

    .input__dropdown {
      padding: 0px;
    }
  }
`
