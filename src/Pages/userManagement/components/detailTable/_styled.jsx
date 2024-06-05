import styled from "styled-components";

export const StyledUserDetailRow = styled.div`
    .user-managment-detai_row{
        .content-detail {
            margin-top: 0.25rem;
            background: #f3f6fc;
        
            .header-tabs {
                background: #f3f6fc;
                // padding-top: 0.25rem;
            }
        
            .MuiTabPanel-root {
                padding: 1.5rem 2.25rem 2rem;
                border-radius: 0.5rem;
            }
        
            .bd-green {
                border-left: 4px solid #1E9A98;
                margin-top: 0.25rem;
                margin-bottom: 0.25rem;
                border-radius: 0px 8px 8px 8px;
                background: #ffffff;
            }
        
            .tab-detail {
        
                width: 100%;
                max-width: 183px;
                min-height: 36px !important;
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                color: #00081D;
            }
        
            .tab-detail-time {
                width: 100%;
                max-width: 167px;
                min-height: 36px !important;
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                color: #00081D;
        
                text-transform: inherit !important;
                background: #e2eaf8 !important;
                border-radius: 8px 8px 0 0 !important;
                margin-right: 4px !important;
            }
        
            .tab-detail-time.Mui-selected {
                background: #ffffff !important;
            }
        
            .MuiTabs-root {
                min-height: 36px;
            }
        
            .Mui-selected {
                // font-weight: 600;
                color: #00081D;
            }
        
            .MuiTab-textColorInherit {
                opacity: 1;
            }
        
            .dc-tab-flex {
                // display: flex;
            }
        
            .dc-tab-title {
                font-weight: 600;
                font-size: 16px;
                line-height: 200%;
                color: #00081D;
                ;
            }
        
            .dc-tab-title-child {
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                color: #7C88A6;
            }
        
            .info-label {
                max-width: 510px;
                line-height: 100%;
                color: #7C88A6;
        
                div {
                    max-width: 470px;
                    height: 28px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
            }
        
            .info-content {
                font-weight: 400;
                font-size: 14px;
                line-height: 200%;
                color: #00081D;
            }
        
            .title {
                margin-top: 0.75rem;
            }
        
            .title-address {
                font-weight: 600;
                font-size: 16px;
                line-height: 140%;
                color: #00081D;
        
                margin: 1.5rem 0 0.75rem;
            }
        
            .table-address-customer {
                width: 100%;
        
                .info-address {
                    display: block;
                    height: auto;
                    border: 1px solid #E2EAF8;
        
                    .MuiTableCell-root {
                        border-bottom: unset;
                        z-index: 0;
                    }
                }
        
                .MuiTableCell-root {
                    border: unset;
                    padding: 0.75rem 1.75rem;
                }
        
                .table-header {
                    display: block;
                    background: #F7F9FD;
                    border-width: 1px 1px 0px 1px;
                    border-style: solid;
                    border-color: #E2EAF8;
                    border-radius: 8px 8px 0px 0px;
                    z-index: 0;
                }
        
                .details-street {
                    width: 850px;
                }
        
                .details-ward {
                    width: 250px;
                }
        
                .details-district {
                    width: 250px;
                }
        
                .details-city {
                    width: 250px;
                }
            }
        
            .keyword-filter {
                display: flex;
                align-items: center;
                justify-content: flex-start;
        
                width: 100%;
        
                background: #FFFFFF;
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
        
                margin-bottom: 1rem;
        
                input {
                    padding: 0.4rem 2.8rem 0.4rem 0.7rem;
                    border: 1px solid #EBEEF5;
                    border-radius: 6px;
                }
        
                .filter__action-btn {
                    margin-left: 0.75rem;
                }
        
                .input-search {
                    width: 100%;
                    max-width: 392px;
        
                    margin-right: 1rem;
                    position: relative;
        
                    svg {
                        position: absolute;
                        right: 0.875rem;
                        top: .45rem;
                    }
        
                    input {
                        width: 100%;
                        height: 32px;
        
                        &:hover {
                            border-color: #2BB8A9;
                        }
        
                        &:focus {
                            border-color: #2BB8A9;
                        }
                    }
                }
        
                .input-date-calendar {
                    width: 100%;
                    max-width: 392px;
        
                    margin-right: 1rem;
                    position: relative;
        
                    svg {
                        position: absolute;
                        right: 0.2rem;
                        top: -0.1rem;
        
                        @media (max-width: 1440px) {
                            right: 0.1rem;
                            top: 0.1rem;
                        }
                    }
                }
        
                .input-status {
                    width: 100%;
                    max-width: 392px;
        
                    position: relative;
        
                    .category-input__menu-toggle {
                        width: 145px !important;
                    }
                }
        
                .input-group {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
        
                    .input-reset {
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 140%;
                        color: #1E9A98;
        
                        margin-right: 1.25rem;
                        cursor: pointer;
                    }
        
                    .input-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
        
                        width: 85px;
                        height: 32px;
        
                        background: #1E9A98;
                        border-radius: 6px;
        
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 140%;
                        color: #FFFFFF;
        
                        cursor: pointer;
        
                        &:hover {
                            background: rgba(30, 154, 152, 0.8);
                        }
                    }
                }
        
        
            }
        
            .purchase_history {
        
                .customer-status {
                    input {
                        // pointer-events: none;
                    }
                }
        
                .placeholder-black {
                    input {
                        &::placeholder {
                            color: #00081D;
                        }
                    }
                }
        
                .table {
                    max-height: 348px;
                    overflow-y: auto;
        
                    background: #F7F9FD;
                    border-width: 1px 1px 0px 1px;
                    border-style: solid;
                    border-color: #E2EAF8;
                    border-radius: 8px 8px 0px 0px;
        
                    .table_purchase_history {
                        height: 44px;
                    }
        
                    td {
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 140%;
                        color: #00081D;
                    }
        
                    .table_id {
                        width: 300px;
                    }
        
                    .table_bill {
                        width: 360px;
                    }
        
                    .table_date {
                        width: 360px;
                    }
        
                    .table_price {
                        width: 260px;
                    }
        
                    .table_status {
                        width: 344px;
                    }
        
                    .table_content {
                        height: 56px;
                        background: #FFFFFF;
                        border: 1px solid #E2EAF8;
                        border-left: none;
                        border-right: none;
        
                        .table_id {
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 140%;
                            color: #1A94FF;
                            cursor: pointer;
        
                            a {
                                color: #1A94FF;
                            }
                        }
        
                        .table_bill {
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 140%;
                            color: #1A94FF;
                            cursor: pointer;
                        }
        
                        .table_date {
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 140%;
                            color: #00081D;
                        }
        
                        .table_price {
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 140%;
                            color: #00081D;
                        }
                    }
                }
        
                .no-image-data {
                    margin: 3rem 0 5.5rem;
        
                    .img {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
        
                    .text {
                        display: flex;
                        align-items: center;
                        justify-content: center;
        
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 140%;
                        text-align: center;
                        color: #7C88A6;
                    }
                }
        
                $bgGreen: #00AB56;
        
                .colorStatusGray {
                    width: 76px;
                    color: '#7C88A6';
                    background-color: #EFF3FB;
                    border-radius: 4px;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
                    color: #7C88A6;
        
                    margin: 0 auto;
                }
        
                .colorStatusOrange {
                    width: 115px;
                    color: #FC820A;
                    background-color: #FFF5EB;
                    border-radius: 4px;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
        
                    margin: 0 auto;
                }
        
                .colorStatusOranges {
                    width: 115px;
                    color: #FC820A;
                    background-color: #FFF5EB;
                    border-radius: 4px;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
        
                    margin: 0 auto;
                }
        
                .colorStatusBlue {
                    width: 121px;
                    color: #1A94FF;
                    background-color: #EBF5FF;
                    border-radius: 4px;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
        
                    margin: 0 auto;
                }
        
                .colorStatusRed {
                    width: 100px;
                    color: #FF424E;
                    background-color: #FFEBEC;
                    border-radius: 4px;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
        
                    margin: 0 auto;
                }
        
                .colorStatusGreen {
                    width: 142px;
                    color: $bgGreen;
                    background-color: #EBFFF5;
                    border-radius: 4px;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
        
                    margin: 0 auto;
                }
        
                .colorStatusReds {
                    width: 101px;
                    border-radius: 4px;
                    background: #FFEBEB;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
                    color: #FF7471;
        
                    margin: 0 auto;
                }
        
                .colorStatusGreens {
                    width: 142px;
                    color: #33CC70;
                    background: #EFFBF4;
                    border-radius: 4px;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
        
                    margin: 0 auto;
                }
        
                .colorStatusRedd {
                    width: 46px;
                    border-radius: 4px;
                    background: #FCEEEF;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
                    color: #D93843;
        
                    margin: 0 auto;
                }
        
                .colorStatusBlues {
                    width: 117px;
                    border-radius: 4px;
                    background: #EBF8FE;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
                    color: #1BACF9;
        
                    margin: 0 auto;
                }
        
                .colorStatusDarkGreen {
                    width: 85px;
                    border-radius: 4px;
                    background: #EBFFF4;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
                    color: #007D3A;
        
                    margin: 0 auto;
                }
        
                .colorStatusDarkGreens {
                    width: 160px;
                    border-radius: 4px;
                    background: #EBFFF9;
                    padding: 0.1875rem 0.75rem;
        
                    font-family: 'SF Pro Display';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 150%;
                    color: #007B56;
        
                    margin: 0 auto;
                }
            }
        }
    }
`