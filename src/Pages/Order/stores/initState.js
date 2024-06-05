import moment from "moment";
import {SCRIPT} from "../_script";
const days=7; // Days you want to subtract
const date = new Date();
export const initialOrderState = {
  OrderTab: "manage_order",
  DetailTab: "order_detail",
  OrderDetail: {
    order_id: "--",
    order_status: "draft",
  },
  listSnippet: [],
  listOrderSelected: [],
  isOpenFilter: false,
  List: {
    listOrigin: [],
    listStatus: [],
    listEmpl: [],
    listWarehouse: [],
    listShipping: [],
  },
  ObjectFilter: {
    warehouse_id: "",
    shipping_partner: "",
    shipping_status: "",
    order_source: "",
    employee: "",
    keyword: "",
    customer_id: "",
    user_id: "",

    page_obj: {
      per_page: 20,
      start: 0,
      current_page: 1,
      all_page: 1,
      totals: 0,
    },

    string_querry: {
      field: "client",
      value: "",
    },
    date_querry: {
      field: "date_create",
      range: {
        end_date: new Date().getTime(),
        start_date: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
      },
      text: `${moment(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).format(
        "DD/MM/YYYY"
      )} - ${moment(new Date().getTime()).format("DD/MM/YYYY")}`,
    },
  },
  dataGrid: [],

  new_order: {
    contact: {
      start: 0,
    },
    message: {
    },
    fee: [],
    warehouse: { label: "Warehouse" },
    price_board: { label: "retail_price_board", value: "retail_price_board" },
    client_info: {
      name: "",
      mobile: "",
      city_id: "",
      city_name: "",
      district_id: "",
      district_name: "",
      ward_id: "",
      ward_name: "",
      address: "",
      area: {
        label: "",
        value: {
          district_id: "",
          city_id: "",
        },
      },
      ward: {
        label: "",
        value: "",
      },
    },
    product_info: [
    ],

    shipping_info: {
      isSelected: "",
      saleAt: "sale_with_shipping_partner",
      partner: {
      },
      serviceSelected: {},
    },
    order_info: {
      orderCode: "",
      origin: {},
      note: "",
      discount: 0,
      totals: 0,
    },
    totals: 0,
    discount: 0,
    showModal: false,
    search: 0,
  },
  showFilterAdvance: false,
  showOrderFilter: false,
  meta: {
    start: 0,
    per_page: 10,
    totals: 0,
    totals_cod: 0,
    totals_amount: 0,
    totals_ship_fee: 0,
  },
  loading: true,
  loadingPanel: true,
  loadDetail: false,
  group: {
    origin: [],
    position: [],
    employee: [],
    shipping: [],
    warehouse: [],
    product: [],
    status: []
  },
  filter: {
    page: 0,
    per_page: 20,
    keyword: {
      label: '',
      value: '',
      name: '',
    },
    date_type: {
      label: SCRIPT.DATE.CREATE,
      value: '',
      name: '',
    },
    start_date: {
      label: 'order_date_created',
      value: moment(new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))).format("YYYY-MM-DD hh:mm"),
      name: '',
    },
    end_date: {
      label: 'order_date_created',
      value: moment(date).format("YYYY-MM-DD hh:mm"),
      name: '',
    },
    customer_id: {
      label: '',
      value: '',
      name: '',
    },
    group_user: {
      label: '',
      value: '',
      name: '',
    },
    user_id: {
      label: '',
      value: '',
      name: '',
    },
    warehouse_id: {
      label: '',
      value: '',
      name: '',
    },
    shipping_partner: {
      label: '',
      value: '',
      name: '',
    },
    shipping_status: {
      label: '',
      value: '',
      name: '',
    },
    product_id: {
      label: '',
      value: '',
      name: '',
    },
    livestream_id: {
      label: '',
      value: '',
      name: '',
    },
    order_origin_id: {
      label: '',
      value: '',
      name: '',
    },
    is_duplicate: {
      label: '',
      value: '',
      name: SCRIPT.FILTER.NOT_DUPLICATE,
    },
  },

  chipFilter: {
    page: 0,
    per_page: 20,
    keyword: {
      label: '',
      value: '',
      name: '',
    },
    date_type: {
      label: '',
      value: '',
      name: '',
    },
    start_date: {
      label: 'order_date_created',
      value: moment(new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))).format("YYYY-MM-DD hh:mm"),
      name: '',
    },
    end_date: {
      label: 'order_date_created',
      value: moment(date).format("YYYY-MM-DD hh:mm"),
      name: '',
    },
    customer_id: {
      label: '',
      value: '',
      name: '',
    },
    group_user: {
      label: '',
      value: '',
      name: '',
    },
    user_id: {
      label: '',
      value: '',
      name: '',
    },
    warehouse_id: {
      label: '',
      value: '',
      name: '',
    },
    shipping_partner: {
      label: '',
      value: '',
      name: '',
    },
    shipping_status: {
      label: '',
      value: '',
      name: '',
    },
    product_id: {
      label: '',
      value: '',
      name: '',
    },
    livestream_id: {
      label: '',
      value: '',
      name: '',
    },
    order_origin_id: {
      label: '',
      value: '',
      name: '',
    },
    is_duplicate: {
      label: '',
      value: '',
      name: SCRIPT.FILTER.NOT_DUPLICATE,
    },
  },
  applySearch: false,
  products: []
};
