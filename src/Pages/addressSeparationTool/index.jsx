import {sendRequestAuth} from 'api/api'
import {Pagination} from 'common/pagination'
import {StickyFooter} from 'common/stickyFooter'
import config from 'config'
import {createContext, useEffect, useReducer} from 'react'
import {AddressSeparationToolBody} from './components/body'
import {AddressSeparationToolHeader} from './components/header'
import {AddressModalPicker} from './components/modalPicker'
import {actions, initialState, reducer} from './_reducer'

export const AddressSeparationToolContext = createContext(null)
const PageProvider = AddressSeparationToolContext.Provider

export const AddressSeparationTool = ({...props}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {isOriginFetch, pagination} = state

  const handleAmountChange = async n => {
    dispatch({type: actions.FETCH_LOADING})

    const currentPage = pagination.active || 0
    const page =
      pagination.totalItems < currentPage * n
        ? Math.ceil(pagination.totalItems / n) - 1
        : currentPage

    const response = await sendRequestAuth(
      'get',
      `${config.API}/tool/detect/history?per_page=${n}&start=${page * n}`,
    )

    if (response?.status !== 200) return

    const data = response?.data?.data || []
    const totalItems = response?.data?.meta?.total || 0
    const totalPages = Math.ceil(totalItems / n)

    dispatch({
      type: actions.FETCH_PAGE,
      payload: {
        data,
        meta: {
          active: page + 1 > totalPages ? totalPages - 1 : page,
          amount: n,
          total: totalPages,
          totalItems,
        },
      },
    })
  }

  const handlePageChange = async page => {
    dispatch({type: actions.FETCH_LOADING})

    const amount = pagination?.amount || 10
    const response = await sendRequestAuth(
      'get',
      `${config.API}/tool/detect/history?per_page=${amount}&start=${
        page * amount
      }`,
    )

    if (response?.status !== 200) return

    const data = response?.data?.data || []
    const totalItems = response?.data?.meta?.total || 0
    const totalPages = Math.ceil(totalItems / amount)

    dispatch({
      type: actions.FETCH_PAGE,
      payload: {
        data,
        meta: {active: page, amount, total: totalPages, totalItems},
      },
    })
  }

  useEffect(() => {
    if (!isOriginFetch) return

    const fetchData = async () => {
      dispatch({type: actions.FETCH_LOADING})

      const response = await sendRequestAuth(
        'get',
        `${config.API}/tool/detect/history?per_page=10&start=0`,
      )

      if (response?.status !== 200) return

      const data = response?.data?.data || []
      const totalItems = response?.data?.meta?.total || 0
      const totalPages = Math.ceil(totalItems / 10)

      dispatch({
        type: actions.FETCH_ORIGIN,
        payload: {
          data,
          meta: {active: 0, amount: 10, total: totalPages, totalItems},
        },
      })
    }

    fetchData()
  }, [isOriginFetch])

  return (
    <PageProvider value={{pageState: state, pageDispatch: dispatch}}>
      <section {...props} style={{paddingBottom: 71}}>
        <AddressSeparationToolHeader />
        <AddressSeparationToolBody />
      </section>

      {pagination?.total ? (
        <StickyFooter>
          <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            <Pagination
              active={pagination?.active || 0}
              amount={pagination?.amount || 10}
              total={pagination?.total}
              totalItems={pagination?.totalItems}
              onAmountChange={handleAmountChange}
              onPageChange={handlePageChange}
            />
          </div>
        </StickyFooter>
      ) : (
        <></>
      )}

      <AddressModalPicker />
    </PageProvider>
  )
}
