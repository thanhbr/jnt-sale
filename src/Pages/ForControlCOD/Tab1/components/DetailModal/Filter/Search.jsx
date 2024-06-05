import {sendRequestAuth} from 'api/api'
import {Input} from 'common/form/input'
import { Text } from 'common/text'
import config from 'config'
import {debounce} from 'lodash'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useCallback, useContext} from 'react'
import {DetailContext} from '..'
import {useTranslation} from "react-i18next";

export const DetailSearch = () => {
    const { t } = useTranslation()
  const {
    data,
    search,
    setSearch,
    setDetailList,
    focusInputOnSuccess,
    setFocusInputOnSuccess,
    setLoading,
    setTotal,
    total,
  } = useContext(DetailContext)

  const debounceSearchChange = useCallback(
    debounce(async keyword => {
      setLoading(true)
      const response = await sendRequestAuth(
        'get',
        `${config.API}/cod/cod-details?pay_number=${data.payNumber}&search=${keyword}`,
      )
      if (!!response?.data?.success) {
        const displayListData = Array.isArray(response?.data?.data?.cod_details)
          ? response.data.data?.cod_details
          : []
        setDetailList(displayListData)
        setTotal(prev => ({...prev, totals: response.data.data?.totals}))
        setLoading(false)
      }
    }, 500),
    [],
  )

  const handleSearchChange = e => {
    if (e.target.value == ' ') e.target.value = ''
    const keyword = e.target.value.replace(/\s+/g, ',') || ''
    setSearch(keyword.trim())
    debounceSearchChange(keyword)
  }

  return (
    <div className="order-filter-form-table1">
      <Input
        className="order-filter-form-table1__input-wide"
        icon={ORDER_ICONS.searchMd}
        placeholder={t("search_tracking_code")}
        focus={focusInputOnSuccess}
        onFocus={() => setFocusInputOnSuccess(false)}
        value={search}
        onChange={handleSearchChange}
      />
      <Text color={'#7C88A6'}>{t("total")}: {total.totals}</Text>
    </div>
  )
}
