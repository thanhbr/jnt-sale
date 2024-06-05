const SettingReducer = (state, action) => {
  switch (action.type) {
    case "GET_SETTING_DATA":
      return {
        ...state,
        setting_store: {
          store_info: {
            ...action.payload,
            area: {
              label: `${action.payload.city_name} - ${action.payload.district_name}`,
              value: {
                store_district_id: action.payload.store_district_id,
                store_province_id: action.payload.store_province_id,
              },
            },
            ward: {
              label: action.payload.ward_name,
              value: action.payload.store_ward_id,
            },
          }
        },
      };
    case "CHANGE_AREA":
      return {
        ...state,
        setting_store: {
          ...state.store_info,
          store_info: {
            ...state.setting_store.store_info,
            area: action.payload,
          },
        },
      };
    case "CHANGE_WARD":
      return {
        ...state,
        setting_store: {
          ...state.setting_store,
          store_info: {
            ...state.setting_store.store_info,
            ward: action.payload,
          },
        },
      };

    default:
      return state;
  }
};

export default SettingReducer;
