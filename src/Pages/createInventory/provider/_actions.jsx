export const orderSingleAction = {
  ORIGIN: 'ORIGIN',
  RESET_FORM_DEFAULT: 'RESET_FORM_DEFAULT',
  // customer info
  FORM_PHONE_UPDATE: 'FORM_PHONE_UPDATE',
  FORM_PHONE_DETAIL_DELETE: 'FORM_PHONE_DETAIL_DELETE',
  FORM_PHONE_DETAIL_UPDATE: 'FORM_PHONE_DETAIL_UPDATE',
  FORM_PHONE_LIST_UPDATE: 'FORM_PHONE_LIST_UPDATE',
  FORM_PHONE_ORDER_FIGURE_UPDATE: 'FORM_PHONE_ORDER_FIGURE_UPDATE',
  FORM_PHONE_ORDER_FIGURE_LOADING_UPDATE:
    'FORM_PHONE_ORDER_FIGURE_LOADING_UPDATE',
  FORM_PHONE_ORDER_RECENT_UPDATE: 'FORM_PHONE_ORDER_RECENT_UPDATE',
  FORM_PHONE_REPORT_UPDATE: 'FORM_PHONE_REPORT_UPDATE',
  FORM_FULL_NAME_KEYWORD_UPDATE: 'FORM_FULL_NAME_KEYWORD_UPDATE',
  FORM_FULL_NAME_LIST_UPDATE: 'FORM_FULL_NAME_LIST_UPDATE',
  FORM_FULL_NAME_LOADING_UPDATE: 'FORM_FULL_NAME_LOADING_UPDATE',
  FORM_FULL_NAME_UPDATE: 'FORM_FULL_NAME_UPDATE',
  FORM_ADDRESS_UPDATE: 'FORM_ADDRESS_UPDATE',
  FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE: 'FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE',
  FORM_ADDRESS_PROVINCE_UPDATE: 'FORM_ADDRESS_PROVINCE_UPDATE',
  FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE: 'FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE',
  FORM_ADDRESS_DISTRICT_UPDATE: 'FORM_ADDRESS_DISTRICT_UPDATE',
  FORM_ADDRESS_WARD_KEYWORD_UPDATE: 'FORM_ADDRESS_WARD_KEYWORD_UPDATE',
  FORM_ADDRESS_WARD_UPDATE: 'FORM_ADDRESS_WARD_UPDATE',
  RESET_FORM_CUSTOMER_INFO: 'RESET_FORM_CUSTOMER_INFO',
  // product info
  FORM_INVENTORY_TOGGLE: 'FORM_INVENTORY_TOGGLE',
  FORM_INVENTORY_TYPE_UPDATE: 'FORM_INVENTORY_TYPE_UPDATE',
  FORM_INVENTORY_MANUAL_UPDATE: 'FORM_INVENTORY_MANUAL_UPDATE',
  FORM_INVENTORY_AUTO_UPDATE: 'FORM_INVENTORY_AUTO_UPDATE',
  FORM_INVENTORY_AUTO_LIST_UPDATE: 'FORM_INVENTORY_AUTO_LIST_UPDATE',
  FORM_INVENTORY_AUTO_LOADING_UPDATE: 'FORM_INVENTORY_AUTO_LOADING_UPDATE',
  FORM_INVENTORY_AUTO_SELECTED_UPDATE: 'FORM_INVENTORY_AUTO_SELECTED_UPDATE',
  FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE:
    'FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE',
  FORM_WITH_INVENTORY_SEARCH_UPDATE: 'FORM_WITH_INVENTORY_SEARCH_UPDATE',
  FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE:
    'FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE',
  FORM_WITH_INVENTORY_SEARCH_LOADING_UPDATE:
    'FORM_WITH_INVENTORY_SEARCH_LOADING_UPDATE',
  FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE:
    'FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE',
  FORM_WITH_INVENTORY_WAREHOUSE_KEYWORD_UPDATE:
    'FORM_WITH_INVENTORY_WAREHOUSE_KEYWORD_UPDATE',
  FORM_WITH_INVENTORY_WAREHOUSE_UPDATE: 'FORM_WITH_INVENTORY_WAREHOUSE_UPDATE',
  FORM_WITH_INVENTORY_WAREHOUSE_LIST_UPDATE:
    'FORM_WITH_INVENTORY_WAREHOUSE_LIST_UPDATE',
  FORM_WITH_INVENTORY_TOTAL_DISCOUNT_UPDATE:
    'FORM_WITH_INVENTORY_TOTAL_DISCOUNT_UPDATE',
  // Shipping info
  UPDATE_LIST_SHIPPING_PARTNER: 'UPDATE_LIST_SHIPPING_PARTNER',
  UPDATE_LIST_SHIPPING_FEE: 'UPDATE_LIST_SHIPPING_FEE',
  UPDATE_SHIPPING_FEE: 'UPDATE_SHIPPING_FEE',
  RESET_LIST_SHIPPING_FEE: 'RESET_LIST_SHIPPING_FEE',
  UPDATE_SHIPPING_PARTNER_SELECTED: 'UPDATE_SHIPPING_PARTNER_SELECTED',
  UPDATE_SHIPPING_PARTNER_INFO: 'UPDATE_SHIPPING_PARTNER_INFO',
  SET_SHIPPING_PARTNER_DEFAULT: 'SET_SHIPPING_PARTNER_DEFAULT',
  UPDATE_SHIPPING_PARTNER_OPTION_PAYER: 'UPDATE_SHIPPING_PARTNER_OPTION_PAYER',
  UPDATE_SHIPPING_PARTNER_OPTION_PICKUP:
    'UPDATE_SHIPPING_PARTNER_OPTION_PICKUP',
  UPDATE_SHIPPING_PARTNER_OPTION_REQUEST:
    'UPDATE_SHIPPING_PARTNER_OPTION_REQUEST',
  UPDATE_SHIPPING_PARTNER_OPTION_PARTSIGN:
    'UPDATE_SHIPPING_PARTNER_OPTION_PARTSIGN',
  UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_STATUS:
    'UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_STATUS',
  UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_VALUE:
    'UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_VALUE',
  SET_VALUE_PACKAGE_QUANTITY: 'SET_VALUE_PACKAGE_QUANTITY',
  UPDATE_LIST_DELIVERY_NOTE: 'UPDATE_LIST_DELIVERY_NOTE',
  UPDATE_SHIPPING_INFO: 'UPDATE_SHIPPING_INFO',
  SET_COLLAPSE_SHIPING: 'SET_COLLAPSE_SHIPING',
  UPDATE_SHIPPING_PARTNER_OPTION_PICKUPSHIFT:
    'UPDATE_SHIPPING_PARTNER_OPTION_PICKUPSHIFT',
  FORM_SHIPPING_DATETIME_UPDATE: 'FORM_SHIPPING_DATETIME_UPDATE',
  UPDATE_SHIPPING_PARTNER_OPTION_SHIPPING_METHOD:
    'UPDATE_SHIPPING_PARTNER_OPTION_SHIPPING_METHOD',
  UPDATE_SHIPPING_INFO_PICK_UP_STORE: 'UPDATE_SHIPPING_INFO_PICK_UP_STORE',
  SET_SHIPPING_SERVICE: 'SET_SHIPPING_SERVICE',
  // extra info
  FORM_NOTE_UPDATE: 'FORM_NOTE_UPDATE',
  FORM_SHIPPING_POINT_UPDATE: 'FORM_SHIPPING_POINT_UPDATE',
  FORM_SHIPPING_POINT_KEYWORD_UPDATE: 'FORM_SHIPPING_POINT_KEYWORD_UPDATE',
  FORM_SHIPPING_POINT_LIST_UPDATE: 'FORM_SHIPPING_POINT_LIST_UPDATE',
  FORM_SOURCE_UPDATE: 'FORM_SOURCE_UPDATE',
  FORM_SOURCE_KEYWORD_UPDATE: 'FORM_SOURCE_KEYWORD_UPDATE',
  FORM_SOURCE_LIST_UPDATE: 'FORM_SOURCE_LIST_UPDATE',
  FORM_UNIQUE_ORDER_NUMBER_UPDATE: 'FORM_UNIQUE_ORDER_NUMBER_UPDATE',
  // payment method
  FORM_PAYMENT_METHOD_UPDATE: 'FORM_PAYMENT_METHOD_UPDATE',
  FORM_PAYMENT_METHOD_KEYWORD_UPDATE: 'FORM_PAYMENT_METHOD_KEYWORD_UPDATE',
  FORM_PAYMENT_METHOD_LIST_UPDATE: 'FORM_PAYMENT_METHOD_LIST_UPDATE',
  FORM_PAYMENT_METHOD_TYPE_UPDATE: 'FORM_PAYMENT_METHOD_TYPE_UPDATE',
  FORM_PAYMENT_MONEY_UPDATE: 'FORM_PAYMENT_MONEY_UPDATE',
  FORM_PAYMENT_DATETIME_UPDATE: 'FORM_PAYMENT_DATETIME_UPDATE',
  // VALIDATE
  SET_VALIDATE_FORM: 'SET_VALIDATE_FORM',
  SET_VALIDATE_SHIPPING_PARTNER: 'SET_VALIDATE_SHIPPING_PARTNER',
  // RESPONSEDATA
  SET_RESPONSE_DATA: 'SET_RESPONSE_DATA',
  UPDATE_LOADING: 'UPDATE_LOADING',

  // EDIT FORM
  EDIT_FORM_CREATOR: 'EDIT_FORM_CREATOR',
  EDIT_FORM_SHIPPING_STATUS: 'EDIT_FORM_SHIPPING_STATUS',
  EDIT_FORM_INVENTORY_TOGGLE: 'EDIT_FORM_INVENTORY_TOGGLE',
  EDIT_FORM_TEXT_PAID: 'EDIT_FORM_TEXT_PAID',
  EDIT_UPDATE_PICK_UP_STORE: 'EDIT_UPDATE_PICK_UP_STORE',

  EDIT_TOGGLE_MODAL_PAYMENT: 'EDIT_TOGGLE_MODAL_PAYMENT',
  VALIDATE_EDIT_MODAL_FORM_NAME: 'VALIDATE_EDIT_MODAL_FORM_NAME',
  EDIT_MODAL_PAYMENT_IS_ACTIVE: 'EDIT_MODAL_PAYMENT_IS_ACTIVE',
  EDIT_MODAL_PAYMENT_STATUS: 'EDIT_MODAL_PAYMENT_STATUS',
  EDIT_MODAL_PAYMENT_FORM: 'EDIT_MODAL_PAYMENT_FORM',
  TOGGLE_MODAL_CONFIRM_PAYMENT_FORM: 'TOGGLE_MODAL_CONFIRM_PAYMENT_FORM',


  EDIT_TOGGLE_MODAL_DELIVERY_NOTE: 'EDIT_TOGGLE_MODAL_DELIVERY_NOTE',
  EDIT_MODAL_DELIVERY_NOTE: 'EDIT_MODAL_DELIVERY_NOTE',
  VALIDATE_EDIT_MODAL_DELIVERY_NOTE: 'VALIDATE_EDIT_MODAL_DELIVERY_NOTE',
  EDIT_MODAL_DELIVERY_NOTE_POSITION: 'EDIT_MODAL_DELIVERY_NOTE_POSITION',
  VALIDATE_EDIT_MODAL_DELIVERY_NOTE_POSITION: 'VALIDATE_EDIT_MODAL_DELIVERY_NOTE_POSITION',
  EDIT_MODAL_DELIVERY_NOTE_IS_ACTIVE: 'EDIT_MODAL_DELIVERY_NOTE_IS_ACTIVE',
  EDIT_MODAL_DELIVERY_NOTE_STATUS: 'EDIT_MODAL_DELIVERY_NOTE_STATUS',
  EDIT_MODAL_DELIVERY_NOTE_FORM: 'EDIT_MODAL_DELIVERY_NOTE_FORM',
  TOGGLE_MODAL_CONFIRM_DELIVERY_NOTE: 'TOGGLE_MODAL_CONFIRM_DELIVERY_NOTE',


  EDIT_TOGGLE_MODAL_SHIPPING_POINT: 'EDIT_TOGGLE_MODAL_SHIPPING_POINT',
  EDIT_MODAL_SHIPPING_POINT_NAME: 'EDIT_MODAL_SHIPPING_POINT_NAME',
  VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME: 'VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME',
  EDIT_MODAL_SHIPPING_POINT_PHONE: 'EDIT_MODAL_SHIPPING_POINT_PHONE',
  VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE: 'VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE',
  EDIT_MODAL_SHIPPING_POINT_EMAIL: 'EDIT_MODAL_SHIPPING_POINT_EMAIL',
  VALIDATE_EDIT_MODAL_SHIPPING_POINT_EMAIL: 'VALIDATE_EDIT_MODAL_SHIPPING_POINT_EMAIL',
  EDIT_MODAL_SHIPPING_POINT_CITY: 'EDIT_MODAL_SHIPPING_POINT_CITY',
  VALIDATE_EDIT_MODAL_SHIPPING_POINT_CITY: 'VALIDATE_EDIT_MODAL_SHIPPING_POINT_CITY',
  EDIT_MODAL_SHIPPING_POINT_DISTRICT: 'EDIT_MODAL_SHIPPING_POINT_DISTRICT',
  VALIDATE_EDIT_MODAL_SHIPPING_POINT_DISTRICT: 'VALIDATE_EDIT_MODAL_SHIPPING_POINT_DISTRICT',
  EDIT_MODAL_SHIPPING_POINT_WARD: 'EDIT_MODAL_SHIPPING_POINT_WARD',
  VALIDATE_EDIT_MODAL_SHIPPING_POINT_WARD: 'VALIDATE_EDIT_MODAL_SHIPPING_POINT_WARD',
  EDIT_MODAL_SHIPPING_POINT_ADDRESS: 'EDIT_MODAL_SHIPPING_POINT_ADDRESS',
  VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS: 'VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS',
  EDIT_MODAL_SHIPPING_POINT_SELECT_OPTION: 'EDIT_MODAL_SHIPPING_POINT_SELECT_OPTION',
  EDIT_MODAL_CONFIRM_SHIPPING_POINT: 'EDIT_MODAL_CONFIRM_SHIPPING_POINT',
  EDIT_MODAL_SHIPPING_POINT_FORM: 'EDIT_MODAL_SHIPPING_POINT_FORM',


  EDIT_TOGGLE_MODAL_SOURCE_ORDER: 'EDIT_TOGGLE_MODAL_SOURCE_ORDER',
  EDIT_TOGGLE_MODAL_SOURCE_ORDER_NAME: 'EDIT_TOGGLE_MODAL_SOURCE_ORDER_NAME',
  VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME: 'VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME',
  EDIT_TOGGLE_MODAL_SOURCE_ORDER_POSITION: 'EDIT_TOGGLE_MODAL_SOURCE_ORDER_POSITION',
  EDIT_MODAL_SOURCE_ORDER_FORM: 'EDIT_MODAL_SOURCE_ORDER_FORM',
  TOGGLE_MODAL_CONFIRM_SOURCE_ORDER_FORM: 'TOGGLE_MODAL_CONFIRM_SOURCE_ORDER_FORM',
  VALIDATE_EDIT_FORM_DELIVERY_NOTE: 'VALIDATE_EDIT_FORM_DELIVERY_NOTE',
}