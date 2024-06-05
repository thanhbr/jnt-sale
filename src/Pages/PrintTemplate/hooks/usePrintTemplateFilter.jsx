import React, {useContext, useEffect, useState} from 'react';

import {printTemplateActions} from "../provider/~reducer";
import {transformOriginData} from "../utils/transform";
import {getData, postData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {PrintTemplateContext} from "../provider/~context";
import categories from "../~categories.json";
import toast from "../../../Component/Toast";
import {UposLogFunc} from "../../../util/functionUtil";
import {useSearchParams} from "react-router-dom";

const usePrintTemplate = () => {
  const {pageState, pageDispatch} = useContext(PrintTemplateContext)
  const [dataTemplate, setDataTemplate] = useState([])
  const editPrint = pageState.editPrint
  const [listType, setListType] = useState(pageState.filter.type.list)
  const [listSize, setListSize] = useState(pageState.filter.size.list)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const collectOriginData = data => {
    const fields = [
      'listTemplate',
    ]
    let collections = {}
    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.data?.success ? data[i]?.data?.data : []

      collections = {...collections, ...obj}
    })
    pageDispatch({
      type: printTemplateActions.FILTER,
      payload: transformOriginData(collections, pageState, querySearch),
    })

    setDataTemplate(collections.listTemplate)
  }
  useEffect(() => {
    if(!editPrint) {
      const fetchData = async () => {
        const response = await Promise.all([
          sendRequestAuth('get', `${config.API}/setting/print/list-type`),
        ])
        collectOriginData(response)
        const types = response[0]?.data?.data
        const result = types.map(type => {
          return {'value': type.type, 'name': type.type_name}
        })
        setListType(result)
      }
      fetchData()
    }
  }, [])
  useEffect(() => {
    setListSize(pageState.filter.size.list)
  }, [pageState.filter.size.list])
  useEffect(() => {
    if(!!pageState.filter.type.activeValue && !!pageState.filter.size.activeValue) {
      const fetchData = async () => {
        const response = await Promise.all([
          sendRequestAuth('get', `${config.API}/setting/print/detail?type=${pageState.filter.type.activeValue}&size=${pageState.filter.size.activeValue}`),
        ])
        if(response[0]?.data?.success) {
          pageDispatch({type: printTemplateActions.CONTENT.DEFAULT, payload: {template: response[0]?.data?.data?.content_print}})
          pageDispatch({type: printTemplateActions.ADD_ID_TEMPLATE, payload: response[0]?.data?.data?.id})

          pageDispatch({type: printTemplateActions.ON_CKEDITOR_CHANGE, payload: false})
          let content = response[0]?.data?.data?.content_print
          if(content?.indexOf('/my-assets/image/jnt-logo-png.png') !== -1) {
            content = content?.replace('/my-assets/image/jnt-logo-png.png', '/img/printTemplate/jnt-logo.png');
          }
          if(content?.indexOf('/my-assets/image/tiktok-full.png') !== -1) {
            content = content?.replace('/my-assets/image/tiktok-full.png', '/img/printTemplate/tiktok-full.png');
          }
          if(pageState.content.template !== content) {
            // eslint-disable-next-line no-undef
            CKEDITOR?.instances?.editor2?.setData(content) || CKEDITOR?.instances?.editor3?.setData(content) || CKEDITOR?.instances?.editor4?.setData(content) || CKEDITOR?.instances?.editor5?.setData(content) || CKEDITOR?.instances?.editor6?.setData(content) || CKEDITOR?.instances?.editor7?.setData(content) || CKEDITOR?.instances?.editor8?.setData(content) || CKEDITOR?.instances?.editor9?.setData(content) || CKEDITOR?.instances?.editor10?.setData(content) || CKEDITOR?.instances?.editor11?.setData(content) || CKEDITOR?.instances?.editor12?.setData(content) || CKEDITOR?.instances?.editor13?.setData(content)
          }
        }
      }
      fetchData()
    }
  }, [pageState.filter.type.activeValue, pageState.filter.size.activeValue])

  // ===========================FILTER TYPE================================
  const handleGroupTypeSelected = data => {
    const size = dataTemplate.find(item => item.type === data.value)
    const sizeValue = size?.arr_size[0]?.size
    const sizeName = size?.arr_size[0]?.size_name
    const listSize = size?.arr_size?.map(item => ({
      name: item?.size_name || '',
      value: item?.size || '',
    }))
    const category = categories.find(item => item.value === data.value) ?? []
    const listType = pageState?.filter?.type?.list ?? []
    if(!pageState.modalConfirmChange) {
      pageDispatch({
        type: printTemplateActions.FILTER,
        payload: {type: {activeValue: data.value, value: data.name, list: listType, listOrigin: listType},
          size: {activeValue: sizeValue, value: sizeName, list: listSize, listOrigin: listSize}},
      })
      pageDispatch({type: printTemplateActions.LIST_KEYWORD, payload: category})
      pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: ''})
    } else {
      pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE_CHANGE, payload: true})
      pageDispatch({type: printTemplateActions.OPTION_TYPE_FILTER, payload: data})
    }
  }


  // ==============================FILTER SIZE============================================
  const handleGroupSizeSelected = data => {
    if(!pageState.modalConfirmChange) {
      pageDispatch({
        type: printTemplateActions.FILTER,
        payload: {type: {activeValue: pageState.filter.type.activeValue, value: pageState.filter.type.value, list: pageState.filter.type.list, listOrigin: pageState.filter.type.listOrigin},
          size: {activeValue: data.value, value: data.name, list: pageState.filter.size.list, listOrigin: pageState.filter.size.listOrigin}},
      })
      pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: ''})
    } else {
      pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE_CHANGE, payload: true})
      pageDispatch({type: printTemplateActions.OPTION_SIZE_FILTER, payload: data})
    }
  }

  const handlePrint = () => {
    // in
    var frame = document.createElement('iframe')
    frame.name = "frame"
    frame.style.position = "absolute"
    frame.style.top = "-1000000px"
    document.body.appendChild(frame)

    const frameDoc = (frame.contentWindow) ? frame.contentWindow : (frame.contentDocument.document) ? frame.contentDocument.document : frame.contentDocument
    frameDoc.document.open()
    frameDoc.document.write(document.getElementById('print-template-content').innerHTML)
    frameDoc.document.close()
    window.frames.frame.focus()
    setTimeout(function() {
      window.frames.frame.print()
      document.body.removeChild(frame)
    }, 1500)
  }

  const handlePostTemplate = () => {
    if(pageState.oldValue.id !== pageState?.templateID ||
      pageState.oldValue.content !== pageState.content.template ||
      pageState.content.template !== pageState.templateAfterChange) {
      const dataPost = new FormData()
      const content = !!!pageState.templateAfterChange ? pageState.content.template : pageState.templateAfterChange
      dataPost.append('content', content)
      dataPost.append('type', pageState?.filter?.type?.activeValue)
      dataPost.append('size', pageState?.filter?.size?.activeValue)
      const url = `${config.API}/setting/print/update`
      pageDispatch({type: printTemplateActions.OLD_VALUE, payload: {oldValue: {id: pageState?.templateID, content: pageState.content.template}}})
      pageDispatch({type: printTemplateActions.SHOW_EDIT_PRINT})
      pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_CHANGE, payload: false})
      postData(url, dataPost)
        .then(res => {
          if (res.data && res.data.success) {
            pageDispatch({type: printTemplateActions.CONTENT.DEFAULT, payload: {template: content}})
            toast.success({ title: 'Cập nhật mẫu in thành công' })
          } else {
            toast.error({ title: 'Cập nhật mẫu in thất bại!' })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR UPDATE TEMPLATE: ${e.message}`)
        })
    }
  }

  const onCkeditorChange = (event) => {
    pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: event?.editor?.getData()})
    pageDispatch({type: printTemplateActions.ON_CKEDITOR_CHANGE, payload: true})
  }
  const onCkeditorSelectionChange = () => pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_CHANGE, payload: true})
  const selectedTemplateChange = () => {
    if(!!pageState.optionTypeFilter) {
      const data = pageState.optionTypeFilter
      const size = dataTemplate.find(item => item.type === data.value)
      const sizeValue = size?.arr_size[0]?.size
      const sizeName = size?.arr_size[0]?.size_name
      const listSize = size?.arr_size?.map(item => ({
        name: item?.size_name || '',
        value: item?.size || '',
      }))
      const category = categories.find(item => item.value === data.value) ?? []
      const listType = pageState?.filter?.type?.list ?? []
      pageDispatch({
        type: printTemplateActions.FILTER,
        payload: {type: {activeValue: data.value, value: data.name, list: listType, listOrigin: listType},
          size: {activeValue: sizeValue, value: sizeName, list: listSize, listOrigin: listSize}},
      })
      pageDispatch({type: printTemplateActions.LIST_KEYWORD, payload: category})
      pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: ''})
      pageDispatch({type: printTemplateActions.OPTION_TYPE_FILTER, payload: ''})
    }

    if(!!pageState.optionSizeFilter) {
      const data = pageState.optionSizeFilter
      pageDispatch({
        type: printTemplateActions.FILTER,
        payload: {type: {activeValue: pageState.filter.type.activeValue, value: pageState.filter.type.value, list: pageState.filter.type.list, listOrigin: pageState.filter.type.listOrigin},
          size: {activeValue: data.value, value: data.name, list: pageState.filter.size.list, listOrigin: pageState.filter.size.listOrigin}},
      })
      pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: ''})
      pageDispatch({type: printTemplateActions.OPTION_SIZE_FILTER, payload: ''})
    }
    pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_CHANGE, payload: false})
    pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE_CHANGE, payload: false})
  }

  const isCkeditorChange = pageState.onCkeditorChange

  const canEdit = () => pageDispatch({type: printTemplateActions.SHOW_EDIT_PRINT})
  const notEdit = () => {
    if(isCkeditorChange) {
      pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM, payload: true})
    } else {
      pageDispatch({type: printTemplateActions.SHOW_EDIT_PRINT})
    }
  }

  const modalConfirm = pageState.modalConfirm
  const modalConfirmTemplate = pageState.modalConfirmTemplate
  const modalConfirmTemplateChange = pageState.modalConfirmTemplateChange

  const closeConfirm = () => pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM, payload: false})
  const openConfirmTemplate = () => pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE, payload: true})
  const closeConfirmTemplate = () => pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE, payload: false})
  const closeConfirmTemplateChange = () => pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE_CHANGE, payload: false})
  const backView = () => {
    pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM, payload: false})
    pageDispatch({type: printTemplateActions.ON_CKEDITOR_CHANGE, payload: false})
    pageDispatch({type: printTemplateActions.SHOW_EDIT_PRINT})
    pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: ''})
  }
  const selectedDefaultTemplate = () => {
    const data = {
      'type' : pageState?.filter?.type?.activeValue,
      'size' : pageState?.filter?.size?.activeValue
    }
    const url = `${config.API}/setting/print/default`
    postData(url, data)
      .then(res => {
        if (res.data.success) {
          pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE, payload: false})
        } else {
          pageDispatch({type: printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE, payload: false})
        }
      })
      .catch(e => {
        UposLogFunc(`ERROR UPDATE TEMPLATE: ${e.message}`)
      })
    const urlGetTemplate = `${config.API}/setting/print/detail?type=${pageState.filter.type.activeValue}&size=${pageState.filter.size.activeValue}`
    setTimeout(() => {
      getData(urlGetTemplate)
        .then(response => {
          if (response.data && response.data.success) {
            pageDispatch({type: printTemplateActions.ON_CKEDITOR_CHANGE, payload: false})
            // pageDispatch({type: printTemplateActions.OLD_VALUE, payload: {oldValue: {id: response?.data?.data?.id, content: response?.data?.data?.content_print}}})
            pageDispatch({type: printTemplateActions.CONTENT.DEFAULT, payload: {template: response?.data?.data?.content_print}})
            pageDispatch({type: printTemplateActions.ADD_ID_TEMPLATE, payload: response?.data?.data?.id})
            pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: response?.data?.data?.content_print})

            let content = response?.data?.data?.content_print
            if(content?.indexOf('/my-assets/image/jnt-logo-png.png') !== -1) {
              content = content?.replace('/my-assets/image/jnt-logo-png.png', '/img/printTemplate/jnt-logo.png');
            }
            if(content?.indexOf('/my-assets/image/tiktok-full.png') !== -1) {
              content = content?.replace('/my-assets/image/tiktok-full.png', '/img/printTemplate/tiktok-full.png');
            }
            // eslint-disable-next-line no-undef
            CKEDITOR?.instances?.editor2?.setData(content) || CKEDITOR?.instances?.editor3?.setData(content) || CKEDITOR?.instances?.editor4?.setData(content) || CKEDITOR?.instances?.editor5?.setData(content) || CKEDITOR?.instances?.editor6?.setData(content) || CKEDITOR?.instances?.editor7?.setData(content)
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR UPDATE TEMPLATE: ${e.message}`)
        })
    }, 500)
  }
  const handleTypeChange = data => {
    const types = pageState.filter.type.list
    const result = types.filter(type => {
      const name = type.name.toLowerCase().replace('đ', 'd')
      return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim())
    })
    setListType(result)
  }
  const handleSizeChange = data => {
    const sizes = pageState.filter.size.list
    const result = sizes.filter(size => {
      const name = size.name.toLowerCase().replace('đ', 'd')
      return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim())
    })
    setListSize(result)
  }
  const handleTypeBlur = data => {
    const types = pageState.filter.type.list
    const result = types.filter(type => {
      const name = type.name.toLowerCase().replace('đ', 'd')
      return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim())
    })
    if(!!result && !!data.value) {
      const category = categories.find((item) => {
        const name = item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('đ', 'd').toLowerCase()
        const key = data.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('đ', 'd').toLowerCase().trim()
        return name.includes(key)
      }) ?? []
      const size = dataTemplate.find(item => item.type === category?.value)
      const sizeValue = size?.arr_size[0]?.size
      const sizeName = size?.arr_size[0]?.size_name
      const listSize = size?.arr_size?.map(item => ({
        name: item?.size_name || '',
        value: item?.size || '',
      }))
      if(category?.length > 0) {
        pageDispatch({
          type: printTemplateActions.FILTER,
          payload: {type: {activeValue: category?.value, value: category?.name, list: pageState.filter.type.list, listOrigin: pageState.filter.type.listOrigin},
            size: {activeValue: sizeValue, value: sizeName, list: listSize, listOrigin: listSize}},
        })
        pageDispatch({type: printTemplateActions.LIST_KEYWORD, payload: category})
      }
    }
  }

  const handleTypeReset = () => {
    pageDispatch({
      type: printTemplateActions.FILTER,
      payload: {type: {activeValue: pageState.filter.type.activeValue, value: '', list: pageState.filter.type.list, listOrigin: pageState.filter.type.listOrigin},
        size: {activeValue: pageState.filter.size.activeValue, value: '', list: pageState.filter.size.list, listOrigin: pageState.filter.size.listOrigin}},
    })
  }

  const handleSizeReset = () => {
    pageDispatch({
      type: printTemplateActions.FILTER,
      payload: {type: {activeValue: pageState.filter.type.activeValue, value: pageState.filter.type.value, list: pageState.filter.type.list, listOrigin: pageState.filter.type.listOrigin},
        size: {activeValue: pageState.filter.size.activeValue, value: '', list: pageState.filter.size.list, listOrigin: pageState.filter.size.listOrigin}},
    })
  }

  return {
    groupType: {
      value: pageState.filter.type.value,
      list: listType,
      onSelected: handleGroupTypeSelected,
      onKeywordChange: handleTypeChange,
      onKeywordBlur: handleTypeBlur,
      onKeywordReset: handleTypeReset,
    },
    groupSize: {
      value: pageState.filter.size.value,
      list: listSize,
      onSelected: handleGroupSizeSelected,
      onKeywordChange: handleSizeChange,
      onKeywordReset: handleSizeReset,
    },
    functions: {
      editPrint,
      canEdit,
      notEdit,
      handlePrint,
      handlePostTemplate,
      onCkeditorChange,
      onCkeditorSelectionChange,
      closeConfirm,
      openConfirmTemplate,
      closeConfirmTemplate,
      backView,
      selectedDefaultTemplate,
      closeConfirmTemplateChange,
      selectedTemplateChange
    },
    isCkeditorChange,
    modalConfirm,
    modalConfirmTemplate,
    modalConfirmTemplateChange,
  }
};

export default usePrintTemplate;