// import { getData } from "api/api";
// import { getListProductGroup } from "api/url";
// import React, { useContext } from "react";
// import { ProductGroup } from "../provider/_context";
// import { useProductAction } from "../provider/_reducer";

// const useCallApi = () => {
//     const { pageState, pageDispatch } = useContext(ProductGroup)
//     const fetchData = async () => {
//         try {
//             const res = await getData(getListProductGroup())
//             if (res.data.success) {
//                 const perPage = res.data.meta.per_page || 0
//                 const start = res.data.meta.start || 0
//                 const total = res.data.meta.total || 0

//                 // pageDispatch({
//                 //     type: useProductAction.GET_PAGINATION,
//                 //     payload: {
//                 //         active: Math.floor(start / perPage),
//                 //         amount: perPage,
//                 //         total: Math.ceil(total / perPage),
//                 //         totalItems: total,
//                 //     },
//                 // })
//                 // pageDispatch({ type: useProductAction.GET_LIST_CATEGORY, payload: res.data.data })
//                 // pageDispatch({ type: useProductAction.IS_LOADING, payload: true })
//             }
//         } catch (er) {
//             console.log(er);
//         }
//     }
//     return {
//         fetchData
//     }
// }
// export default useCallApi