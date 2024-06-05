import { useState } from "react";
import { useConfigContext } from "../NavBar/navBar";

export default function SlideImage(params) {
    const { openMenu } = useConfigContext();
    const [status1, changeStatus1] = useState(true);
    const [status2, changeStatus2] = useState(false);
    const [status3, changeStatus3] = useState(false);
    const handleChange = (e, id) => {
        clearChecked();
        switch (id) {
            case "img-1":
                changeStatus1(true);
                break;
            case "img-2":
                changeStatus2(true);
                break;
            case "img-3":
                changeStatus3(true);
                break;
            default:
                break;
        }
        
    }
    const clearChecked = () => {
        changeStatus1(false);
        changeStatus3(false);
        changeStatus2(false);
    }
    return  <div className="slide-wrapper">
                <ul className="slides">
                    <input type="radio" name="radio-btn" id="img-1" checked={status1} />
                    <li className="slide-container">
                        <div className="slide">
                            {/* <img src="img/controlpanel/control-panel-slide-1.png" /> */}
                            <img src="img/controlpanel/number1.jpg" />
                        </div>
                        <div className="nav">
                            <label
                                onClick={(e)=>handleChange(e,"img-3")}
                                // htmlFor ="img-3"
                                className="prev"
                            >
                                    &#x2039;
                            </label>
                            <label
                                onClick={(e)=>handleChange(e,"img-2")}
                                className="next"
                            >
                                &#x203a;
                            </label>
                        </div>
                    </li>

                    <input type="radio" name="radio-btn" id="img-2" checked={status2}/>
                    <li className="slide-container">
                        <div className="slide">
                            {/* <img src="img/controlpanel/control-panel-slide-1.png" /> */}
                            <img src="img/controlpanel/number2.jpg" />
                        </div>
                        <div className="nav">
                            <label
                                onClick={(e)=>handleChange(e,"img-1")}
                                // htmlFor ="img-3"
                                className="prev"
                            >
                                    &#x2039;
                            </label>
                            <label
                                onClick={(e)=>handleChange(e,"img-3")}
                                className="next"
                            >
                                &#x203a;
                            </label>
                        </div>
                    </li>

                    <input type="radio" name="radio-btn" id="img-3" checked={status3}/>
                    <li className="slide-container">
                        <div className="slide">
                            <img src="img/controlpanel/control-panel-slide-1.png" />
                        </div>
                        <div className="nav">
                            <label
                                onClick={(e)=>handleChange(e,"img-2")}
                                // htmlFor ="img-3"
                                className="prev"
                            >
                                    &#x2039;
                            </label>
                            <label
                                onClick={(e)=>handleChange(e,"img-1")}
                                className="next"
                            >
                                &#x203a;
                            </label>
                        </div>
                    </li>
                    <li className="nav-dots">
                    <label
                        onClick={(e)=>handleChange(e,"img-1")}
                        className="nav-dot"
                        id="img-dot-1" />
                    <label
                        onClick={(e)=>handleChange(e,"img-2")}
                        className="nav-dot"
                        id="img-dot-2" />
                    <label
                        onClick={(e)=>handleChange(e,"img-3")}
                        className="nav-dot"
                        id="img-dot-3" />
                    </li>
                </ul>
            </div>
}
					
// // STT 	 Họ Tên 	Ngày sinh	Số điện thoại	Email cá nhân	
// // 1	Lê Trung Nghĩa	06/02/1997	0936938148	lenghia060297@gmail.com	
// // 2	Huỳnh Ngô Tấn Đạt	11/02/1997	0965670634	huynhngotandat@gmail.com	
// // 3	Trần Thị Kim Quế	04/03/1987			
// // 4	Võ Văn Vỹ	02/05/1997	0329828038	vovanvy1997@gmail.com	
// // 5	Nguyễn Lê Thanh Thuận	14/07/1990	0793767613	thuannguyen90@gmail.com	
// // 6	Trương Hồng Phong	22/07/1996	0947997840	phongtruong2207@gmail.com	
// // 7	Trần Thị Thuỳ Linh	06/09/1997	0778706997	tranthithuylinh0609@gmail.com	
// // 8	Nguyễn Tuấn Khánh	05/10/1993	0985505925	ryucms@gmail.com	
// // 9	Nguyễn Hoàng Duy	22/11/1997	0386603198	duynguyen.joy@gmail.com	
// // 10	Phạm Phương Uyên	26/11/1997	0907982087	uyenphuongpham2611@gmail.com	
// // 11	Nguyễn Quốc Việt	30/11/1994	0394097881	vietnq301194@gmail.com	
// // 12	Bùi Phương Quỳnh	31/10/1997	0937675825	phuongquynh.alexb@gmail.com	
// // 13	Nguyễn Kao Kỳ	25/07/1990	0326161559	nguyenkaoky.ai1@gmail.com	
// // 14	Lư Bảo Châu	18/11/1993	0798212349	bao.chau332@gmail.com	
					
// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// // import Slide from "react-swipeable-views";
// import Button from "@material-ui/core/Button";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { red, blue, green } from "@material-ui/core/colors";
// import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";

// export default function AutoRotatingCarouselModal({ handleOpen, setHandleOpen, isMobile }) {
//   return (
//     <div>
//       <AutoRotatingCarousel
//         label="Get started"
//         open={handleOpen.open}
//         onClose={() => setHandleOpen({ open: false })}
//         onStart={() => setHandleOpen({ open: false })}
//         autoplay={true}
//         mobile={isMobile}
//         style={{ position: "absolute" }}
//       >
//         <Slide
//           media={
//             <img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />
//           }
//           mediaBackgroundStyle={{ backgroundColor: red[400] }}
//           style={{ backgroundColor: red[600] }}
//           title="This is a very cool feature"
//           subtitle="Just using this will blow your mind."
//         />
//         <Slide
//           media={
//             <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />
//           }
//           mediaBackgroundStyle={{ backgroundColor: blue[400] }}
//           style={{ backgroundColor: blue[600] }}
//           title="Ever wanted to be popular?"
//           subtitle="Well just mix two colors and your are good to go!"
//         />
//         <Slide
//           media={
//             <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />
//           }
//           mediaBackgroundStyle={{ backgroundColor: green[400] }}
//           style={{ backgroundColor: green[600] }}
//           title="May the force be with you"
//           subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
//         />
//       </AutoRotatingCarousel>
//     </div>
//   );
// };