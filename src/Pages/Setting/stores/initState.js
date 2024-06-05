export const initialSettingState = {
  SettingTab: "store_setting",
  DetailTab: "order_detail",
  setting_store: {
    store_info: {
      store_name: "",
      store_phone: "",
      store_logo: "",
      store_address: "",
      store_email: "",
      ward_name: "",
      address: "",
      area: {
        label: "",
        value: {
          store_district_id: "",
          store_province_id: "",
        },
      },
      ward: {
        label: "",
        value: "",
      },
    },
  },
};
