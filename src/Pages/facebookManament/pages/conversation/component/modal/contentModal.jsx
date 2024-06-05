import React from 'react'
import { StyledConversationStickerModal } from './_styled'
import { Input } from '../../../../../../common/form/input'
import { Text } from '../../../../../../common/text'
import { THEME_SEMANTICS } from '../../../../../../common/theme/_semantics'
import useFacebookConversationTags from "../../hooks/useFacebookConversationTags";
import {ICONS} from "../../../conversationStickers/interface/_constants";

const Index = ({ ...props }) => {

  const { data, methods, validate } = useFacebookConversationTags()
  return (
    <StyledConversationStickerModal>
      <div className={'sticker-group-content'}>
        <Input
          label={
            <>
              Tên nhãn {' '}
              <Text color={THEME_SEMANTICS.failed}>*</Text>
            </>
          }
          value={data?.tags?.form?.data?.stickerName}
          onChange={e => methods.onChangeStickerName(e.target?.value)}
          onBlur={_ => methods.onValidateStickerName(!!data?.tags?.form?.data?.stickerName)}
          validateText={data?.tags?.form?.validate?.stickerName}
          validateType="danger"
          placeHolder={"Nhập tên nhãn"}
          // maxLength={31}
        />
      </div>
      <div className={'sticker-group-content'}>
        <Text as={'label'} className={'input__label'}>
          Màu sắc {' '}
          <Text color={THEME_SEMANTICS.failed}>*</Text>
        </Text>
        <div className="input-content " data-validate={!!data?.tags?.form?.validate?.color} >
          <div className="color-span" style={{background: data?.tags?.form?.data?.color}}></div>
          <div className="color-value" >{data?.tags?.form?.data?.color}</div>
          <Input
            className={'input-picker'}
            value={data?.tags?.form?.data?.color}
            type={'color'}
            onChange={e => methods.onChangeColor(e.target?.value)}
            onBlur={_ => methods.onValidateColor(!!data?.tags?.form?.data?.color)}
            validateText={data?.tags?.form?.validate?.color}
            validateType="danger"
            style={{width: '100%'}}
            placeHolder={"Chọn màu sắc"}
          />
          <div className="icon-brush">
            {ICONS.brush}
          </div>
        </div>
        <Text color={'rgb(255, 66, 78)'} fontSize={'12px'}>{data?.tags?.form?.validate?.color}</Text>
      </div>

    </StyledConversationStickerModal>

  )
}
export default Index