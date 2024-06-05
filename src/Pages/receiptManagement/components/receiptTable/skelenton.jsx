import Skeleton from "@mui/material/Skeleton";
import {Td} from "../../../../layouts/tableLayout/_td";
import {Tr} from "../../../../layouts/tableLayout/_tr";

const SkelentonReceipt = () => {
  const SkelentonRows = Array.from(Array(10).keys())
  return (
    <>
      {SkelentonRows.map((i) =>
        <div className={'giveback-product-skeleton'} key={i}>
          <Tr>
            <Td style={{display: 'block', padding: '6px 0 0 16px', width: 176, height: 66}}>
              <div>
                <Skeleton variant="text" width={98} height={30} />
              </div>
              <div style={{display:'flex'}}>
                <Skeleton variant="rectangular" width={20} height={20} style={{marginRight: 8}}/>
                <Skeleton variant="rectangular" width={64} height={20} />
              </div>
            </Td>
            <Td style={{width: 166, height: 66}}>
              <Skeleton variant="text" width={129} height={30} />
            </Td>
            <Td style={{width: 246, height: 66}}>
              <Skeleton variant="text" width={109} height={30} />
            </Td>
            <Td style={{width: 408, height: 66}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{width: 166, display: 'flex', justifyContent: 'end', height: 66}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{width: 196, height: 66}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{width: 235, height: 66, paddingLeft: 40}}>
              <Skeleton variant="text" width={88} height={30} />
            </Td>
            <Td style={{height: 66}}>
              <Skeleton variant="rectangular" width={20} height={20} />
            </Td>
          </Tr>
        </div>)}
    </>
  )
}

export default SkelentonReceipt;