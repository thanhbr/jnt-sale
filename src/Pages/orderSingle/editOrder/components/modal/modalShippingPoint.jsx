import React, {Fragment, memo} from 'react';
import useEditModal from "../../../hooks/useEditModal";
import {RightSightPopup} from "../../../../../layouts/rightSightPopup";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {Box, Grid, Modal} from "@mui/material";
import {Button} from "../../../../../common/button";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {AutoCompleteSingleOption} from "../../../components/autocompleteSingleOption";
import {ORDER_SINGLE_CONSTANTS} from "../../../interface/_constants";
import {Checkbox} from "../../../../../common/form/checkbox";
import {Switch} from "../../../../../common/switch";
import styled from "styled-components";
import {ORDER_SINGLE_ICONS} from "../../../interface/_icons";

export const ModalShippingPoint = memo(() => {
  const {valueForm, functions, validate} = useEditModal()
  return (
    <>
      <RightSightPopup
        openModal={valueForm?.openModalShippingPoint}
        confirmBeforeClose={true}
        clickClose={() => functions.onCloseModalShippingPoint()}
        disableSubmit={validate?.canSubmitShippingPoint}
        animationClose={functions.animateCloseModal}
        acceptance={() => functions.onSubmitShippingPoint()}
        header={
          {
            title: 'Thông tin điểm gửi hàng',
            subTitle: 'Là địa điểm shipper/đơn vị vận chuyển đến lấy hàng hoá từ chủ shop.',
          }
        }
        body={[
          {
            item: (
              <StyledEditShippingPointDrawer>
                <div className="create-shipping-point-drawer__body">
                  <div className="create-shipping-point-drawer__input-group">
                    <Input
                      label={
                        <>
                          Tên điểm gửi hàng <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                      }
                      placeholder={'Nhập tên điểm gửi hàng'}
                      maxLength={100}
                      value={valueForm?.shippingPointName}
                      validateText={validate?.errorShippingPointName?.status ? validate?.errorShippingPointName?.message : null}
                      validateType={!validate?.errorShippingPointName?.status ? 'success' : 'danger'}
                      onChange={e => functions.onChangeShippingPointName(e.target.value)}
                      onBlur={() => validate.onBlurShippingPointName()}
                    />
                  </div>
                  <div className="create-shipping-point-drawer__input-group">
                    <Input
                      label={
                        <>
                          Điện thoại <Text color={THEME_SEMANTICS.failed}>*</Text>
                        </>
                      }
                      placeholder={'Nhập số điện thoại'}
                      value={valueForm?.shippingPointPhone}
                      validateText={validate?.errorShippingPointPhone?.status ? validate?.errorShippingPointPhone?.message : null}
                      validateType={!validate?.errorShippingPointPhone?.status ? 'success' : 'danger'}
                      onChange={e => functions.onChangeShippingPointPhone(e.target.value)}
                      onBlur={() => validate.onBlurShippingPointPhone()}
                    />
                  </div>
                  <div className="create-shipping-point-drawer__input-group">
                    <Input
                      label={
                        <>
                          Email
                        </>
                      }
                      placeholder={'Nhập email'}
                      maxLength={100}
                      value={valueForm?.shippingPointEmail}
                      validateText={validate?.errorShippingPointEmail?.status ? validate?.errorShippingPointEmail?.message : null}
                      validateType={!validate?.errorShippingPointEmail?.status ? 'success' : 'danger'}
                      onChange={e => functions.onChangeShippingPointEmail(e.target.value)}
                      onBlur={() => validate.onBlurShippingPointEmail()}
                    />
                  </div>
                  <div>
                    <span style={{fontSize: '14px'}}>Địa chỉ</span> <Text color={THEME_SEMANTICS.failed}>*</Text>
                    <Grid container className="create-shipping-point-drawer__input-wrapper">
                      <Grid xs={4} sm={4} md={4} lg={4} item>
                        <div className="create-shipping-point-drawer__input-group" data-size="sm" >
                          <AddressAutoComplete
                            data={valueForm.provinceList}
                            value={valueForm.provinceValue}
                            onSelect={data => functions.onSelectShippingPointCity(data)}
                            inputProps={{
                              categoryValue: {name: 'Tỉnh / Thành phố', value: ''},
                              placeholder: 'Tỉnh / thành phố',
                              validateText: validate?.errorShippingPointCity?.status ? validate?.errorShippingPointCity?.message : null,
                              validateType: !validate?.errorShippingPointCity?.status ? 'success' : 'danger',
                              value: valueForm?.provinceValue?.name || '',
                            }}
                            menuProps={{
                              empty:
                                valueForm?.provinceList.length <= 0
                                  ? 'Không tìm thấy tỉnh / thành phố'
                                  : '',
                            }}
                            searchInputProps={{
                              placeholder: 'Tìm kiếm tỉnh / thành phố',
                              value: valueForm?.provinceKeyword || '',
                              onChange: ({value}) => functions.onChangeShippingPointCity(value),
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid xs={4} sm={4} md={4} lg={4} item>
                        <div className="create-shipping-point-drawer__input-group" data-size="sm" >
                          <AddressAutoComplete
                            data={valueForm?.districtList}
                            value={valueForm?.districtValue}
                            onSelect={data => functions.onSelectShippingPointDistrict(data)}
                            inputProps={{
                              categoryValue: {name: 'Quận / Huyện', value: ''},
                              disabled: !valueForm?.provinceValue?.value,
                              placeholder: 'Quận / Huyện',
                              validateText: validate?.errorShippingPointDistrict?.status ? validate?.errorShippingPointDistrict?.message : null,
                              validateType: !validate?.errorShippingPointDistrict?.status ? 'success' : 'danger',
                              value: valueForm?.districtValue?.name || '',
                            }}
                            menuProps={{
                              empty:
                                valueForm?.districtList.length <= 0 ? 'Không tìm thấy quận / huyện' : '',
                            }}
                            searchInputProps={{
                              placeholder: 'Tìm kiếm quận / huyện',
                              value: valueForm?.districtKeyword || '',
                              onChange: ({value}) => functions.onChangeShippingPointDistrict(value),
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid xs={4} sm={4} md={4} lg={4} item>
                        <div className="create-shipping-point-drawer__input-group" data-size="sm" >
                          <AddressAutoComplete
                            data={valueForm?.wardList}
                            value={valueForm?.wardValue}
                            onSelect={data => functions.onSelectShippingPointWard(data)}
                            inputProps={{
                              categoryValue: {name: 'Phường / Xã', value: ''},
                              disabled: !valueForm?.districtValue?.value,
                              placeholder: 'Phường / Xã',
                              validateText: validate?.errorShippingPointWard?.status ? validate?.errorShippingPointWard?.message : null,
                              validateType: !validate?.errorShippingPointWard?.status ? 'success' : 'danger',
                              value: valueForm?.wardValue?.name || '',
                            }}
                            menuProps={{
                              empty: valueForm?.wardList?.length <= 0 ? 'Không tìm thấy phường / xã' : '',
                              style: {right: 0, left: 'unset', width: 'calc(150% + 8px)'},
                            }}
                            searchInputProps={{
                              placeholder: 'Tìm kiếm phường / xã',
                              value: valueForm?.wardKeyword || '',
                              onChange: ({value}) => functions.onChangeShippingPointWard(value),
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="create-shipping-point-drawer__input-group">
                    <Input
                      placeholder={'Nhập số nhà, tên đường'}
                      maxLength={255}
                      value={valueForm?.shippingPointAddress}
                      validateText={validate?.errorShippingPointAddress?.status ? validate?.errorShippingPointAddress?.message : null}
                      validateType={!validate?.errorShippingPointAddress?.status ? 'success' : 'danger'}
                      onChange={e => functions.onChangeShippingPointAddress(e.target.value)}
                      onBlur={() => validate.onBlurShippingPointAddress()}
                    />
                    {[
                      !!valueForm?.shippingPointAddress,
                      !!valueForm?.wardValue?.value,
                      !!valueForm?.districtValue?.value,
                      !!valueForm?.provinceValue?.value,
                    ].includes(true) && (
                      <div
                        className="create-shipping-point-drawer__input-item"
                        data-size="lg"
                        style={{margin: '24px 0', position: 'relative'}}
                      >
                        <i className="create-shipping-point-drawer__address-icon" style={{position: 'absolute'}}>
                          {ORDER_SINGLE_ICONS.markerPin01}
                        </i>
                        <Text color="#7C88A6" style={{marginLeft: 24}}>
                          {[
                            valueForm?.shippingPointAddress,
                            valueForm?.wardValue?.name,
                            valueForm?.districtValue?.name,
                            valueForm?.provinceValue?.name,
                          ]
                            .filter(item => !!item)
                            .map((item, i) => (
                              <Fragment key={i}>
                                {i > 0 && ', '}
                                {item}
                              </Fragment>
                            ))}
                        </Text>
                      </div>
                    )}
                  </div>
                  <div className="create-shipping-point-drawer__option-list">
                    {ORDER_SINGLE_CONSTANTS.create.shippingPoint.options.map(item => (
                      <div
                        key={item?.id}
                        className="create-shipping-point-drawer__option-item--radio"
                        onClick={() => functions.onChangeAddressSelectedOptions(item)}
                      >
                        <Checkbox
                          checked={valueForm?.addressSelectedOptions?.includes(item?.value)}
                          style={{margin: '1px 10px 0 0'}} />
                        <Text
                          color="#191D32"
                          style={{cursor: 'pointer'}}
                        >
                          {item?.name || '---'}
                        </Text>
                      </div>
                    ))}
                  </div>
                  {!(valueForm?.addressSelectedOptions?.includes('is_default')) && (
                    <div className="create-shipping-point-drawer__toggle-item">
                      <Switch defaultChecked={true} disabled style={{marginRight: 8}} />
                      <Text color="#191D32" style={{cursor: 'no-drop'}}>
                        Kích hoạt/Ngưng sử dụng
                      </Text>
                    </div>
                  )}
                </div>
              </StyledEditShippingPointDrawer>)
          }
        ]}
        footer={
          {
            cancel: {
              width: 74,
              title: 'Huỷ'
            },
            save: {
              width: 110,
              title: 'Lưu'
            },
          }
        }
      />
      <Modal
        open={valueForm?.openModalConfirmShippingPoint}
        onClose={() => functions.closeModalShippingPointConfirm()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="delivery_note-confirm">
          <Text
            as="p"
            fontSize={20}
            fontWeight={600}
            lineHeight={28}
            className='delivery_note-confirm_title'
          >Xác nhận rời khỏi trang</Text>
          <Text
            as="p"
            lineHeight={19}
            className='delivery_note-confirm_text'
          >
            Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?
          </Text>

          <div className='delivery_note-confirm_button'>
            <Button className='delivery_note-confirm_cancel'
                    appearance='ghost'
                    onClick={() => functions.closeModalShippingPointConfirm()}
                    style={{lineHeight: '100%'}}
            >Hủy</Button>
            <Button className='delivery_note-confirm_acept'
                    onClick={() => functions.acceptanceModalShippingPointConfirm()}
                    style={{lineHeight: '100%'}}
            >Xác nhận</Button>
          </div>
        </Box>
      </Modal >
    </>
  )})

const AddressAutoComplete = ({data, value, onSelect, ...props}) => {
  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryHidden: true,
        readOnly: true,
        ...props?.inputProps,
      }}
      // search input in dropdown menu
      menuProps={{
        style: {width: 'calc(150% + 8px)'},
        ...props?.menuProps,
      }}
    >
      {data.length > 0 &&
      data.map(item => (
        <AutoCompleteSingleOption
          key={item.value}
          data-active={item.value === value?.value}
          onClick={() => onSelect && onSelect(item)}
        >
          {item.name}
        </AutoCompleteSingleOption>
      ))}
    </AlternativeAutoComplete>
  )
}


export const StyledEditShippingPointDrawer = styled.div`
  .create-shipping-point-drawer {
    &__input-group {
      margin: 0 8px 24px 0;
    }
    &__input-wrapper {
      margin-top: 4px;
    }
    &__option-item--radio {
      display: flex;
      margin-bottom: 4px;
    }
    &__toggle-item {
      display: flex;
      margin-top: 24px;
    }
  }
 `