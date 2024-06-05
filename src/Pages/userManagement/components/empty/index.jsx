import React from "react";
import styled from "styled-components";
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import empty from "../../icon/empty.png"
import { EMPTY_USER } from "../../interfaces/detailcontant";
import { Text } from "common/text";
const Index = () => {
    return (
        <StyledUserEmpty>
            <div className={"user-management-empty"}>
                <Tr className='user-management-empty_table'>
                    <Td className='user-management-empty__delivery'>
                        <div className="user-management-empty__content">
                            <img src={empty} />
                            <Text
                                as='p' style={{color: '#7C88A6'}}
                            >{EMPTY_USER.title}</Text>
                        </div>
                    </Td>
                </Tr>
            </div>
        </StyledUserEmpty>

    )
}
export default Index;
const StyledUserEmpty = styled.div`
    .user-management-empty{
        &_table{
            height: 610px;
            text-align: center;
            padding: 0 !important;
        }
        .tr__container{
            width: 100%;
            height: 610px;
            display: block;
            background: #ffffff !important;
        }
        &__delivery{
            margin: 0 auto;
          &:hover{
            background:none;
          }
          
        }
        &__content{
            margin: 0 auto;
            p{
                margin-top: 11px;
            }
        }
    }
`