import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {createContext, useEffect, useReducer} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {AddressSeparationSingleFileHeader} from './components/header'
import {ReportModal} from './components/reportModal'
import {AddressSeparationFileTable} from './components/table'
import {SingleAddressTabs} from './components/tabs'
import {
  singleActions,
  singleInitialState,
  singleReducer,
} from './_singleReducer'

export const AddressSeparationSingleFileContext = createContext()
const PageProvider = AddressSeparationSingleFileContext.Provider

export const AddressSeparationSingleFile = ({...props}) => {
  const {showAlert} = useAlert()

  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const isNewRelease = searchParams.get('new-release') === 'true'

  const [state, dispatch] = useReducer(singleReducer, singleInitialState)
  const {modal} = state

  const handleCloseModal = () => dispatch({type: singleActions.MODAL_CLOSE})

  useEffect(() => {
    if (!params?.fileId) return

    const fetchData = async () => {
      dispatch({type: singleActions.FETCH_LOADING})

      const response = await sendRequestAuth(
        'get',
        `${config.API}/tool/detect/detail/${params.fileId}`,
      )

      if (!!response?.data?.success) {
        const failedList = Array.isArray(response?.data?.data?.failed)
          ? response.data.data.failed
          : []
        const successList = Array.isArray(response?.data?.data?.success)
          ? response.data.data.success
          : []

        if (isNewRelease) {
          showAlert({
            content:
              failedList.lenght > 0
                ? 'Tải file và phân tách thất bại'
                : 'Tải file và phân tách thành công',
            type: failedList.lenght > 0 ? 'danger' : 'success',
          })

          searchParams.delete('new-release')
          setSearchParams(searchParams)
        }

        dispatch({
          type: singleActions.FETCH_DATA,
          payload: {
            failedData: failedList,
            successData: successList,
          },
        })
      }
    }

    fetchData()
  }, [params?.fileId, isNewRelease])

  return (
    <PageProvider value={{pageState: state, pageDispatch: dispatch}}>
      <section {...props}>
        <AddressSeparationSingleFileHeader />
        <SingleAddressTabs />
        <AddressSeparationFileTable />
      </section>
      <ReportModal
        open={modal?.id === 'report-modal'}
        onClose={() => handleCloseModal()}
      />
    </PageProvider>
  )
}
