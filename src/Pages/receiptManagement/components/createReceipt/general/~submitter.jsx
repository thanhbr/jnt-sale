import React from 'react';
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {AlternativeAutoComplete} from "./~alternativeAutoComplete";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";
import {Input} from "../../../../../common/form/input";
import {Option} from "../../../../../common/form/select/_option";
import {Tooltip} from "../../../../../common/tooltip";
import StringUtils from "../../../../orderSingle/utils/string";
import {RECEIPT_ICONS} from "../../../interfaces/icon";

const Submitter = () => {
  const {data, methods, validateState} = useCreateReceiptBody()
  const groupSubmitter = data?.groupSubmitter
  const submitter = data?.submitter

  return (
    <>
      {submitter?.type !== 'other' ? (
        <>
          {!!submitter?.value?.name && (
            <a
              href={data?.linkDetail}
              target={'_blank'}
              className={'receipt-create__option-link'}
            >{RECEIPT_ICONS.link_detail}Xem thông tin người nộp</a>
          )}
          <AlternativeAutoComplete
            inputProps={{
              categoryList: [], // menu list in category dropdown
              categoryValue: { name: 'Người nộp', value: '' }, // if not exist this value -> default category: categoryList[0]
              // categoryWidth: 140,
              categoryHidden: true,
              label: (
                <>
                  Người nộp <Text color={THEME_SEMANTICS.failed}>*</Text>
                </>
              ),
              placeholder: 'Chọn người nộp',
              readOnly: true,
              disabled: groupSubmitter?.value?.length === 0,
              value: submitter?.value?.name || '',

            }}
            menuProps={{
              empty: submitter?.list?.length <= 0 ? 'Không tìm thấy tên người nộp' : '',
            }}
            searchInputProps={{
              placeholder: 'Tìm kiếm người nộp',
              // value: '',
              onChange: cate => methods?.handleCustomerKeywordChange(cate?.value || ''),
            }}
            validateText={validateState?.submitter?.message}
            validateType={validateState?.submitter?.status ? 'danger' : 'success'}
            className={`receipt-create__option--${submitter?.type}`}
          >
            {submitter?.list?.length > 0 &&
            submitter?.list?.map(item => {
              return (
                <Option
                  key={item.id}
                  className={"receipt-create__option-text"}
                  data-active={item.id === submitter?.value?.id}
                  onClick={() => methods.handleSubmitterValue(item)}
                  style={{paddingTop: 24, cursor: 'pointer'}}
                >
                  {submitter?.type === 'customer' && (
                    <div className="receipt-create__option-text__avatar">
                      <Text
                        as="b"
                        color="#fff"
                        fontSize={12}
                        lineHeight={17}
                      >
                        {!!item?.name
                          ? StringUtils.getFirstLetters(item.name).substring(0, 2)
                          : '--'}
                      </Text>
                    </div>
                  )}
                  {item?.name?.length < 65
                    ? (<>
                      {submitter?.type === 'customer' ? (
                        <div style={{display: 'block'}}>
                          <p style={{fontSize: 14}}>{item?.name}</p>
                          <Text color={'#7C88A6'}>{item?.mobile}</Text>
                        </div>
                      ) : (<Text>{item?.name}</Text>)}
                    </>)
                    : <Tooltip placement="bottom-start"
                               title={item?.name}
                    >
                      <Text>{item?.name?.substring(0, 65)+' ...'}</Text>
                    </Tooltip>
                  }
                </Option>
              )}
            )}
          </AlternativeAutoComplete>
        </>
      ) : (
        <Input
          placeholder="Nhập tên người nộp"
          label={<>
            Người nộp <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>}
          value={submitter?.other || ''}
          validateText={validateState?.submitter?.message}
          validateType={validateState?.submitter?.status ? 'danger' : 'success'}
          maxLength={51}
          onChange={e => methods.handleSubmitterOther(e.target.value)}
          onBlur={() => methods?.handleBlurFormCreate('submitter')}
        />
      )}
    </>
  )
}

export default Submitter;