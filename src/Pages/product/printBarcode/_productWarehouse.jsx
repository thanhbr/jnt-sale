import React, {useState} from 'react';
import {AlternativeAutoComplete} from "../../../common/form/autoComplete/_alternativeAutoComplete";
import styled from "styled-components";
import usePrintBarcode from "../hooks/usePrintBarcode";
import {AutoCompleteSingleOption} from "../../facebookManament/pages/autoResponses/component/autocompleteSingleOption";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const ProductWarehouse = ({...props}) => {
  const { t } = useTranslation()
  const {data, functions} = usePrintBarcode()
  const withInventoryConfig = data

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleLoadMore = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = functions.onWarehouseLoadMore()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 110,
        categoryHidden: true,
        placeholder: t(DISPLAY_NAME_MENU.GENERAL.FIND_WAREHOUSE),
        readOnly: true,
        // disabled: shippingStatus === '1',
        value: withInventoryConfig?.warehouse.value?.warehouse_name || '',
      }}
      // menu
      menuProps={{
        // canLoadMore,
        empty:
          withInventoryConfig?.warehouse.list.length <= 0
            ? t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE_NOT_FOUND)
            : '',
        style: {paddingBottom: 0},
        onLoadMore: handleLoadMore,
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t(DISPLAY_NAME_MENU.GENERAL.FIND_WAREHOUSE),
        value: withInventoryConfig?.warehouse?.keyword,
        onChange: functions.onWarehouseKeywordChange,
      }}
    >
      {/*{properties.isWarehouseLoading ? (*/}
      {/*  <StyledLoading>*/}
      {/*    <Spinner size={54} thickness={5} />*/}
      {/*    <Text style={{marginTop: 5}}>Loading...</Text>*/}
      {/*  </StyledLoading>*/}
      {/*) : (*/}
        <>
          {withInventoryConfig?.warehouse?.list?.map(item => (
            <AutoCompleteSingleOption
              key={item?.id}
              data-active={
                item.id === withInventoryConfig?.warehouse?.value?.id
              }
              onClick={() => functions.onWarehouseChange(item)}
            >
              {item?.warehouse_name || '---'}
            </AutoCompleteSingleOption>
          ))}
          {/*{!canLoadMore && (*/}
          {/*  <StyledLoadMore>*/}
          {/*    <Spinner size={48} thickness={4} />*/}
          {/*  </StyledLoadMore>*/}
          {/*)}*/}
        </>
      {/*)}*/}
    </AlternativeAutoComplete>
  )
}

const StyledLoading = styled.div`
  min-height: 260px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLoadMore = styled.div`
  padding: 16px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`


export default ProductWarehouse;