import {TagInput} from 'common/form/tagInput'
import {Tooltip} from 'common/tooltip/'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import React, {useState} from 'react'
import {formatMoney} from 'util/functionUtil'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {StyledFacebookLivestreamScriptSingle_ProductTable} from './_styled'
import ReactImageFallback from "react-image-fallback";

export const FacebookLivestreamScriptSingle_ProductTable = ({...props}) => {
  const {data, declareOrderKeywordMethods} = useFacebookLiveStreamScriptSingle()
  const {pricePolicy, product} = data.form

  const warningTags = declareOrderKeywordMethods.getWarningProductTags()

  return (
    <StyledFacebookLivestreamScriptSingle_ProductTable {...props}>
      <div className="facebook-livestream-script-single-product-table__table">
        <div className="facebook-livestream-script-single-product-table__thead">
          <div className="facebook-livestream-script-single-product-table__tr">
            <div className="facebook-livestream-script-single-product-table__th">
              Sản phẩm
            </div>
            <div className="facebook-livestream-script-single-product-table__th">
              Giá bán
            </div>
            <div className="facebook-livestream-script-single-product-table__th">
              Từ khóa
            </div>
            <div className="facebook-livestream-script-single-product-table__th"></div>
          </div>
        </div>
        <div className="facebook-livestream-script-single-product-table__tbody">
          {product.value.map(item => (
            <Row
              key={item?.value}
              data={item?.data}
              tags={item?.tags}
              warningTags={warningTags}
              priceType={pricePolicy.value?.value}
              onDelete={() =>
                declareOrderKeywordMethods.handleProductDelete(item?.value)
              }
              onTagsChange={tags =>
                declareOrderKeywordMethods.handleProductTagsChange(
                  item?.value,
                  tags,
                )
              }
            />
          ))}
        </div>
      </div>
    </StyledFacebookLivestreamScriptSingle_ProductTable>
  )
}

const Row = ({data, tags, warningTags, priceType, onDelete, onTagsChange}) => {
  const state = useFacebookLiveStreamScriptSingle()
  const validate = state.data.validate
  const tagValidate = validate.productTableTags.find(
    item => item?.id === data?.id,
  )

  const [imgSrc, setImgSrc] = useState(data?.image_thumb)
  const [triggerDefault, setTriggerDefault] = useState(false)

  const handleImgError = () =>
    setImgSrc('/img/product/default-product-thumbnail.png')

  const warningDuplicate = !!warningTags.find(find => tags.includes(find))

  return (
    <div className="facebook-livestream-script-single-product-table__tr">
      <div className="facebook-livestream-script-single-product-table__td">
          <ReactImageFallback
              className="facebook-livestream-script-single-product-table__thumbnail"
              src={imgSrc}
              alt={data?.product_name || 'thumbnail'}
              fallbackImage={'/img/product/default-product-thumbnail.png'}
          />
        <div className="facebook-livestream-script-single-product-table__info">
          <div className="facebook-livestream-script-single-product-table__name">
            <Text
              style={{
                maxWidth: 300,
                marginRight: 4,
                flex: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {data?.product_name || '---'}
            </Text>
            <Text
              color="#fff"
              fontSize={10}
              fontWeight={500}
              lineHeight={15}
              style={{
                padding: '1px 6px',
                background:
                  Number(data?.warehouse_quantity || 0) > 0
                    ? THEME_SEMANTICS.delivering
                    : THEME_SEMANTICS.failed,
                borderRadius: 9,
              }}
            >
              {data?.warehouse_quantity || 0}
            </Text>
          </div>
          <div className="facebook-livestream-script-single-product-table__sku">
            <Text color="#7C88A6" fontSize={13} lineHeight={18}>
              {data?.sku}
            </Text>
          </div>
        </div>
      </div>
      <div className="facebook-livestream-script-single-product-table__td">
        {formatMoney(priceType === 2 ? data?.wholesale_price : data?.price)}
      </div>
      <div
        className={`facebook-livestream-script-single-product-table__td --tooltip`}
      >
        <Tooltip
          className={
            tagValidate?.content || warningDuplicate
              ? '--danger alert-address'
              : '--transparent'
          }
          placement="bottom"
          title={
            warningDuplicate
              ? 'Từ khóa này đã được sử dụng cho sản phẩm khác'
              : tagValidate?.content
          }
        >
          <TagInput
            defaultValue={tags}
            validate={tagValidate?.content}
            triggerDefault={triggerDefault}
            warningTags={warningTags}
            onChange={val => {
              const res = onTagsChange(val)
              if (warningTags.find(find => tags.includes(find)))
                if (res === 'trigger') setTriggerDefault(!triggerDefault)
            }}
            onDelete={onTagsChange}
            inputProps={{
              onFocus: () =>
                state.methods.handleRemoveValidate([
                  {
                    name: 'productTableTags',
                    value: validate.productTableTags.filter(
                      item => item?.id !== data?.id,
                    ),
                  },
                ]),
            }}
          />
        </Tooltip>
      </div>
      <div className="facebook-livestream-script-single-product-table__td">
        <i style={{cursor: 'pointer'}} onClick={onDelete}>
          {FACEBOOK_ICONS.trash}
        </i>
      </div>
    </div>
  )
}
