import Skeleton from "@mui/material/Skeleton";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Tr} from "../../../../layouts/tableLayout/_tr";

const SkelentonPayment = () => {
    const SkelentonRows = Array.from(Array(10).keys())
    return (
        <>
            {SkelentonRows.map((i) =>
                <div className={'giveback-product-skeleton'} key={i}>
                    <Tr>
                        <Td style={{display: 'block', paddingLeft: 16, width: 176}}>
                            <div>
                                <Skeleton variant="text" width={98} height={30} />
                            </div>
                            <div style={{display:'flex'}}>
                                <Skeleton variant="rectangular" width={20} height={20} style={{marginRight: 8}}/>
                                <Skeleton variant="rectangular" width={64} height={20} />
                            </div>
                        </Td>
                        <Td style={{width: 166}}>
                            <Skeleton variant="text" width={129} height={30} />
                        </Td>
                        <Td style={{width: 246}}>
                            <Skeleton variant="text" width={109} height={30} />
                        </Td>
                        <Td style={{width: 408}}>
                            <Skeleton variant="text" width={88} height={30} />
                        </Td>
                        <Td style={{width: 166, display: 'flex', justifyContent: 'end'}}>
                            <Skeleton variant="text" width={88} height={30} />
                        </Td>
                        <Td style={{width: 196}}>
                            <Skeleton variant="text" width={88} height={30} />
                        </Td>
                        <Td style={{width: 235}}>
                            <Skeleton variant="text" width={88} height={30} />
                        </Td>
                        <Td>
                            <Skeleton variant="rectangular" width={20} height={20} />
                        </Td>
                    </Tr>
                </div>)}
        </>
    )
}

export default SkelentonPayment;