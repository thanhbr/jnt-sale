import Box from '@mui/material/Box'
import {Button} from '../../../../common/button'
import './index.scss'
import {useContext, useEffect, useState} from 'react'
import Content from './content/index'
import {ORDER_ICONS} from '../../../refactorOrder/interfaces/_icons'
import {Input} from '../../../../common/form/input'
import {sendRequestAuth} from '../../../../api/api'
import config from '../../../../config'
import {CustomerContext} from '../../index'
import useCustomerFilterForm from '../hooks/useCustomerFilterForm'
import Tag from './content/tag'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(CustomerContext)
  const {countFilterCustomer, canSubmitCustomerFilter} = useCustomerFilterForm({
    state,
    dispatch
  })

  const collectOriginData = customers => {
    dispatch({type: 'SET_GROUP_CUSTOMER', payload: customers?.data?.data})
  }

  let [searchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('keyword') || '')
  const [isInit, setIsInit] = useState(true)
  useEffect(() => {
    if (isInit) return setIsInit(false)

    const timeOutId = setTimeout(() => {
      navigate({
        pathname: '/partner-management/customer',
        search: `?${createSearchParams({
          keyword: value,
          group: state.filter?.group?.value,
          city: state.filter?.city?.value,
          district: state.filter?.district?.value,
          ward: state.filter?.ward?.value,
          per_page: state.filter?.per_page,
          start: state.filter?.start,
        })}`,
      })
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequestAuth(
        'get',
        `${config.API}/customer/groups`,
      )
      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <Box
      component="div"
      noValidate
      autoComplete="off"
      className="customer-filter"
    >
      <div className="customer-filter__group">
        <Input
          className="customer-filter__input-wide"
          icon={ORDER_ICONS.searchMd}
          placeholder="Tìm kiếm theo Mã/Tên/Số điện thoại/Email khách hàng"
          defaultValue={searchParams.get('keyword')}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button
          appearance="secondary"
          badgeType="danger"
          icon={ORDER_ICONS.filterFunnel02Update}
          size="md-"
          className={'customer-filter__order'}
          badge={
            countFilterCustomer.otherFilterBadge > 0
              ? countFilterCustomer.otherFilterBadge > 9
              ? '9+'
              : countFilterCustomer.otherFilterBadge
              : undefined
          }
          onClick={() => dispatch({type: 'SET_SHOW_OTHER_FILTER'})}
        >
          Bộ lọc khác
        </Button>
        {state.showOtherFilter && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitCustomerFilter}
            onClick={() => {
              navigate({
                pathname: '/partner-management/customer',
                search: `?${createSearchParams({
                  keyword: state.filter?.keyword?.value,
                  group: state.filter?.group?.value,
                  city: state.filter?.city?.value,
                  district: state.filter?.district?.value,
                  ward: state.filter?.ward?.value,
                  per_page: state.filter?.per_page,
                  start: state.filter?.start,
                })}`
              })
            }}
          >
            Áp dụng
          </Button>
        )}
      </div>
      {state.showOtherFilter && (
        <div
          className="customer-filter__collapse"
          data-collapse={state.showOtherFilter}
        >
          <Content />
        </div>
      )}
      {state.showTag && <Tag />}
    </Box>
  )
}
