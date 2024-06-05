import { useConfigContext } from "Component/NavBar/navBar";
import Orders1 from "./order";

const Index = () => {
  const { openMenu } = useConfigContext()
  return (
    <div
      id="content-wrap"
      className={
        openMenu
          ? 'content-wrapper-full order-wrapper order-page-wrapper'
          : 'content-wrapper-mini order-wrapper order-page-wrapper'
      }
    >
      <Orders1 />
    </div>
  )
}
export default Index;
