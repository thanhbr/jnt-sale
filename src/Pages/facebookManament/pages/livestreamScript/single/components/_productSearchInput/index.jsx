import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import styled from 'styled-components'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle_ProductSearchList} from '../_productSearchList'

export const FacebookLivestreamScriptSingle_ProductSearchInput = ({
  ...props
}) => {
  const {data, methods, declareOrderKeywordMethods} =
    useFacebookLiveStreamScriptSingle()
  const {pricePolicy, product} = data.form

  return (
    <Input
      {...props}
      placeholder="Tìm kiếm sản phẩm"
      value={product.keyword}
      validateText={data.validate.productSearch}
      validateType="danger"
      onChange={e =>
        declareOrderKeywordMethods.handleProductKeywordChange(e.target.value)
      }
      onFocus={() =>
        methods.handleRemoveValidate([{name: 'productSearch', value: ''}])
      }
      dropdown={
        product.list.length > 0
          ? ({onClose}) => (
              <FacebookLivestreamScriptSingle_ProductSearchList
                data={product.list}
                defaultValue={product.value}
                isLoading={product.loading}
                isLoadMore={product.loadingMore}
                whole={pricePolicy.value?.value === 2}
                onClose={onClose}
                onSubmit={declareOrderKeywordMethods.handleProductChange}
              />
            )
          : () => (
              <StyledEmpty>
                <img src="/img/product/empty.png" alt="Empty" />
                <Text>
                  {product.keyword.trim()
                    ? 'Không tìm thấy sản phẩm nào'
                    : 'Chưa có sản phẩm nào'}
                </Text>
              </StyledEmpty>
            )
      }
      icon={FACEBOOK_ICONS.search}
      dropdownProps={{
        canLoadMore: !product.loadingMore,
        onLoadMore: declareOrderKeywordMethods.handleProductLoadMore,
      }}
    />
  )
}

const StyledEmpty = styled.div`
  min-height: 260px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
