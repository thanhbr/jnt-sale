import React, {useState} from 'react';
import {Grid} from "@mui/material";
import {Text} from "../../../../../common/text";
import {POS_ICON} from "../../../constants/icons";
import {formatMoney} from "../../../../../util/functionUtil";
import {Tooltip} from "../../../../../common/tooltip";
import {Popper} from "../../../../../common/popper";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import usePosPayment from "../../../hooks/usePosPayment";
import {CurrencyInput} from "./_currentInput";
import Popover from '@mui/material/Popover';
import {StyledDropdown} from "../styled";

const Provisional = () => {
  const {products, calc, methods, priceType} = usePosPayment()
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = (type) => {
    methods?.handleChangePriceType(type)
    setAnchorEl(null)
  }

  const handleFocusClick = (event) => {
    const {value} = event.target
    const position = value?.length || 0
    if(position === 1) event.target.setSelectionRange(position, position)
  }


  return (
    <>
      <Grid xs={6} sm={6} md={6} lg={6} item>
        <Text as={'p'}
              fontWeight={600}
              lineHeight={'140%'}
              style={{marginBottom: 8}}
        >Thanh toán</Text>
        <Text as={'p'}
              color={'#7C88A6'}
              lineHeight={'140%'}
              style={{marginBottom: 12}}
        >Tạm tính ({products.length} sản phẩm):</Text>
        <Text as={'p'}
              color={'#7C88A6'}
              lineHeight={'140%'}
              style={{marginBottom: 18}}
        >Giảm giá trên đơn hàng (F6):</Text>
        <Text as={'p'}
              fontWeight={600}
              lineHeight={'140%'}
        >Khách phải trả</Text>
      </Grid>
      <Grid xs={6} sm={6} md={6} lg={6} item>
        <div className={'content-pos--body-payment'}>
          <div className={'content-pos--body-payment-type'}>
            <Text
              color={'#1A94FF'}
              fontWeight={600}
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              as={'a'}
            >
              {priceType === 2 ? 'Giá bán sỉ' : 'Giá bán lẻ'}
            </Text>
            {POS_ICON.ct_dropDown}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => handleClose(priceType)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{marginTop: 1, marginLeft: -1}}
            >
              <StyledDropdown>
                <Text
                  as={'button'}
                  data-active={priceType === 1}
                  onClick={() => {
                    handleClose(1)
                  }}
                >Giá bán lẻ</Text>
                <Text
                  as={'button'}
                  data-active={priceType === 2}
                  onClick={() => {
                    handleClose(2)
                  }}
                >Giá bán sỉ</Text>
              </StyledDropdown>
            </Popover>
          </div>
          <div className={'content-pos--body-payment-price'}>
            <Text>{formatMoney(calc?.provisional || 0)}</Text>
          </div>
          <div className="content-pos--body-payment__discount">
            <div className="content-pos--body-payment__discount-input">
              <DiscountInput
                defaultValue={calc.discount?.value || 0}
                triggerDefault={calc.discount?.trigger}
                // discountPrice={calculateDiscountPrice}
                typeValue={calc?.discount?.type || '%'}
                warning={
                  calc?.discount?.type === 'đ'
                    ? Number(calc.discount?.value || 0) > calc.provisional
                    : Number(calc.discount?.value || 0) > 100
                }
                onChange={value => methods?.handleDiscountChange(value)}
                onTypeChange={value => methods?.handleDiscountTypeChange(value)}
                onClick={e => handleFocusClick(e)}
              />
            </div>
          </div>
          <div>
            <Text fontWeight={600} fontSize={18}>{formatMoney(calc?.guestMustPay || 0)}</Text>
          </div>
        </div>
      </Grid>
    </>
  )
}

export default Provisional

const DiscountInput = ({
                         typeValue,
                         discountPrice,
                         warning,
                         onTypeChange,
                         ...props
                       }) => {
  const [isOpenType, setIsOpenType] = useState(false)

  const handleTypeChange = (val, { onClose }) => {
    onTypeChange(val)
    onClose()
    setIsOpenType(false)
  }
  return (
    <Tooltip
      className="--danger"
      placement="bottom"
      title={warning && !isOpenType ? 'Mức giảm giá cần ≤ Tạm tính' : ''}
    >
      <CurrencyInput
        {...props}
        icon={
          <Popper
            renderPopper={({ onClose }) => (
              <div className="content-pos--body-payment__discount-type-dropdown-menu">
                {typeValue !== 'đ' && (
                  <div
                    className="content-pos--body-payment__discount-type-dropdown-menu-item"
                    style={{
                      color: THEME_COLORS.secondary_100,
                      textDecoration: 'underline',
                    }}
                    onClick={() => handleTypeChange('đ', { onClose })}
                  >
                    đ
                  </div>
                )}
                {typeValue !== '%' && (
                  <div
                    className="content-pos--body-payment__discount-type-dropdown-menu-item"
                    style={{ color: THEME_COLORS.secondary_100 }}
                    onClick={() => handleTypeChange('%', { onClose })}
                  >
                    %
                  </div>
                )}
              </div>
            )}
            renderToggle={({ open }) => (
              <div className="content-pos--body-payment__discount-type-dropdown-toggle">
                <Text as="b" color={THEME_COLORS.primary_300}>
                  {typeValue}{' '}
                  <i data-active={open}>{POS_ICON.ct_caretUp}</i>
                </Text>
              </div>
            )}
            popperProps={{ style: {} }}
          />
        }
        validateText={
          typeValue === '%' && discountPrice && !isNaN(discountPrice) ? (
            `Giảm ${formatMoney(Math.max(discountPrice, 0))}`
          ) : warning ? (
            <></>
          ) : (
            ''
          )
        }
        validateProps={{ style: { left: 'unset', right: 0 } }}
        validateType={warning ? 'danger' : 'default'}
        style={{ zIndex: 1, textAlign: 'right', ...props?.style }}
        onIconClick={() => setIsOpenType(true)}
        refType={'discount'}
      />
    </Tooltip>
  )
}