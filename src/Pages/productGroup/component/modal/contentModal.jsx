import { Option } from 'common/form/autoComplete/_option';
import { Input } from 'common/form/input';
import { Select } from 'common/form/select';
import { Textarea } from 'common/form/textarea';
import { Text } from 'common/text';
import { THEME_SEMANTICS } from 'common/theme/_semantics';
import { SwitchStatus } from 'Component/SwitchStatus/SwitchStatus';
import { useModal } from 'Pages/productGroup/hook/useModal';
import { MODAL_CONTENT } from 'Pages/productGroup/interface';
import { ProductGroup } from 'Pages/productGroup/provider/_context';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StyledProductGroupContentModal } from './_styled';
import { useProductAction } from "../../provider/_reducer";
import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete';
import { AutoCompleteSingleOption } from 'Component/surveyLogin/templates/autocompleteSingleOption';
import { Tooltip } from 'common/tooltipv2';

const Index = ({ ...props }) => {
    const { pageState, pageDispatch } = useContext(ProductGroup)
    const { onPickup, field_name, field_code, onChangeNote, status_product, search, onBlurNoteProduct } = useModal()
    const disabled = pageState.disabled
    return (
        <StyledProductGroupContentModal>
            <div className={'product-group-content'}>
                <div className='product-group-content_group'>
                    <Input
                        {...props}
                        label={
                            <>
                                Mã nhóm sản phẩm <Text color={THEME_SEMANTICS.failed}>*</Text>
                            </>
                        }
                        maxLength={80}
                        autoComplete={'false'}
                        value={pageState.code_product}
                        placeholder='Nhập mã nhóm sản phẩm'
                        validateText={pageState.valid.filde_code.status ? pageState.valid.filde_code.message : null}
                        validateType={!pageState.valid.filde_code.status ? 'success' : 'danger'}
                        onChange={(e) => field_code.onChangeCodeProduct(e)}
                        onBlur={(e) => field_code.onBlurCodePrduct(e)}
                    />
                </div>
                <div className='product-group-content_group'>
                    <Input
                        {...props}
                        label={
                            <>
                                Tên nhóm sản phẩm <Text color={THEME_SEMANTICS.failed}>*</Text>
                            </>
                        }
                        autoComplete={'false'}
                        maxLength={80}
                        value={pageState.name_product}
                        placeholder='Nhập tên nhóm sản phẩm'
                        validateText={pageState.valid.filde_name.status ? pageState.valid.filde_name.message : null}
                        validateType={!pageState.valid.filde_name.status ? 'success' : 'danger'}
                        onChange={(e) => field_name.onChangeNameProduct(e)}
                        onBlur={(e) => field_name.onBlurNameProduct(e)}
                    />
                </div>
                <div className='product-group-content_group'>
                    <AlternativeAutoComplete
                        {...props}
                        inputProps={{
                            categoryList: [], // menu list in category dropdown
                            categoryValue: { name: '', value: '' }, // if not exist this value -> default category: categoryList[0]
                            // categoryWidth: 140,
                            categoryHidden: true,
                            label: (
                                <>
                                    Nhóm sản phẩm cha
                                </>
                            ),
                            placeholder: 'Chọn nhóm sản phẩm cha',
                            readOnly: true,
                            disabled,
                            value: pageState.item_category.item ? pageState.item_category.item : '',

                        }}
                        menuProps={{
                            empty:
                                pageState.category_list.length <= 0 ? 'Không tìm thấy nhóm sản phẩm' : '',
                        }}
                        searchInputProps={{
                            placeholder: 'Tìm kiếm nhóm sản phẩm',
                            value: pageState.keyword || '',
                            onChange: search.searchkeyWord,
                        }}
                        className={disabled && 'product-group-content_alternative'}
                    >
                        {pageState.category_list && disabled === false &&
                            pageState.category_list.map(item =>{
                                if(pageState.check_parent === item.item){
                                    return(
                                        <AutoCompleteSingleOption
                                            key={item.value}
                                            data-active={item.item === pageState.item_category?.item}
                                            onClick={(e) => e.stopPropagation()}
                                            className={'product-group-content_alternative-option'}
                                        >
                                            <Tooltip className='tooltip_select' title={item.item} baseOn='height' placement='top-center'>
                                                    {item.item}
                                            </Tooltip>
                                        </AutoCompleteSingleOption>
                                    )
                                }else{
                                    return (
                                        <AutoCompleteSingleOption
                                            key={item.value}
                                            data-active={item.item === pageState.item_category?.item}
                                            onClick={() => onPickup(item.item, item.id)}
                                        >
                                            <Tooltip className='tooltip_select' title={item.item} baseOn='height' placement='top-center'>
                                                    {item.item}
                                            </Tooltip>
                                        </AutoCompleteSingleOption>
                                    )
                                }
                            }

                            )}
                    </AlternativeAutoComplete>
                </div>
                <div className='product-group-content_group product-group-content_group-textArea'>
                    <Textarea
                        {...props}
                        label={
                            <>
                                Ghi chú
                            </>
                        }
                        placeholder={'Nhập ghi chú'}
                        value={pageState.note_product}
                        onChange={e => onChangeNote(e.target.value)}
                        validateText={pageState.valid.filde_note.status ? pageState.valid.filde_note.message : null}
                        validateType={!pageState.valid.filde_note.status ? 'success' : 'danger'}
                    />
                </div>

                <div className='product-group-content_switch'>
                    <SwitchStatus status={status_product.status} handleChange={status_product.onChangeStatus} />
                    <Text as='p'>Kích hoạt/Ngưng sử dụng</Text>
                </div>
            </div>

        </StyledProductGroupContentModal>

    )
}
export default Index;