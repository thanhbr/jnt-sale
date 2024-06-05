export const transformOriginData = data => {
  return {
    employee: {
      list: data.employeeListData.map(item => ({
        name: item?.fullname || '',
        value: item?.user_id || '',
        groups: item?.user_group
          ? item.user_group.split(',').filter(item => !!item)
          : [],
      })),
      type: {
        list: data.employeeGroupData.map(item => ({
          name: item?.group_name || '',
          value: item?.id || '',
        })),
      },
    },
  }
}

export const transformListData = statusListData => {
  const statusList = statusListData.filter(x => x.id !== '22')
  const tag22 = statusListData.find(x => x.id === '22')
  statusList.splice(3, 0, tag22)

  return statusList
}
