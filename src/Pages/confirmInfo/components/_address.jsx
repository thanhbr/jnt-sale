import {ClickAwayListener} from '@mui/material'
import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import useConfirmInfo from 'Pages/confirmInfo/hooks/useConfirmInfo'
import {ICONS} from 'Pages/confirmInfo/interface/_icons'
import {useState} from 'react'
import styled from 'styled-components'

export const Address = ({...props}) => {
  const {data, errorSeparate, properties, methods} = useConfirmInfo()
  const {address} = data
  const [openTooltip, setOpenTooltip] = useState(false)
  return (
    <StyledAddress>
      <Input
        {...props}
        className="confirm-info-address"
        button={
          <>
            <Tooltip
              open={openTooltip}
              onClose={() => setOpenTooltip(false)}
              // disableFocusListener
              // disableHoverListener
              // disableTouchListener
              placement="top-end"
              className='tooltip-error'
              title={
                errorSeparate
                  ? 'Hệ thống chưa nhận diện dc địa chỉ này, hãy kiểm tra lại hoặc tự chọn địa chỉ ở bên dưới bạn nhé'
                  : ''
              }
            >
              <Button
                disabled={!properties.canSplitAddress}
                icon={ICONS.target}
                onClick={e => {
                  e.preventDefault()
                  setOpenTooltip(true)
                  methods.onAddressSplit(address.value)
                }}
              >
                Tách
              </Button>
            </Tooltip>
          </>
        }
        label={
          <div style={{fontSize: 14}}>
            Địa chỉ cửa hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
          </div>
        }
        onInputBlur={e => {
          const val = e.target.value.trim()
          methods.onAddressValidate(val)
          props.setIsTouch(true)
        }}
        maxLength={256}
        placeholder="Số nhà, tên đường, phường/xã, thôn/xóm, bệnh viện,.."
        value={address.value}
        onChange={e => methods.onAddressChange(e.target.value)}
        validateText={props.validate?.address}
        validateType="danger"
        validateProps={{style: {marginBottom: errorSeparate ? 17 : 0}}}
      />
    </StyledAddress>
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

  .confirm-info-address {
    margin-bottom: 17px;
    &[data-error-separate='true'] {
      margin-bottom: 34px;
    }

    .input__input {
      background: #f3f3f4;
    }

    .input__button,
    .input__input {
      height: 44px;
      margin: 8px 0;
    }

    .input__label {
      margin: 0;
      font-site: 14px !important;
    }

    .input__dropdown {
      padding: 0px;
    }
  }

  .input__validate {
    width: 100% !important;
    top: calc(97% + 0px) !important;
  }
`
