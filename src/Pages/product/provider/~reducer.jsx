import {productActions} from "./~action";
import {actionTypes} from "../../purchases/provider/_reducer";

export const productReducer = (state, action) => {
  switch (action.type) {
    case productActions.FILTER_ADVANCED_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action?.payload
        },
      }
    case productActions.FILTER_ADVANCED_STATUS_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          status: {
            ...state.filter.status,
            id: action?.payload?.id || '',
            active: action?.payload?.active || '',
            name: action?.payload?.name || '',
          },
        },
      }
    case productActions.FILTER_ADVANCED_CATEGORY_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          category_id: {
            ...state.filter.category_id,
            id: action?.payload?.id || '',
            active: action?.payload?.active || '',
            name: action?.payload?.name || '',
          },
        },
      }

    //  TABLE
    case productActions.SET_LIST_DEFAULT:
      return {
        ...state,
        table: {
          ...state.table,
          listDefault: action?.payload
        },
      }
    case productActions.TABLE_AMOUNT_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
            totalItems: action.payload?.pagination?.totalItems,
          },
        },
      }
    case productActions.TABLE_DEBOUNCE_CHANGE_PRODUCT_STATUS:
      return {
        ...state,
        table: {
          ...state.table,
          debounceProductStatus: action.payload
        },
      }
    case productActions.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
        },
      }
    case productActions.TABLE_DISPLAY_DETAIL_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            id: action.payload?.id || null,
            active: action.payload?.active || null,
            list: action.payload?.list || [],
          },
        },
      }
    case productActions.TABLE_DISPLAY_LOADING_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            loading: action?.payload || false,
          },
        },
      }

    case productActions.CHANGE_FORM_STATUS:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          statusForm: action?.payload || '',
        },
      }

    case productActions.TABLE_SELECTED_LIST_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          selected: {
            ...state.table.selected,
            list: action.payload?.selected?.list || [],
          },
        },
      }

    case productActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            id: action.payload?.id || null,
          },
        },
      }
    //  BASIC
    case productActions.FORM_CREATE_CHANGE_ACTIVE_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            active: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_NAME_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            name: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_CODE_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            code: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_BARCODE_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            barCode: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_ADD_LIST_ORIGIN:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            groupProduct: {
              ...state.formCreate.basic.groupProduct,
              list: action?.payload?.list,
              listOrigin: action?.payload?.listOrigin,
            }
          }
        }
      }
    case productActions.FORM_CREATE_UPDATE_LIST_CHILDREN_TWO:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            groupProduct: {
              ...state.formCreate.basic.groupProduct,
              listChildTwo: action?.payload,
            }
          }
        }
      }
    case productActions.FORM_CREATE_SEARCH_LIST_ORIGIN:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            groupProduct: {
              ...state.formCreate.basic.groupProduct,
              search: {
                keyword: action?.payload?.keyword,
                list: action?.payload?.list,
              },
            }
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            groupProduct: {
              ...state.formCreate.basic.groupProduct,
              id: action?.payload,
            }
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            groupProduct: {
              ...state.formCreate.basic.groupProduct,
              value: action?.payload,
            }
          }
        }
      }
    case productActions.FORM_CREATE_OPEN_MODAL_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            modal: {
              ...state.formCreate.basic.modal,
              open: action?.payload,
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_CODE_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            modal: {
              ...state.formCreate.basic.modal,
              form: {
                ...state.formCreate.basic.modal.form,
                code: action?.payload,
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_NAME_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            modal: {
              ...state.formCreate.basic.modal,
              form: {
                ...state.formCreate.basic.modal.form,
                name: action?.payload,
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_GROUP_PRODUCT_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            modal: {
              ...state.formCreate.basic.modal,
              form: {
                ...state.formCreate.basic.modal.form,
                group: action?.payload,
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_NOTE_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            modal: {
              ...state.formCreate.basic.modal,
              form: {
                ...state.formCreate.basic.modal.form,
                note: action?.payload,
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_VALIDATE_CODE_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            modal: {
              ...state.formCreate.basic.modal,
              validate: {
                ...state.formCreate.basic.modal.validate,
                code: {
                  status: action?.payload?.status,
                  message: action?.payload?.message,
                },
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_VALIDATE_NAME_INFO_BASIC:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            modal: {
              ...state.formCreate.basic.modal,
              validate: {
                ...state.formCreate.basic.modal.validate,
                name: {
                  status: action?.payload?.status,
                  message: action?.payload?.message,
                },
              }
            }
          }
        }
      }
    //  PRICE
    case productActions.FORM_CREATE_INIT_PRICE_RETAIL:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            retail: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_INIT_PRICE_WHOLESALE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            wholesale: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_INIT_PRICE_LAST_ENTRY:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            lastEntry: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_INIT_PRICE_COST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            cost: action.payload
          }
        }
      }
    // WAREHOUSE
    case productActions.FORM_CREATE_ADD_LIST_ORIGIN_WAREHOUSE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          inventory: {
            ...state.formCreate.inventory,
            warehouse: {
              ...state.formCreate.inventory.warehouse,
              id: action?.payload?.id || '',
              value: action?.payload?.value || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
            }
          }
        }
      }
    case productActions.FORM_CREATE_UPDATE_LIST_WAREHOUSE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          inventory: {
            ...state.formCreate.inventory,
            warehouse: {
              ...state.formCreate.inventory.warehouse,
              list: action?.payload?.list,
              listOrigin: action?.payload?.listOrigin,
            }
          }
        }
      }
    case productActions.FORM_CREATE_INIT_INVENTORY:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          inventory: {
            ...state.formCreate.inventory,
            init: action?.payload
          }
        }
      }

    //  PRODUCT
    case productActions.FORM_CREATE_CHANGE_IMAGE_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            image: {
              ...state.formCreate.product.image,
              name: action?.payload?.name || '',
              link: action?.payload?.link || '',
            }
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_UNIT_TYPE_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            unit: {
              ...state.formCreate.product.unit,
              type: action.payload
            }
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_UNIT_VALUE_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            unit: {
              ...state.formCreate.product.unit,
              value: action.payload
            }
          }
        }
      }
    case productActions.FORM_CREATE_ADD_LIST_ORIGIN_UNIT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            unit: {
              ...state.formCreate.product.unit,
              list: action?.payload?.list,
              listOrigin: action?.payload?.listOrigin,
            }
          }
        }
      }
    case productActions.FORM_CREATE_SHOW_NOTE_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            note: {
              ...state.formCreate.product.note,
              open: action.payload
            }
          }
        }
      }
    case productActions.FORM_CREATE_INIT_INVENTORY_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          inventory: {
            ...state.formCreate.inventory,
            statusInit: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_INIT_ATTRIBUTES_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            initAttr: action.payload
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_SKU_CHILD:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            validateSKU: action.payload
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_BAR_CODE_CHILD:
      console.log({
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            validateBarcode: action.payload
          }
        }
      })
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            validateBarcode: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_ATTRIBUTES_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            arrAttr: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_ATTRIBUTES_VALUE_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            attrVersion: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_ATTRIBUTES_COLUMN_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            valueVersion: action.payload
          }
        }
      }
    case productActions.FORM_EDIT_CHANGE_ATTRIBUTES_COLUMN_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            valueEditVersion: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_TOGGLE_MODAL_PRODUCT_PRICE_MANAGER:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          version: {
            ...state.formCreate.version,
            modalPrice: {
              ...state.formCreate.version.modalPrice,
              open: action.payload
            }
          }
        }
      }

    case productActions.FORM_CREATE_INIT_WEIGHT_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            weight: action.payload
          }
        }
      }
    case productActions.FORM_CREATE_INIT_NOTE_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            note: {
              ...state.formCreate.product.note,
              content: action.payload
            }
          }
        }
      }
    case productActions.FORM_CREATE_CHANGE_INVENTORY_VALUE_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          inventory: {
            ...state.formCreate.inventory,
            warehouse: {
              ...state.formCreate.inventory.warehouse,
              value: action.payload
            }
          }
        }
      }

    case productActions.FORM_CREATE_OPEN_MODAL_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            modal: {
              ...state.formCreate.product.modal,
              open: action?.payload,
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_UNIT_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            modal: {
              ...state.formCreate.product.modal,
              form: {
                ...state.formCreate.product.modal.form,
                unit: action?.payload,
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_SYMBOL_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            modal: {
              ...state.formCreate.product.modal,
              form: {
                ...state.formCreate.product.modal.form,
                symbol: action?.payload,
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_VALIDATE_UNIT_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            modal: {
              ...state.formCreate.product.modal,
              validate: {
                ...state.formCreate.product.modal.validate,
                unit: {
                  status: action?.payload?.status,
                  message: action?.payload?.message,
                },
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_MODAL_VALIDATE_SYMBOL_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            modal: {
              ...state.formCreate.product.modal,
              validate: {
                ...state.formCreate.product.modal.validate,
                symbol: {
                  status: action?.payload?.status,
                  message: action?.payload?.message,
                },
              }
            }
          }
        }
      }

    //  VALIDATE
    case productActions.VALIDATE_FORM_CREATE_NAME:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            validate: {
              ...state.formCreate.basic.validate,
              name: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_CODE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            validate: {
              ...state.formCreate.basic.validate,
              code: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_BARCODE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            validate: {
              ...state.formCreate.basic.validate,
              barCode: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          basic: {
            ...state.formCreate.basic,
            validate: {
              ...state.formCreate.basic.validate,
              group: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_UNIT_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            validate: {
              ...state.formCreate.product.validate,
              unit: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_WEIGHT_PRODUCT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            validate: {
              ...state.formCreate.product.validate,
              weight: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_INIT_INVENTORY:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          inventory: {
            ...state.formCreate.inventory,
            validate: {
              ...state.formCreate.inventory.validate,
              init: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_RETAIL:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            validate: {
              ...state.formCreate.price.validate,
              retail: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_WHOLESALE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            validate: {
              ...state.formCreate.price.validate,
              wholesale: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_LAST_ENTRY:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            validate: {
              ...state.formCreate.price.validate,
              lastEntry: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_COST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          price: {
            ...state.formCreate.price,
            validate: {
              ...state.formCreate.price.validate,
              cost: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.VALIDATE_FORM_CREATE_PRODUCT_IMAGE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          product: {
            ...state.formCreate.product,
            validate: {
              ...state.formCreate.product.validate,
              image: {
                status: action?.payload?.status,
                message: action?.payload?.message,
              }
            }
          }
        }
      }
    case productActions.FORM_CREATE_ZOOM_IN_IMAGE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          zoomIn: {
            ...state.formCreate.zoomIn,
            open: action?.payload
          }
        }
      }
    case productActions.FORM_CREATE_ZOOM_IN_IMAGE_LINK_ACTIVE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          zoomIn: {
            ...state.formCreate.zoomIn,
            linkActive: action?.payload
          }
        }
      }

    //  PRINT BARCODE
    case productActions.PRINT_CODE_SET_LOADING:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          loading: action?.payload
        }
      }
    case productActions.PRINT_CODE_UPDATE_PRODUCT_DEFAULT:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          product: {
            ...state.printBarcode.product,
            list: action?.payload
          }
        }
      }
    case productActions.PRINT_CODE_ADD_LIST_ORIGIN_WAREHOUSE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            warehouse: {
              ...state.printBarcode?.withInventoryConfig?.warehouse,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || '',
            },
          },
        },
      }
    case productActions.PRINT_CODE_ADD_KEYWORD_CHANGE_WAREHOUSE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          warehouse: {
            ...state?.printBarcode?.warehouse,
            list: action?.payload|| [],
          }
        }
      }
    case productActions.PRINT_CODE_ADD_VALUE_WAREHOUSE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          warehouse: {
            ...state?.printBarcode?.warehouse,
            value: action?.payload,
          }
        }
      }
    case productActions.PRINT_CODE_CHANGE_TYPE_PRICE_WAREHOUSE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          priceType: {
            ...state?.printBarcode?.priceType,
            value: action?.payload,
          }
        }
      }
    case productActions.PRINT_CODE_UPDATE_PRODUCT_LIST_ORIGIN:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          product: {
            ...state.printBarcode.product,
            listOrigin: action?.payload || []
          }
        }
      }
    case productActions.PRINT_CODE_UPDATE_VALUE_SEARCH_PRODUCT:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          product: {
            ...state.printBarcode.product,
            value: action?.payload || ''
          }
        }
      }
    case productActions.PRINT_CODE_UPDATE_PRINT_TYPE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          formSubmit: {
            ...state.printBarcode.formSubmit,
            print_type: action?.payload
          }
        }
      }
    case productActions.PRINT_CODE_UPDATE_PRINT_SETTING:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          formSubmit: {
            ...state.printBarcode.formSubmit,
            print_setting: action?.payload
          }
        }
      }
    case productActions.PRINT_CODE_UPDATE_ARR_PRODUCT:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          formSubmit: {
            ...state.printBarcode.formSubmit,
            arr_product: action?.payload
          }
        }
      }

    case productActions.FORM_WITH_INVENTORY_SEARCH_LOADING_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            search: {
              ...state.printBarcode.withInventoryConfig.search,
              loading: true,
            },
          },
        },
      }
    case productActions.FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            search: {
              ...state.printBarcode.withInventoryConfig.search,
              list: action.payload?.list,
              loading: action.payload?.loading,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }
    case productActions.FORM_WITH_INVENTORY_SEARCH_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            search: {
              ...state.printBarcode.withInventoryConfig.search,
              value: action.payload?.value,
            },
          },
        },
      }
    case productActions.FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
              ...state.printBarcode.withInventoryConfig,
              search: {
                ...state.printBarcode.withInventoryConfig.search,
                selected: action.payload?.list,
              },
            },
        },
      }
    case productActions.FORM_WITH_INVENTORY_TOTAL_DISCOUNT_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.form.productInfo.withInventoryConfig,
            discount: {
              ...state.form.productInfo.withInventoryConfig.discount,
              type: action.payload?.type,
              value: action.payload?.value,
            },
          },
        },
      }
    case productActions.FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            priceType: {
              ...state.printBarcode.withInventoryConfig.priceType,
              value: action.payload?.value,
            },
          },
        },
      }

    case productActions.FORM_WITH_INVENTORY_WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            warehouse: {
              ...state.printBarcode.withInventoryConfig.warehouse,
              keyword: action.payload?.keyword,
            },
          },
        },
      }
    case productActions.FORM_WITH_INVENTORY_WAREHOUSE_LIST_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            warehouse: {
              ...state.printBarcode.withInventoryConfig.warehouse,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }
    case productActions.FORM_WITH_INVENTORY_WAREHOUSE_UPDATE:
      return {
        ...state,
        printBarcode: {
          ...state.printBarcode,
          withInventoryConfig: {
            ...state.printBarcode.withInventoryConfig,
            search: {
              ...state.printBarcode.withInventoryConfig.search,
              selected: [],
            },
            warehouse: {
              ...state.printBarcode.withInventoryConfig.warehouse,
              value: action.payload?.value,
            },
          },
        },
      }

    //  MODAL
    case productActions.MODAL_CONFIRM_PRODUCT_STATUS:
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmProductStatus: action?.payload
        }
      }
      case productActions.MODAL_CONFIRM_PRODUCT_DETAIL_STATUS:
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmProductDetailStatus: action?.payload
        }
      }
    case productActions.MODAL_CONFIRM_PRODUCT_GROUP_STATUS:
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmProductGroupStatus: action?.payload
        }
      }
    case productActions.DATA_CHANGE_PRODUCT_STATUS:
      return {
        ...state,
        modal: {
          ...state.modal,
          dataChangeProductStatus: action?.payload
        }
      }
      case productActions.DATA_CHANGE_PRODUCT__DETAIL_STATUS:
      return {
        ...state,
        modal: {
          ...state.modal,
          dataChangeProductDetailStatus: action?.payload
        }
      }
    case productActions.MODAL_CONFIRM_REMOVE_PRODUCT:
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmRemoveProduct: action?.payload
        }
      }
    case productActions.DATA_REMOVE_PRODUCT_TBODY:
      return {
        ...state,
        modal: {
          ...state.modal,
          dataRemoveProduct: action?.payload
        }
      }
    case productActions.EDIT_PRODUCT_CONFIRM_POPUP_1:
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmPopup1: action?.payload
        }
      }
    case productActions.EDIT_PRODUCT_CONFIRM_POPUP_2:
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmPopup2: action?.payload
        }
      }
    case productActions.EDIT_PRODUCT_CONFIRM_POPUP_3:
      return {
        ...state,
        modal: {
          ...state.modal,
          confirmPopup3: action?.payload
        }
      }
    case productActions.EDIT_PRODUCT_STATUS_CONFIRM:
      return {
        ...state,
        modal: {
          ...state.modal,
          statusConfirmEdit: {
            ...state.modal.statusConfirmEdit,
            warehouse_quantity: action?.payload?.warehouse_quantity,
            order: action?.payload?.order,
          }
        }
      }
    case productActions.EXPORT_FILE:
      return {
        ...state,
        export_file:action.payload
      }
    case productActions.IMPORT_FILE:
      return{
        ...state,
        import_file:action.payload,
      }
    case productActions.SET_FILTER:
      return {
        ...state,
        filter: {...state.filter, ...action.payload},
      }
    case productActions.WARE_HOUSE_LIST:
      return{
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            list: action.payload?.list?.map(item => ({
              name: item?.warehouse_name || '',
              value: item?.id || '',

            })),
            listOrigin: action.payload?.list?.map(item => ({
              name: item?.warehouse_name || '',
              value: item?.id || '',

            })),
            value:{
              name: action.payload?.value?.warehouse_name,
              value : action.payload?.value?.id
            }
          },
        },
      }
    case productActions.FILTER_WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case productActions.FILTER_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            value: action.payload?.value || null,
          },
        },
      }
    case productActions.CHECK_DETAIL_TAB_ID:
      return{
        ...state,
        tab:{
          ...state.tab,
          tab_id:action.payload,
        }
      }
    case productActions.CHECK_LIST_TAB_ID:
      return {
        ...state,
        tab:{
          ...state.tab,
          list_id: action.payload
        }
      }
      //erorrs import data
    case actionTypes.NOTIFICATIONS_LIST_UPDATE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: action.payload?.notifications?.list || [],
          total: action?.payload?.notifications?.total || 0
        },
      }
    default:
      throw new Error()
  }
}