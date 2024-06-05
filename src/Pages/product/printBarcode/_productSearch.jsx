import React, {useState} from 'react';
import {ORDER_SINGLE_ICONS} from "../../orderSingle/interface/_icons";
import {Input} from "../../../common/form/input";
import usePrintBarcode from "../hooks/usePrintBarcode";
import {ProductSearchList} from "./_productSearchList";
import {Text} from "../../../common/text";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const ProductSearch = () => {
  const { t } = useTranslation()
  const {functions, data} = usePrintBarcode()
  const search = data?.search
  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleWithInventorySearchProductListScroll = e => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = functions.onWithInventorySearchFetchMoreProductList()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }

  return (
    <StyledInventoryContainer>
      <Input
        dropdown={
          search?.list?.length > 0
            ? ({onClose}) => (
              <ProductSearchList
                data={search?.list}
                inventory={true}
                isExistOriginData={true}
                isLoading={search?.loading}
                isLoadMore={!canLoadMore}
                // whole={priceType.value?.value === 2}
                onClose={onClose}
                onSelect={functions.onWithInventorySearchSelect}
              />
            )
            : () => (
              <div className="order-single-product-info-inventory-container__not-found">
                <img src="/img/product/empty.png" alt="Empty" />
                <Text>
                  {search.value.trim()
                    ? t(DISPLAY_NAME_MENU.GENERAL.PRODUCT_NOT_FOUND)
                    : t(DISPLAY_NAME_MENU.GENERAL.NOT_PRODUCT_YET)}
                </Text>
              </div>
            )
        }
        dropdownProps={{
          canLoadMore,
          onLoadMore: handleWithInventorySearchProductListScroll,
        }}
        icon={ORDER_SINGLE_ICONS.searchMd}
        placeholder={t(DISPLAY_NAME_MENU.GENERAL.SEARCH_PRODUCT)}
        value={search?.value}
        onChange={e => functions.onWithInventorySearchChange(e.target.value)}
      />
    </StyledInventoryContainer>
  );
};

export default ProductSearch;


const StyledInventoryContainer = styled.div`
  .order-single-product-info-inventory-container {
    &__not-found {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__form-group {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__form-input {
      width: calc(50% - 16px);
      margin: 0 8px 16px 8px;

      &[data-size='sm'] {
        width: calc(25% - 16px);
      }
    }
  }
`
