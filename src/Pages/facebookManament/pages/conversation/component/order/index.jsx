import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Input} from 'common/form/input'
import {CategoryInput} from 'common/form/input/_categoryInput'
import {CurrencyInput} from './_currencyInput'
import {Textarea} from 'common/form/textarea'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {Payment} from './payment'
import {Section} from './section'
import {ConfigGroup} from './ShippingConfig'
import {ShippingPartner} from './ShippingPartner'
import {OrderNote} from './_NoteTextarea'
import {PricePolicyAutoComplete} from './_pricePolicyAutoComplete'
import {ProductSearchInput} from './_productSearchInput'
import {ProductTable} from './_productTable'
import {ShippingPointAutoComplete} from './_ShippingPointAutoComplete'
import {StyledDrawerOrderTab} from './_styled'
import {WarehouseAutoComplete} from './_warehouseAutoComplete'
import React, {useState} from 'react'
import {SuccessfulOrder} from './successfulOrderModal'
import {Switch} from '../../../../../../common/switch'
import useAlert from '../../../../../../hook/useAlert'
import useFacebookOrderShippingInfo from '../../hooks/useFacebookOrderShippingInfo'
import {ICONS_CUSTOMER_INFOR} from "../../interface/icon";
import {EmptyShippingPartner} from "./emptyShippingPartner";
import {Tooltip} from "../../../../../../common/tooltip";
import {ORDER_SINGLE_ICONS} from "../../../../../orderSingle/interface/_icons";

const largeBlank = Array.from(Array(300), () => ' ').join('')

export const DrawerOrderTab = ({...props}) => {
  const {data, methods, productMethods, shippingMethods, properties, loading, } = useFacebookConversationOrder()
  const shipping = useFacebookOrderShippingInfo()
  const [dataOrder, setDataOrder] = useState()
  const {productInfo, shippingInfo} = data
  const {showAlert} = useAlert()
  const [shouldOpenShippingConfigCollapse, setShouldOpenShippingConfigCollapse] = useState(true)
  const [shouldOpenPaymentCollapse, setShouldOpenPaymentCollapse] = useState(true)

  const createOrder = opt => {
    const response = methods.handleSubmit(opt)
    response.then(res => {
      if (!!res?.data) {
        setDataOrder({
          ...res.data,
          ...opt,
          isStorePickUp: shippingInfo.isStorePickUp,
        })
        if (res.data.success) {
          if (!!opt?.is_draft)
            showAlert({
              content: 'Tạo đơn nháp thành công',
              type: 'success',
              duration: 2000
            })
          if (!!opt?.is_delivery && shippingInfo.isStorePickUp)
            showAlert({
              content: 'Tạo đơn nhận tại cửa hàng thành công',
              type: 'success',
              duration: 2000
            })
          if (!!opt?.is_delivery && !shippingInfo.isStorePickUp)
            showAlert({
              content: 'Tạo đơn và gửi giao hàng thành công',
              type: 'success',
              duration: 2000
            })
        }
      }
    })
  }
  return (
    <StyledDrawerOrderTab
      {...props}
      className={`common-scrollbar ${props?.className || ''}`}
      id={'facebook-order_tab'}
    >

      <Section
        heading="Thông tin sản phẩm"
        // headerAction={
        //   <div
        //     style={{display: 'flex', alignItems: 'center'}}
        //     onClick={productMethods.onInventoryToggle}
        //   >
        //     <Checkbox checked={productInfo.inventory}/>
        //     <Text style={{marginLeft: 8, cursor: 'pointer'}}>
        //       Khấu trừ tồn kho
        //     </Text>
        //   </div>
        // }
      >
        {productInfo.inventory ? (
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div style={{width: 'calc(50% - 8px)', marginRight: 16}}>
              <WarehouseAutoComplete/>
            </div>
            <div style={{width: 'calc(50% - 8px)'}}>
              <PricePolicyAutoComplete/>
            </div>
            <div style={{width: '100%', marginTop: 16}}>
              <ProductSearchInput/>
            </div>
            <div style={{width: '100%', marginTop: 16}}>
              {productInfo.inventoryConfig.product.value.length > 0 ? (
                <ProductTable/>
              ) : (
                <div
                  style={{
                    minHeight: 172,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(244, 247, 252, 0.6)',
                    borderRadius: 6,
                  }}
                >
                  <Banner/>
                  <Text color="#7C88A6">Chưa có sản phẩm nào được chọn</Text>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Textarea
            placeholder={`Tên sản phẩm | số lượng.${largeBlank}Mỗi dòng 1 sản phẩm. VD: Sản phẩm ABC | 2`}
            value={productInfo.nonInventoryConfig.manual.value}
            style={{minHeight: 100, resize: 'none'}}
            onChange={e => productMethods.onNonInventoryChange(e.target.value)}
            validateText={shipping.data.validate?.productValidate}
            validateType="danger"
          />
        )}
      </Section>
      <Section
        heading="Hình thức thanh toán"
        headerAction={
          <div className={'collapse-action'}
               data-expand={shouldOpenPaymentCollapse}
               onClick={() => setShouldOpenPaymentCollapse(!shouldOpenPaymentCollapse)}
          >{ICONS_CUSTOMER_INFOR.up_arrow}</div>
        }
      >
        {shouldOpenPaymentCollapse && <Payment/>}
      </Section>
      <Section
        heading={(<div style={{display: 'flex', alignItems: 'center'}}>
          <Text as="h5" fontSize={15} lineHeight={21}>Sử dụng dịch vụ giao hàng</Text>
          {
            shippingInfo.shippingPartner.list?.length == 0 &&
            <div
              className={'order-single-shipping-info__reload'}
              onClick={shipping.methods?.onResetShippingPartner}
            >
              <Tooltip title={'Làm mới thông tin vận chuyển'}>
                {ORDER_SINGLE_ICONS.reset}
              </Tooltip>
            </div>
          }
        </div>)}
        headerAction={<Switch checked={true} disabled={true}/>}
      >
        {shippingInfo.shippingPartner.list?.length > 0
          ?
          <div
            style={{
              width: 'calc(100% + 16px)',
              margin: '0 -8px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{width: 'calc(100% / 2 - 16px)', margin: '0 8px 16px 8px'}}
            >
              <CurrencyInput
                labelTooltip={'Giá trị mà bạn cần đơn vị vận chuyển thu của khách hàng khi giao hàng.'}
                defaultValue={shippingInfo.cod}
                icon={
                  <Text as="u" color="#7C88A6">
                    đ
                  </Text>
                }
                iconProps={{style: {textAlign: 'right'}}}
                label={
                  <>
                    Tiền thu hộ <Text color={THEME_SEMANTICS.failed}>*</Text>
                  </>
                }
                onChange={shippingMethods.onCODChange}
                triggerDefault={properties.triggerDefault} 
                validateText={shipping.data.validate?.cod}
                validateType="danger"
              />
            </div>

            <div
              style={{width: 'calc(100% / 2 - 16px)', margin: '0 8px 16px 8px'}}
            >
              <Input
                value={shippingInfo.weight}
                iconProps={{style: {textAlign: 'right'}}}
                label={
                  <>
                    Trọng lượng (kg) <Text color={THEME_SEMANTICS.failed}>*</Text>
                  </>
                }
                onChange={e => shippingMethods.onWeightChange(e.target.value)}
                validateText={shipping.data.validate?.weight}
                validateType="danger"
                type={'number'}
                onWheel={() => document.activeElement.blur()}
              />
            </div>

            <div
              style={{
                width: 'calc(100% / 2 - 16px)',
                margin: '0 8px 16px 8px',
              }}
            >
              <ShippingPointAutoComplete/>
            </div>
            <div
              style={{width: 'calc(100% / 2 - 16px)', margin: '0 8px 16px 8px'}}
            >

              <div className={'shipping-partner-colslaps-container__right-item'}>
                <div className={'shipping-partner-colslaps-container__right-item-title'}
                     style={{
                       marginBottom: '8px',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'space-between'
                     }}
                >
                  <Text>Bảo hiểm hàng hóa {shippingInfo.shippingPartner.id == 2 &&
                  <Text color={'rgb(255, 66, 78)'}>*</Text>}</Text>
                  {shippingInfo.shippingPartner.id != 2 && <Switch
                    onChange={() => shipping.methods.onChangeCargoInsurrance(!shippingInfo?.cargoInsurrance?.active)}
                    defaultChecked={(shippingInfo?.cargoInsurrance?.active)}
                  />}
                </div>
                <div className={'shipping-partner-colslaps-container__right-item-desc'}>
                  <CurrencyInput
                    disabled={shippingInfo?.cargoInsurrance?.active || shippingInfo.shippingPartner.id == 2 ? '' : 'disabled'}
                    placeholder={'Nhập giá trị bảo hiểm'}
                    defaultValue={shippingInfo?.cargoInsurrance?.value}
                    icon={
                      <Text as="u" color="#7C88A6">
                        đ
                      </Text>
                    }
                    iconProps={{style: {textAlign: 'right'}}}
                    onChange={shipping.methods.setValueCargoInsurrance}
                    triggerDefault={shipping.scope.triggerDefault} 
                    validateText={(!!shippingInfo?.cargoInsurrance?.active || shippingInfo.shippingPartner.id == 2) ? shipping.data.validate?.cargoInsurrance : ''}
                    validateType="danger"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                width: 'calc(100% / 3 - 16px)',
                margin: '0 8px 16px 8px',
              }}
            >
              <CategoryInput
                categoryList={[]}
                categoryValue={{name: 'Dài', value: ''}}
                categoryWidth={45}
                value={shippingInfo.longs}
                iconProps={{style: {textAlign: 'right'}}}
                label="Kích thước (cm)"
                onChange={shippingMethods.onLengthChange}
                type={'number'}
              />
            </div>

            <div
              style={{
                width: 'calc(100% / 3 - 16px)',
                margin: '0 8px 16px 8px',
              }}
            >
              <CategoryInput
                categoryList={[]}
                categoryValue={{name: 'Rộng', value: ''}}
                categoryWidth={55}
                value={shippingInfo.width}
                iconProps={{style: {textAlign: 'right'}}}
                onChange={shippingMethods.onWidthChange}
                type={'number'}
              />
            </div>
            <div
              style={{
                width: 'calc(100% / 3 - 16px)',
                margin: '0 8px 16px 8px',
              }}
            >
              <CategoryInput
                categoryList={[]}
                categoryValue={{name: 'Cao', value: ''}}
                categoryWidth={50}
                value={shippingInfo.height}
                iconProps={{style: {textAlign: 'right'}}}
                onChange={shippingMethods.onHeightChange}
                type={'number'}
              />
            </div>
            <div
              style={{
                width: 'calc(100% - 16px)',
                margin: '0 8px 16px 8px',
              }}
            >
              <OrderNote/>
            </div>
            <div
              style={{
                width: 'calc(100% - 16px)',
                margin: '0 8px 16px 8px',
              }}
            >
              <ShippingPartner/>
            </div>
          </div>
          : <EmptyShippingPartner/>
        }
      </Section>
      <Section
        heading="Cấu hình đơn gửi vận chuyển"
        headerAction={
          <div className={'collapse-action'}
               data-expand={shouldOpenShippingConfigCollapse}
               onClick={() => setShouldOpenShippingConfigCollapse(!shouldOpenShippingConfigCollapse)}
          >{ICONS_CUSTOMER_INFOR.up_arrow}</div>
        }
      >
        {shouldOpenShippingConfigCollapse && <ConfigGroup/>}
      </Section>
      <div className="drawer-order-tab__footer">
        {dataOrder && <SuccessfulOrder data={dataOrder}/>}
        <Button appearance="ghost" onClick={() => createOrder({is_draft: 1})}>Lưu nháp</Button>
        <Button style={{marginLeft: 12}}
                onClick={() =>
                  properties.canSaveOrder && createOrder({is_delivery: 1})
                }
                disabled={!properties.canSaveOrder || !!loading}
        >Gửi đơn giao hàng</Button>
      </div>
    </StyledDrawerOrderTab>
  )
}

const Banner = () => (
  <svg
    width="129"
    height="128"
    viewBox="0 0 129 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M84.1677 22.2851C84.1677 22.2851 69.5565 40.7928 46.1788 29.7533C22.8011 18.7138 -0.576715 48.5853 19.5542 66.768C39.6851 84.9507 19.9855 94.9421 33.6616 106.086C49.2054 118.751 62.738 93.0679 75.0763 98.9125C102.307 111.811 122.481 106.705 117.936 91.7692C109.956 65.5514 99.7531 63.846 107.545 50.2088C115.338 36.5715 98.1397 8.21702 84.1677 22.2851Z"
      fill="#EEF1F7"
    />
    <path
      d="M65.0066 61.8449V100.674L34.8594 87.6522L35.0032 48.9639L65.0066 61.8449Z"
      fill="#E8EBF2"
    />
    <path
      d="M65.0078 61.8682V100.697L95.0085 88.1253V49.0879L65.0078 61.8682Z"
      fill="#F1F2F7"
    />
    <path
      d="M65.0066 61.8446L95.154 49.2175L65.2434 35.959L34.8594 48.9018L65.0066 61.8446Z"
      fill="#E0E2EE"
    />
    <path
      d="M26.6237 55.829L56.963 70.5554C57.0445 70.595 57.1368 70.6067 57.2256 70.5887C57.3144 70.5707 57.3949 70.5241 57.4547 70.4559L65.0037 61.8451L34.8564 48.9023L26.5562 55.1258C26.4994 55.1684 26.4545 55.2248 26.4259 55.2897C26.3972 55.3546 26.3857 55.4258 26.3925 55.4964C26.3993 55.567 26.4241 55.6347 26.4646 55.6929C26.5051 55.7512 26.5599 55.798 26.6237 55.829Z"
      fill="white"
    />
    <path
      d="M95.1512 49.2178L103.524 56.7875C103.575 56.8337 103.614 56.8919 103.637 56.9568C103.66 57.0218 103.666 57.0914 103.655 57.1594C103.644 57.2274 103.617 57.2917 103.575 57.3463C103.533 57.4009 103.478 57.4443 103.415 57.4723L73.45 70.8458C73.37 70.8815 73.2807 70.8909 73.195 70.8726C73.1093 70.8543 73.0316 70.8093 72.9732 70.744L65.0039 61.8449L95.1512 49.2178Z"
      fill="white"
    />
    <path
      d="M65.2383 35.9596L95.2328 49.2181L99.5463 48.2183C99.6312 48.1987 99.7076 48.1527 99.7648 48.0871C99.822 48.0215 99.8571 47.9395 99.8649 47.8527C99.8728 47.766 99.8531 47.679 99.8087 47.6042C99.7643 47.5293 99.6973 47.4703 99.6175 47.4357L72.2289 35.5683C72.169 35.5423 72.1038 35.5309 72.0387 35.535L65.2383 35.9596Z"
      fill="white"
    />
    <path
      d="M65.2393 35.9594L35.413 48.964L31.6425 48.3304C31.5552 48.3141 31.4755 48.2702 31.4151 48.2051C31.3547 48.14 31.3169 48.0572 31.3072 47.9689C31.2975 47.8806 31.3164 47.7916 31.3613 47.7149C31.4061 47.6383 31.4744 47.5781 31.5561 47.5432L59.6215 35.448C59.6836 35.4217 59.7511 35.4109 59.8183 35.4165L65.2393 35.9594Z"
      fill="white"
    />
    <path
      d="M96.3255 94.6432C100.438 94.6432 103.772 91.3092 103.772 87.1966C103.772 83.084 100.438 79.75 96.3255 79.75C92.2129 79.75 88.8789 83.084 88.8789 87.1966C88.8789 91.3092 92.2129 94.6432 96.3255 94.6432Z"
      fill="#E0E2EE"
      stroke="white"
      strokeWidth="15"
      strokeMiterlimit="10"
    />
    <path
      d="M98.6926 84.9894C98.5696 84.5618 98.3973 84.2143 98.1759 83.9498C97.9618 83.6913 97.684 83.4931 97.37 83.3746C96.6924 83.1408 95.956 83.1408 95.2784 83.3746C94.9648 83.4923 94.6879 83.6907 94.4756 83.9498C94.251 84.2143 94.0788 84.5618 93.9589 84.9894C93.8389 85.417 93.7773 85.9398 93.7773 86.555V87.81C93.7773 88.4251 93.8389 88.948 93.9619 89.3787C94.0585 89.7613 94.2357 90.119 94.4817 90.4276C94.6954 90.6887 94.973 90.89 95.2876 91.012C95.9617 91.254 96.699 91.254 97.3731 91.012C97.686 90.8899 97.9617 90.6885 98.1731 90.4276C98.4153 90.1174 98.5903 89.7602 98.6868 89.3787C98.8068 88.9481 98.8683 88.4251 98.8683 87.81H98.8747V86.555C98.8741 85.9396 98.8126 85.417 98.6926 84.9894ZM97.5699 87.9974C97.5742 88.3324 97.5474 88.6671 97.49 88.9971C97.4512 89.2319 97.371 89.4578 97.2532 89.6646C97.1624 89.8241 97.028 89.9543 96.8657 90.0399C96.6989 90.1202 96.5155 90.1602 96.3304 90.1567C96.1454 90.1595 95.9622 90.1195 95.7952 90.0399C95.6308 89.9539 95.4934 89.8239 95.3984 89.6646C95.2781 89.4581 95.1949 89.2322 95.1524 88.9971C95.0895 88.6677 95.0606 88.3327 95.0662 87.9974V86.3549C95.0609 86.0208 95.0888 85.687 95.1494 85.3583C95.19 85.1279 95.2724 84.9069 95.3926 84.7062C95.488 84.5529 95.6243 84.4293 95.7863 84.3494C95.9542 84.2764 96.1353 84.2387 96.3184 84.2387C96.5015 84.2387 96.6827 84.2764 96.8506 84.3494C97.0139 84.4273 97.1507 84.5514 97.2443 84.7062C97.3645 84.9069 97.4469 85.1279 97.4875 85.3583C97.5483 85.6869 97.5762 86.0208 97.5707 86.3549V87.9974H97.5699Z"
      fill="white"
    />
  </svg>
)
