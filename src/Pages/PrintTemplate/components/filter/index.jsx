import React, {useEffect, useState} from 'react';
import {Option} from "../../../../common/form/autoComplete/_option";
import {CategoryAutoComplete} from "../../../../Component/CategoryAutoComplete";
import {SCRIPT} from "../../interfaces/~script";
import {Grid} from "@mui/material";
import usePrintTemplateFilter from "../../hooks/usePrintTemplateFilter";
import {StyledPrintTemplateFilter} from "../~styled";
import {Button} from "../../../../common/button";
import {useTranslation} from "react-i18next";

const Index = () => {
  const {
    groupType,
    groupSize,
    functions,
  } = usePrintTemplateFilter()
  const {t} = useTranslation()
  // // UPOS
  // const [activeType, setActiveType] = useState('Chi tiết đơn đặt hàng')
  // const [activeSize, setActiveSize] = useState('Khổ in A4')
  // // J&T
  const [activeType, setActiveType] = useState('Phiếu bán hàng')
  const [activeSize, setActiveSize] = useState('Khổ in K80')

  useEffect(() => {
    setActiveType(groupType?.value)
    setActiveSize(groupSize?.value)
  }, [groupType?.value, groupSize?.value])

  return (
    <StyledPrintTemplateFilter>
      <Grid container className="print-template-filter__collapse-group">
        <Grid item xs={3} sm={3} md={3} lg={3} >
          <CategoryAutoComplete
            className="print-template-filter-collapse__input-wide"
            categoryList={[{name: t(SCRIPT.FILTER.TYPE.LABEL), value: ''}]}
            categoryWidth={180}
            emptyMenu={groupType?.list?.length <= 0}
            emptyText={t(SCRIPT.FILTER.TYPE.EMPTY)}
            setValue={groupType?.value}
            placeholder={t(SCRIPT.FILTER.TYPE.LABEL)}
            onChange={groupType?.onKeywordChange}
            onBlur={groupType?.onKeywordBlur}
            onReset={groupType?.onKeywordReset}
          >
            {groupType?.list?.length > 0 &&
            groupType?.list?.map(item => (
            <Option
              key={item.value}
              className={`print-template-filter-form__option-text ${(activeType === item.name) && ('print-template-filter-form__option-text-active')}`}
              onClick={() => {
                groupType?.onSelected(item)
                setActiveType(item.name)
              }}
            >
              {t(item.name)}
            </Option>
            ))}
          </CategoryAutoComplete>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <CategoryAutoComplete
            className="print-template-filter-collapse__input-wide"
            categoryList={[{name: t(SCRIPT.FILTER.SIZE.LABEL), value: ''}]}
            categoryWidth={140}
            emptyMenu={groupSize?.list?.length <= 0}
            emptyText={t(SCRIPT.FILTER.SIZE.EMPTY)}
            setValue={groupSize?.value}
            placeholder={t(SCRIPT.FILTER.SIZE.LABEL)}
            onChange={groupSize?.onKeywordChange}
            onBlur={() => console.log('Skip')}
            onReset={groupSize?.onKeywordReset}
          >
            {groupSize?.list?.length > 0 &&
            groupSize?.list?.map(item => (
            <Option
              key={item.value}
              className={`print-template-filter-form__option-text ${(activeSize === item.name) && ('print-template-filter-form__option-text-active')}`}
              onClick={() => {
                groupSize?.onSelected(item)
                setActiveSize(item.name)
              }}
            >
              {t(item.name)}
            </Option>
            ))}
          </CategoryAutoComplete>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} >
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} >
          <div className={"print-template-filter__group-button"}>
            {!functions.editPrint ? (
              <>
                <Button onClick={functions.canEdit}
                        appearance={'ghost'}
                        size={'md- '}
                        type={'button'}>{t(SCRIPT.GROUP_BUTTON.EDIT)}</Button>
                <Button type={'button'}
                        onClick={functions.handlePrint}>{t(SCRIPT.GROUP_BUTTON.PRINT)}</Button>
              </>
            ): (
              <>
                <Button onClick={functions.notEdit}
                        type={'button'}
                        appearance={'ghost'}>{t(SCRIPT.GROUP_BUTTON.CANCEL)}</Button>
                <Button onClick={functions.handlePostTemplate}
                        type={'button'}>{t(SCRIPT.GROUP_BUTTON.SAVE)}</Button>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </StyledPrintTemplateFilter>
  );
};

export default Index;