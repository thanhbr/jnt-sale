import {useContext, useState} from "react";
import {UserRoleContext} from "../provider/~context"
import toast from "../../../Component/Toast";
import config from "../../../config";
import { sendRequestAuth} from "../../../api/api";
import {userRoleActions} from "../provider/~reducer";
import {useNavigate} from "react-router-dom";

const useTableBody = () => {

  const { pageState, pageDispatch } = useContext(UserRoleContext)
  const navigate = useNavigate()

  const handleEditUserRole = data => {
    navigate(`/user-role/edit/${data.id}`)
  }

  const handleDeleteUserRole = data => {
    if(+(data?.total_user) > 0) {
      toast.error('Bạn không thể xoá vì vai trò này đang có người dùng được phân quyền')
    } else {
      pageDispatch({ type: userRoleActions.OPEN_MODAL_CONFIRM_DELETE, payload: true})
      pageDispatch({ type: userRoleActions.USER_ROLE_BEFORE_DELETE, payload: data})
    }
  }

  const [debounceRefresh, setDebounceRefresh] = useState(true)
  const handleRefresh = () => {
    if(debounceRefresh) {
      setDebounceRefresh(false)
      const fetchPM = async () => {
        pageDispatch({ type: userRoleActions.SET_LOADING, payload: true })

        const amount = pageState?.paginate?.amount || 20
        const page = pageState?.paginate?.active || 0
        const response = await Promise.all([
          sendRequestAuth('get', `${config.API}/admin/employee/groups?per_page=${amount}&start=${page*amount}`),
        ])
        pageDispatch({ type: userRoleActions.SET_LOADING, payload: false })
        if (response[0]?.data?.success) {
          pageDispatch({type: userRoleActions.USER_ROLE_LIST, payload: response[0]?.data?.data})
          pageDispatch({
            type: userRoleActions.SET_PAGINATION, payload: {
              active: page,
              amount: amount,
              total: Math.ceil(response[0]?.data?.data?.length / amount),
              totalItems: response[0]?.data?.data?.length,
            }
          })
        }
      }
      fetchPM()
      setTimeout(() => setDebounceRefresh(true), 1000)
    }
  }

  return {
    functions: {
      handleEditUserRole,
      handleDeleteUserRole,
      handleRefresh,
    }
  }
}
export default useTableBody