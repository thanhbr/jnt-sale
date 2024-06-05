export const facebookResponseContentScriptInitialState = {
  filter: {keyword: '', pagination: {page: 0, totalItems: 0}},
  script: {
    list: [],
    detail: {
      data: {data: null, confirm: false, loading: false, modifiled: false},
      type: '',
    },
    loading: true,
  },
  modal: {confirmDelete: {data: null, loading: false}},
}
