import React, {memo} from "react";
import {RightSightPopup} from "../../../../../layouts/rightSightPopup";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import useEditModal from "../../../hooks/useEditModal";
import {Textarea} from "../../../../../common/form/textarea";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import {Tooltip} from "../../../../../common/tooltip";
import {DELIVERY_ICON} from "../../../../DeliveryNote/icon/_icon";
import CheckBoxConsignment from "../../../../../Component/CheckBoxConsignment/CheckBoxConsignment";
import {SwitchStatus} from "../../../../../Component/SwitchStatus/SwitchStatus";
import {Box, Modal} from "@mui/material";
import {Button} from "../../../../../common/button";

export const ModalCreateDeliveryNote = memo(() => {
  const {valueForm, functions, validate} = useEditModal()
  return (
    <>
      <RightSightPopup
        openModal={valueForm.openModalDeliveryNote}
        confirmBeforeClose={true}
        clickClose={() => functions.onCloseModalDeliveryNote()}
        disableSubmit={validate?.errorDeliveryNote?.status || validate?.errorDeliveryNotePosition?.status}
        animationClose={functions.animateCloseModal}
        acceptance={() => functions.onSubmitDeliveryNote()}
        header={
          {
            title: 'Thông tin mẫu ghi chú giao hàng',
            subTitle: '“Giúp chủ shop ghi chú nhanh khi thực hiện nhập thông tin giao hàng”',
          }
        }
        body={[
          {
            item: (
              <>
                <div className="delivery_info-body">
                  <div className="delivery_info-note">
                    <Textarea
                      label={
                        <>
                          Nội dung ghi chú <span className="delivery_info-icon">*</span>
                        </>
                      }
                      placeholder={'Nhập nội dung ghi chú'}
                      style={{resize: 'none'}}
                      value={valueForm.deliveryNote}
                      validateText={validate?.errorDeliveryNote?.status ? validate?.errorDeliveryNote?.message : null}
                      validateType={!validate?.errorDeliveryNote?.status ? 'success' : 'danger'}
                      onChange={e => functions.onChangeDeliveryNote(e.target.value)}
                      onBlur={_ => validate.onBlurDeliveryNote()}
                    />
                  </div>
                  <div className="delivery_info-position">
                    <Input
                      label={
                        <>
                          Vị trí hiển thị <Tooltip placement='right' title={'Vị trí 0 sẽ xuất hiện đầu tiên, số càng lớn, vị trí càng thấp'}>{DELIVERY_ICON.question}</Tooltip>
                        </>
                      }
                      placeholder={'Nhập vị trí hiển thị'}
                      maxLength={3}
                      value={valueForm?.deliveryNotePosition}
                      validateText={validate?.errorDeliveryNotePosition?.status ? validate?.errorDeliveryNotePosition?.message : null}
                      validateType={!validate?.errorDeliveryNotePosition?.status ? 'success' : 'danger'}
                      onChange={e => functions.onChangeDeliveryPosition(e.target.value)}
                      onBlur={() => validate.onBlurDeliveryPosition()}
                    />
                  </div>
                  <div className="delivery_info-checkbox"
                       // data-disable={isDisable}
                       onClick={_ => functions.onChangeDeliveryActive()}
                  >
                    <CheckBoxConsignment
                      isChecked={valueForm.deliveryNoteIsActive}
                      // disable={!valueForm.deliveryNoteStatus}
                    />
                    <Text
                      className="delivery_info-checkboxText"
                      color={THEME_COLORS.gray_300}
                      fontSize={14}
                      fontWeight={400}
                    >
                      Sử dụng làm mẫu ghi chú giao hàng mặc định
                    </Text>
                  </div>
                  {!valueForm.deliveryNoteIsActive && (
                    <div className="delivery_info-status">
                      <SwitchStatus
                        status={valueForm.deliveryNoteStatus}
                        handleChange={_ => functions.onChangeDeliveryStatus()}
                        disabled={true}
                      />
                      <Text
                        className="delivery_info-statusText"
                        color={THEME_COLORS.gray_300}
                        fontSize={14}
                        fontWeight={400}
                      >
                        Kích hoạt/Ngưng sử dụng
                      </Text>
                    </div>
                  )}
                </div>
              </>)
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
        open={valueForm?.openModalConfirmDeliveryNote}
        onClose={() => functions.closeModalDeliveryNoteConfirm()}
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
                    onClick={() => functions.closeModalDeliveryNoteConfirm()}
                    style={{lineHeight: '100%'}}
            >Hủy</Button>
            <Button className='delivery_note-confirm_acept'
                    onClick={() => functions.acceptanceModalDeliveryNoteConfirm()}
                    style={{lineHeight: '100%'}}
            >Xác nhận</Button>
          </div>
        </Box>
      </Modal >
    </>
  )})