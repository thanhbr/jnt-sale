import React, {useEffect} from 'react';
import {GridLayout} from "../../../layouts/gridLayout";
import {PageHeader} from "../../../layouts/pageHeader";
import {CREATE_PRODUCT_CONSTANTS, EDIT_PRODUCT_CONSTANTS} from "../interfaces/~constants";
import styled from "styled-components";
import InfoInventory from "./conponents/infoInventory/index";
import ActionFormBrnList from "./conponents/actionFormBrnList";
import InfoBasic from "./conponents/infoBasic/index";
import InfoProduct from "./conponents/infoProduct/index";
import InfoPrice from "./conponents/infoPrice/index";
import InfoVersion from "./conponents/infoVersion/index";
import InfoScroll from "./conponents/infoScroll/index";
import {ProductProvider} from "../provider";
import useProduct from "../hooks/useProduct";
import {useLocation} from "react-router-dom";
import {
  SkeletonProductBasic, SkeletonProductExtraInfo,
  SkeletonProductInfo,
  SkeletonProductVersion
} from "./conponents/skelenton";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const CreateProduct = ({...props}) => {
  const { t } = useTranslation()
  const {fetch, provider} = useProduct()
  const {state, dispatch} = provider
  const location = useLocation()?.pathname?.split('/')

  useEffect(() => {
    fetch.origin()
  }, [])

  return (
    <ProductProvider value={{pageState: state, pageDispatch: dispatch}}>
      <StyledCreateProduct>
        {(location[2] === 'edit' && state?.formCreate?.statusForm !== 'editMultipleVersion' && state?.formCreate?.statusForm !== 'editSingleVersion') ? (
            <GridLayout
              {...props}
              header={
                <PageHeader
                  breadcrumbLinks={EDIT_PRODUCT_CONSTANTS?.header?.breadcrumb}
                  breadcrumbTitle={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EDIT_PRODUCT)}
                />
              }
              grid={[
                {
                  width: 70,
                  sections: [
                    {
                      title: '',
                      props: {
                        style: {
                          position: 'relative',
                          padding: '24px',
                          // maxHeight: '453px'
                        },
                        children: <SkeletonProductBasic />,
                      },
                    },
                    {
                      title: '',
                      props: {
                        style: {
                          position: 'relative',
                          padding: '24px'
                        },
                        children: <SkeletonProductInfo />,
                      },
                    },
                    {
                      title: '',
                      props: {
                        style: {position: 'relative', marginBottom: 0, padding: '24px'},
                        children: <SkeletonProductVersion />,
                      },
                    },
                  ],
                  props: {style: {position: 'relative'}},
                },
                {
                  width: 30,
                  sections: [
                    {
                      title: '',
                      props: {
                        style: {
                          padding: '24px',
                        },
                        children: <SkeletonProductExtraInfo />,
                      },
                    },
                  ],
                },
              ]}
              data-model="container"
            />
        ) : null}

        {state?.formCreate?.statusForm === 'editMultipleVersion' ? (
          <GridLayout
            {...props}
            header={
              <PageHeader
                breadcrumbLinks={EDIT_PRODUCT_CONSTANTS?.header?.breadcrumb}
                breadcrumbTitle={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EDIT_PRODUCT)}
              />
            }
            grid={[
              {
                width: 70,
                sections: [
                  {
                    title: (<>
                      <span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.BASIC_INFO)}</span>
                    </>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoBasic />,
                    },
                  },
                  {
                    title: (<><span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SPECIFICATIONS)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoProduct />,
                    },
                  },
                  {
                    title: (<><span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_INFO)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoVersion />,
                    },
                  },
                  {
                    type: 'sticky-bottom-transparent',
                    props: {
                      style: {
                        position: 'sticky',
                        bottom: -44,
                        marginBottom: 0,
                        zIndex: 999,
                        padding: "12px 24px 0 12px"
                      },
                      children: <ActionFormBrnList />,
                    },
                  },
                ],
                props: {style: {position: 'relative'}},
              },
              {
                width: 30,
                sections: [{
                  title: '',
                  props: {
                    children: <InfoScroll />,
                    style: {
                      padding: '30px 24px 32px 24px',
                    },
                  },
                },],
                props: {
                  style: {
                    position: 'sticky',
                    top: 39,
                  },
                }
              },
            ]}
            data-model="container"
          />
        ) : null}

        {state?.formCreate?.statusForm === 'editSingleVersion' ? (
          <GridLayout
            {...props}
            header={
              <PageHeader
                breadcrumbLinks={EDIT_PRODUCT_CONSTANTS?.header?.breadcrumb}
                breadcrumbTitle={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.EDIT_PRODUCT)}
              />
            }
            grid={[
              {
                width: 70,
                sections: [
                  {
                    title: (<>
                      <span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.BASIC_INFO)}</span>
                    </>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoBasic />,
                    },
                  },
                  {
                    title: (<><span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SPECIFICATIONS)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoProduct />,
                    },
                  },
                  {
                    title: (<div style={{display: 'flex', justifyContent: 'space-between', width: '56rem'}}>
                      <span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_AND_INVENTORY_INFO)}</span>
                      <span style={{fontWeight: 400, fontSize: 14, color: '#1E9A98'}}>{t(DISPLAY_NAME_MENU.GENERAL.INVENTORY)}: {state?.formCreate?.inventory?.init}</span>
                    </div>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoPrice />,
                    },
                  },
                  {
                    title: (<><span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_INFO)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoVersion />,
                    },
                  },
                  {
                    type: 'sticky-bottom-transparent',
                    props: {
                      style: {
                        position: 'sticky',
                        bottom: -44,
                        marginBottom: 0,
                        zIndex: 999,
                        padding: "12px 24px 0 12px"
                      },
                      children: <ActionFormBrnList />,
                    },
                  },
                ],
                props: {style: {position: 'relative'}},
              },
              {
                width: 30,
                sections: [{
                  title: '',
                  props: {
                    children: <InfoScroll />,
                    style: {
                      padding: '30px 24px 32px 24px',
                    },
                  },
                },],
                props: {
                  style: {
                    position: 'sticky',
                    top: 39,
                  },
                }
              },
            ]}
            data-model="container"
          />
        ) : null}

        {(state?.formCreate?.statusForm === 'create' && location[2] !== 'edit') ? (
          <GridLayout
            {...props}
            header={
              <PageHeader
                breadcrumbLinks={CREATE_PRODUCT_CONSTANTS.header.breadcrumb}
                breadcrumbTitle={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.CREATE_PRODUCT)}
              />
            }
            grid={[
              {
                width: 70,
                sections: [
                  {
                    title: (<>
                      <span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.BASIC_INFO)}</span>
                    </>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoBasic />,
                    },
                  },
                  {
                    title: (<><span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRODUCT_SPECIFICATIONS)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoProduct />,
                    },
                  },
                  {
                    title: (<><span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.WAREHOUSE_INFO)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoInventory />,
                    },
                  },
                  {
                    title: (<><span>{state?.formCreate?.statusForm === 'editSingleVersion' ? t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_AND_INVENTORY_INFO) : t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PRICE_INFO)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoPrice />,
                    },
                  },
                  {
                    title: (<><span>{t(DISPLAY_NAME_MENU.PRODUCT_PAGE.VERSION_INFO)}</span></>),
                    props: {
                      style: {
                        position: 'relative',
                        padding: 24
                      },
                      children: <InfoVersion />,
                    },
                  },
                  {
                    type: 'sticky-bottom-transparent',
                    props: {
                      style: {
                        position: 'sticky',
                        bottom: -44,
                        marginBottom: 0,
                        zIndex: 999,
                        padding: "12px 24px 0 12px"
                      },
                      children: <ActionFormBrnList />,
                    },
                  },
                ],
                props: {style: {position: 'relative'}},
              },
              {
                width: 30,
                sections: [{
                  title: '',
                  props: {
                    children: <InfoScroll />,
                    style: {
                      padding: '30px 24px 32px 24px',
                    },
                  },
                },],
                props: {
                  style: {
                    position: 'sticky',
                    top: 39,
                  },
                }
              },
            ]}
            data-model="container"
          />
        ) : null}
    </StyledCreateProduct>
    </ProductProvider>
  );
};

export default CreateProduct;

export const StyledCreateProduct = styled.div`
  .grid-layout {
    &__header {
      & .breadcrumb__title h1 {
        line-height: 140% !important;
        min-width: 13.1875rem !important;
        height: 2.125rem !important;
      }
    }
  }
`