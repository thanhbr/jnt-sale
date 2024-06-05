import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import styled from 'styled-components'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {ProductSearchList} from './_productSearchList'

export const ProductSearchInput = ({...props}) => {
  const {data, productMethods} = useFacebookConversationOrder()
  const {pricePolicy, product} = data.productInfo.inventoryConfig

  return (
    <Input
      {...props}
      placeholder="Tìm kiếm sản phẩm"
      value={product.keyword}
      // validateText={data.validate.productSearch}
      // validateType="danger"
      onChange={e => productMethods.onProduct.keywordChange(e.target.value)}
      // onFocus={() =>
      //   methods.handleRemoveValidate([{name: 'productSearch', value: ''}])
      // }
      dropdown={
        product.list.length > 0
          ? ({onClose}) => (
              <ProductSearchList
                data={product.list}
                defaultValue={product.value}
                isLoading={product.loading}
                isLoadMore={product.loadingMore}
                whole={pricePolicy.value?.value === 2}
                onClose={onClose}
                onSubmit={productMethods.onProduct.change}
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
        onLoadMore: productMethods.onProduct.loadMore,
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
