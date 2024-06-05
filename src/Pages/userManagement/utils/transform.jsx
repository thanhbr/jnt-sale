import {STATUS_LIST} from "../interfaces/~contants";

export const transformOriginData = (data, pageState) => {
	return {
		groupStatus: {
			activeValue: [],
			value: pageState?.filter?.groupStatus?.value || [],
			list: STATUS_LIST?.map(item => ({
				id: item?.id || '',
				name: item?.name || '',
			})),
		},
		groupEmployee: {
			activeValue: [],
			value: pageState?.filter?.groupEmployee?.value || [],
			list: data?.groupEmployee?.map(item => ({
				id: item?.id || '',
				name: item?.group_name || '',
				comment: item?.group_comment || '',
			})),
			listOrigin: data?.groupEmployee?.map(item => ({
				id: item?.id || '',
				name: item?.group_name || '',
				comment: item?.group_comment || '',
			})),
		},
	}
}
  