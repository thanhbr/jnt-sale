export const transformOriginData = (data, pageState, querySearch) => {
  return {
    type: {
      activeValue: !!querySearch
        ? querySearch
        : pageState.filter.type.activeValue || data?.listTemplate[0]?.type,
      value: !!querySearch
        ? data?.listTemplate?.find(item => item.type === querySearch)?.type_name
        : pageState.filter.type.value || data?.listTemplate[0]?.type_name,
      list: data?.listTemplate?.map(item => ({
        name: item?.type_name || '',
        value: item?.type || '',
      })),
      listOrigin: data?.listTemplate?.map(item => ({
        name: item?.type_name || '',
        value: item?.type || '',
      })),
    },
    size: {
      activeValue: pageState.filter.size.activeValue || data?.listTemplate[0]?.arr_size[0]?.size,
      value: pageState.filter.size.value || data?.listTemplate[0]?.arr_size[0]?.size_name,
      list: !!querySearch
        ? data?.listTemplate?.find(item => item.type === querySearch)?.arr_size?.map(item => ({
          name: item?.size_name || '',
          value: item?.size || '',
        }))
        : (pageState.filter.size.list.length === 0 ? data?.listTemplate[0]?.arr_size?.map(item => ({
            name: item?.size_name || '',
            value: item?.size || '',
          })
        ) : pageState.filter.size.list),
      listOrigin: !!querySearch
        ? data?.listTemplate?.find(item => item.type === querySearch)?.arr_size?.map(item => ({
          name: item?.size_name || '',
          value: item?.size || '',
        }))
        : pageState.filter.size.listOrigin || data?.listTemplate[0]?.arr_size?.map(item => ({
          name: item?.size_name || '',
          value: item?.size || '',
        })
      ),
    },
  }
}
