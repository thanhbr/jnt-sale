import { useModal } from 'Pages/productGroup/hook/useModal'
import React, { useEffect, useState } from 'react'
import { StyledConversationStickerModal } from './_styled'
import useFacebookConversationStickers from '../../hooks/useFacebookConversationStickers'
import { Input } from '../../../../../../common/form/input'
import { Text } from '../../../../../../common/text'
import { THEME_SEMANTICS } from '../../../../../../common/theme/_semantics'
import { Button } from '../../../../../../common/button'
import { ICONS } from '../../interface/_constants'

const Index = ({ ...props }) => {

  const { data, methods, validate } = useFacebookConversationStickers()
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
          value={data?.modal?.form?.data?.stickerName}
          onChange={e => methods.onChangeStickerName(e.target?.value)}
          onBlur={_ => methods.onValidateStickerName(!!data?.modal?.form?.data?.stickerName)}
          validateText={data?.modal?.form?.validate?.stickerName}
          validateType="danger"
          placeHolder={"Nhập tên nhãn"}
          maxLength={31}
        />
      </div>
      <div className={'sticker-group-content'}>
        <Text as={'label'} className={'input__label'}>
          Màu sắc {' '}
          <Text color={THEME_SEMANTICS.failed}>*</Text>
        </Text>
        <div className="input-content " data-validate={!!data?.modal?.form?.validate?.color} >
          <div className="color-span" style={{background: data?.modal?.form?.data?.color}}></div>
          <div className="color-value" >{data?.modal?.form?.data?.color}</div>
          <Input
            className={'input-picker'}
            value={data?.modal?.form?.data?.color}
            type={'color'}
            onChange={e => methods.onChangeColor(e.target?.value)}
            onBlur={_ => methods.onValidateColor(!!data?.modal?.form?.data?.color)}
            validateText={data?.modal?.form?.validate?.color}
            validateType="danger"
            style={{width: '100%'}}
            placeHolder={"Chọn màu sắc"}
          />
          <div className="icon-brush">
            {ICONS.brush}
          </div>
        </div>
        <Text color={'rgb(255, 66, 78)'} fontSize={'12px'}>{data?.modal?.form?.validate?.color}</Text>
      </div>

    </StyledConversationStickerModal>

  )
}
export default Index