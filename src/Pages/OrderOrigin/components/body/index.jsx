import React, {useState, useEffect, useContext} from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'
import Dropdown from 'Component/PureDropdown/Dropdown'
import './row.scss'
import {getData} from '../../../../api/api'
import {CustomerSkeleton} from '../skeleton/index'
import Empty from '../Empty'
import useOrderOriginContext from '../../hooks/_context'
import config from '../../../../config'
import {Row} from './row'
import {StickyFooter} from '../../../../common/stickyFooter'
import {Pagination} from '../../../../common/pagination'
import ConfirmModal from '../modals/confirmModal'
import useOrderOrigin from '../../hooks/useOrderOrigin'
import CheckboxAll from 'Pages/OrderOrigin/components/CheckboxAll'
import CheckBoxConsignment from "../../../../Component/CheckBoxConsignment/CheckBoxConsignment"
export const OrderOriginBody = (status) => {


    const [state, dispatch] = useOrderOriginContext();
    const keyword = state.filter.keyword.value;
    const [selectedList, setSelectedList] = useState([])
    // const [nextPage, setNextPage] = useState([])
    const filter = state.filter
    const [page, setPage] = useState(0)
    const [allChecked, setAllChecked] = useState(state.allChecked)
    const [confirm, setConfirm] = useState({
        active: false,
        value: -1,
        isAccept: false,
        title: '',
        message: '',
        btnAccept: 'Accept',
        btnCancel: 'Cancel',
        handleConfirm: () => {
        },
    })
    const {functions} = useOrderOrigin()

    const [isCheck, setIsCheck] = useState([]);
    const [count, setCount] = useState(0)
    const [isActive, setIsActive] = useState({});
    const [disable, setDisabled] = useState(false)
    const [selectedListAll, setSelectedListAll] = useState([])
    const [selectedListLength, setSelectedListLength] = useState(0)
    const [checkDefault, setCheckDefault] = useState([])

    const fetchData = async () => {
        dispatch({type: 'SET_LOADING', payload: true})
        getData(
            `${config.API}/order/origins?keyword=${keyword}&per_page=${state.filter.per_page}&start=${state.filter.start}`,
        )
            .then(res => {
                if (!!res.data.success) {
                    const id_default = res.data.data.filter(item => {
                        if (item.is_default == 1) return item.id
                    })
                    const array_default = id_default?.map(item => item.id)
                    let array_id = []
                    if (array_default) {
                        if (checkDefault) {
                            let addingList = []
                            array_default.forEach(item => {
                                if (!!!checkDefault.find(find => find === item))
                                    addingList.push(item)
                            })
                            array_id = [...checkDefault, ...addingList]
                        }
                        setCheckDefault(array_id)
                    }


                    dispatch({type: 'SET_LIST_ORDER_ORIGIN', payload: res.data.data})
                    dispatch({
                        type: 'SET_FILTER',
                        payload: {
                            total: res.data?.meta?.total
                        },
                    })
                    dispatch({type: 'SET_LOADING', payload: false})
                    if (allChecked == false) {
                        dispatch({type: 'SET_CHECKED', payload: []})
                    }
                    if (res.data.data.length > 0)
                        dispatch({type: 'SET_STATUS', payload: true})
                }
            })
            .catch(err => {
                console.log('error')
            })
    }
    const shouldActiveCheckbox = count > 0
    const isActiveAll =
        state.listOrderOrigin.length <= 0
            ? false
            : isCheck?.length < state.listOrderOrigin.length
            ? false
            : !!!state.listOrderOrigin.find(
                item => !!!isCheck.find(find => find === item?.id),
            )
    const checkFullPageChecked = () => {
        let checkFullPage = true;
        state.listOrderOrigin.forEach(item => {
            const findItem = isCheck?.find(find => find === item.id)
            if (!!!findItem) checkFullPage = false
        })
        return checkFullPage
    }
    const handleSelectAll = e => {
        let newSelectedList = []
        if (isActiveAll)
            newSelectedList = isCheck?.filter(
                item => !!!state.listOrderOrigin.find(find => find?.id === item),
            )
        else {
            let addingList = []
            state.listOrderOrigin.forEach(item => {
                if (!!!isCheck.find(find => find === item?.id))
                    addingList.push(item?.id)
            })
            newSelectedList = [...isCheck, ...addingList]
        }
        setIsCheck(newSelectedList)
        const id_default = newSelectedList.filter(el => !!!checkDefault?.find(item => item === el))
        setCount(id_default.length)

    };

    const handleClick = (e, id) => {
        let check = isCheck.find(item => item === id)
        if (check !== undefined) {
            setIsCheck(isCheck.filter(item => item !== id));
            setCount(count - 1)
        } else {
            setIsCheck([...isCheck, id]);
            setCount(count + 1)
        }
    };
    const handleChange = async (e, id) => {
        setDisabled(true)

        const {checked} = e.target;
        const change = checked ? 1 : 0;
        functions.changeOrderOriginStatus({
            id: [id],
            status: change,
        })
        setIsActive({...isActive, [id]: checked})
        setTimeout(() => {
            setDisabled(false)
        }, 2000)
    }
    useEffect(() => {
        fetchData()
    }, [state.filter.start, state.filter.per_page])
    useEffect(() => {
        setSelectedListLength(
            selectedList.filter(item => item.checked === true).length,
        )
    }, [selectedList])

    const handleSelected = (event, index) =>
        setSelectedList(
            selectedList?.map((item, index2) =>
                index2 === index ? {...item, checked: event.target.checked} : {
                    ...item,
                    openDetail: false,
                    hoverOff: true
                },
            ),
        )

    const onchangePagination = newPage => {
        setPage(newPage)
        dispatch({type: 'SET_FILTER', payload: {start: newPage * state.filter.per_page, page: newPage}})
        dispatch({type: 'SET_STATUS', payload: false})
        setAllChecked(true)
    }

    const handleChangeRowsPerPage = itemPerPage => {
        if (itemPerPage !== filter.per_page) {
            dispatch({
                type: 'SET_FILTER',
                payload: {start:  0, per_page: parseInt(itemPerPage, 10)},
            })
            dispatch({type: 'SET_STATUS', payload: false})
            setAllChecked(true)
        }
    }
    const changeAction = async value => {
        let ArrTemp = []
        isCheck.map(item => {
            if (item !== checkDefault) ArrTemp = {...ArrTemp, [item]: value}
        })
        let changeStatus = isCheck.filter(el => !!!checkDefault?.find(item => item === el))
        if (value == 3) {
            await functions.changeDeleteOrderOrigin(isCheck.join())
            setIsActive({...isActive, ...ArrTemp})
        } else {
            await functions.changeOrderOriginStatus({id: changeStatus, status: value})
            setIsActive({...isActive, ...ArrTemp})
        }

        setIsCheck([])
        setCount(0)
    }
    const handleMinus = (id) =>{
        setCount(count-1)
        const newIscheck = isCheck.filter(item=> item !== id)
        setIsCheck(newIscheck)
    }
    const handleActions = action => {
        const value = action.value
        if (value == 3) {
            setConfirm({
                ...confirm,
                active: true,
                title: 'Xóa nguồn đơn hàng',
                content: 'Nguồn đơn hàng được xoá sẽ không thể khôi phục, bạn có chắc chắn muốn xóa không?',
                btnCancel: 'Hủy',
                btnAccept: 'Xóa',
                acceptStyle: 'delete',
                handleConfirm: () => changeAction(value),
            })
        } else {
            changeAction(value)
        }
    }

    return (

        <div className="container-table-origin">
            <TableContainer component={Paper} className={selectedList.length > 0 && ('table-mgt-4')}>
                <Table aria-label="simple table" id="table-origin">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{width: '50px'}}>
                                <CheckBoxConsignment
                                    minus={!checkFullPageChecked()}
                                    handleClick={handleSelectAll}
                                    isChecked={shouldActiveCheckbox}
                                />
                            </TableCell>
                            {count > 0 && (
                                <TableCell colSpan={5}>
                                    <div className="flex dropdown-table-customer">
                                        <label>{count < 10 ? `0${count}`:count} nguồn đơn hàng được
                                            chọn</label>
                                        <Dropdown
                                            cb={handleActions}
                                            filter="order_source"
                                            placeHolderText="Order_source"
                                            customClass="show-scroll-bar"
                                            byPassTran
                                            labelKey="name"
                                            PlaceHolderText="Thao tác"
                                            idKey="id"
                                            listOption={[
                                                {label: 'Kích hoạt', value: 1},
                                                {label: 'Ngưng sử dụng', value: 0},
                                                // {label: 'Xóa', value: 3, className: 'delete-option'},
                                            ]}
                                        />
                                    </div>
                                </TableCell>
                            )}
                            {count <= 0 && (
                                <>
                                    <TableCell align="left" style={{width: '1084px'}}>Nguồn đơn hàng</TableCell>
                                    <TableCell align="left" style={{width: '200px'}}>Vị trí hiển thị</TableCell>
                                    <TableCell align="center" style={{width: '180px'}}>Trạng thái sử dụng</TableCell>
                                    <TableCell align="right" className="icon-settings"></TableCell>
                                </>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.listOrderOrigin.length > 0 && !state.isLoading ? (
                            state.listOrderOrigin.map((row, index) => (
                                <Row
                                    dataRow={row}
                                    key={index}
                                    handleSelected={event => handleSelected(event, index)}
                                    fetchData={event => fetchData()}
                                    isCheck={isCheck}
                                    handleClick={handleClick}
                                    isActive={isActive}
                                    handleChange={handleChange}
                                    disable={disable}
                                    handleMinus={handleMinus}
                                />
                            ))
                        ) : state.isLoading ? (
                            <CustomerSkeleton rows={state.listOrderOrigin.length > 0 ? state.listOrderOrigin.length : filter?.per_page}/>
                        ) : (
                            <Empty type={keyword == '' ? '' : 'search'}/>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {filter?.total != 0 && (
                <StickyFooter>
                    <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                        <Pagination
                            active={filter?.start != 0
                                ? Math.floor(filter?.start / filter?.per_page)
                                : 0}
                            amount={filter?.per_page || 10}
                            total={Math.ceil(filter?.total / filter?.per_page)}
                            totalItems={filter?.total}
                            onAmountChange={handleChangeRowsPerPage}
                            onPageChange={onchangePagination}
                        />
                    </div>
                </StickyFooter>
            )}
            <ConfirmModal confirm={confirm} setConfirm={setConfirm}/>
        </div>

    )
}
