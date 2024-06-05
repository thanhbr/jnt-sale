import {useNavigate, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {useEffect} from 'react'
import useGlobalContext from '../../containerContext/storeContext'
import {Button} from 'common/button'

export const EvoPolicy = () => {
  const {page} = useParams()
  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const navigate = useNavigate()
  const nav = useNavigate()
  useEffect(() => {
    if (
      page != 'chinh-sach-bao-mat-thong-tin' &&
      page != 'chinh-sach-va-quy-dinh-chung'
    )
      nav('/')
  }, [])
  return (
    <Styled>
      {!GlobalState?.user?.user_id && (
        <div className="policy-page__header">
          <div className="policy-page__header-left">
            <svg
              width="140"
              height="34"
              viewBox="0 0 140 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.0599 23.0834C42.0292 22.568 41.3076 21.7434 40.6891 20.7126C40.1737 19.6818 39.8645 18.5479 39.8645 17.311C39.8645 16.0741 40.1737 15.0433 40.6891 13.9094C41.2045 12.8786 42.0292 12.054 43.0599 11.4355C44.0907 10.817 45.1215 10.5078 46.3585 10.5078C47.6985 10.5078 48.7293 10.817 49.76 11.3324C50.7908 11.8478 51.4093 12.6725 51.9247 13.6002C52.4401 14.5279 52.6462 15.6617 52.6462 16.8987C52.6462 17.311 52.6462 17.6202 52.5432 18.0326H43.0599C43.2661 18.9603 43.5753 19.7849 44.2969 20.3003C44.9154 20.8157 45.6369 21.1249 46.5646 21.1249C47.2862 21.1249 47.9046 20.9188 48.5231 20.6095C49.0385 20.3003 49.4508 19.888 49.76 19.2695L52.4401 20.5064C51.2031 22.7742 49.2447 23.908 46.5646 23.908C45.2246 24.0111 44.0907 23.7019 43.0599 23.0834ZM49.4508 15.7648C49.4508 15.3525 49.2447 14.9402 49.0385 14.631C48.7293 14.2186 48.42 13.9094 48.0077 13.7032C47.5954 13.394 46.9769 13.2909 46.4615 13.2909C45.6369 13.2909 45.0184 13.4971 44.503 14.0125C43.9876 14.5279 43.5753 15.0433 43.2661 15.8679H49.4508V15.7648Z"
                fill="#0B101A"
              />
              <path
                d="M54.1016 10.6816H57.8117L61.0065 18.9411H61.2126L64.4075 10.6816H68.0146L62.5524 23.2773H59.3576L54.1016 10.6816Z"
                fill="#0B101A"
              />
              <path
                d="M75.4349 23.6902C74.0952 23.6902 72.9615 23.3805 71.9309 22.8643C70.9003 22.348 70.0759 21.4188 69.5606 20.3864C69.0453 19.354 68.7361 18.2183 68.7361 16.9794C68.7361 15.6372 69.0453 14.5015 69.5606 13.5723C70.1789 12.5399 71.0034 11.714 71.9309 11.1977C72.9615 10.5783 74.0952 10.2686 75.4349 10.2686C76.7747 10.2686 77.9084 10.5783 78.9389 11.1977C79.9695 11.8172 80.691 12.5399 81.3093 13.5723C81.8246 14.6048 82.1338 15.7405 82.1338 16.9794C82.1338 18.3215 81.8246 19.4572 81.3093 20.3864C80.691 21.4188 79.9695 22.2448 78.9389 22.761C77.9084 23.2772 76.6716 23.6902 75.4349 23.6902ZM77.1869 20.2832C77.7022 19.9734 78.1145 19.5605 78.4237 19.0442C78.7328 18.528 78.9389 17.8053 78.9389 17.0826C78.9389 16.3599 78.7328 15.6372 78.4237 15.121C78.1145 14.5015 77.7022 14.0886 77.1869 13.8821C76.6716 13.5723 76.0533 13.4691 75.4349 13.4691C74.8166 13.4691 74.3013 13.5723 73.6829 13.8821C73.1676 14.1918 72.7554 14.6048 72.4462 15.121C72.137 15.6372 71.9309 16.3599 71.9309 17.0826C71.9309 17.8053 72.137 18.4248 72.4462 19.0442C72.7554 19.6637 73.1676 20.0767 73.6829 20.3864C74.1982 20.6961 74.8166 20.7994 75.4349 20.7994C76.0533 20.6961 76.5686 20.5929 77.1869 20.2832Z"
                fill="#0B101A"
              />
              <path
                d="M85.5347 22.7617C84.6071 22.1423 83.9888 21.3163 83.5765 20.2839L86.4622 19.045C86.7714 19.6644 87.0806 20.0774 87.5958 20.3871C88.1111 20.6968 88.6264 20.8001 89.2448 20.8001C89.8632 20.8001 90.3784 20.6968 90.7907 20.4904C91.2029 20.2839 91.409 19.9741 91.409 19.5612C91.409 19.1482 91.2029 18.8385 90.8937 18.632C90.5846 18.4255 90.0693 18.219 89.2448 18.1158L87.802 17.806C86.7714 17.5995 85.9469 17.0833 85.2255 16.4639C84.5041 15.8444 84.1949 15.0185 84.1949 13.986C84.1949 13.2633 84.401 12.6439 84.8132 12.0244C85.2255 11.5082 85.8438 10.992 86.5653 10.6822C87.2867 10.3725 88.2142 10.166 89.0387 10.166C91.6152 10.166 93.3672 11.0952 94.2947 12.9536L91.5121 14.1925C90.9968 13.2633 90.2754 12.8503 89.1417 12.8503C88.6264 12.8503 88.1111 12.9536 87.802 13.1601C87.4928 13.3666 87.2867 13.6763 87.2867 13.986C87.2867 14.6055 87.802 15.0185 88.9356 15.3282L90.7907 15.7412C92.0274 16.0509 92.9549 16.5671 93.5733 17.1866C94.1916 17.806 94.5008 18.632 94.5008 19.5612C94.5008 20.3871 94.2947 21.1098 93.7794 21.7293C93.3672 22.3487 92.6458 22.865 91.8213 23.1747C90.9968 23.4844 90.0693 23.6909 89.1417 23.6909C87.6989 23.6909 86.4622 23.3812 85.5347 22.7617Z"
                fill="#0B101A"
              />
              <path
                d="M96.9738 5.62305H100.169V10.0625L99.9625 12.2306H100.169C100.478 11.6112 101.096 11.1982 101.714 10.7852C102.436 10.3722 103.157 10.269 103.982 10.269C105.528 10.269 106.661 10.682 107.486 11.6112C108.31 12.5404 108.723 13.7793 108.723 15.4312V23.2777H105.528V15.8441C105.528 15.0182 105.322 14.3987 104.909 13.9858C104.497 13.5728 103.879 13.2631 103.157 13.2631C102.333 13.2631 101.611 13.5728 100.993 14.2955C100.375 15.0182 100.169 15.8441 100.169 16.8766V23.2777H96.9738V5.62305Z"
                fill="#0B101A"
              />
              <path
                d="M117.895 23.6902C116.555 23.6902 115.422 23.3805 114.391 22.8643C113.36 22.348 112.536 21.4188 112.021 20.3864C111.505 19.354 111.196 18.2183 111.196 16.9794C111.196 15.6372 111.505 14.5015 112.021 13.5723C112.639 12.5399 113.463 11.714 114.391 11.1977C115.422 10.5783 116.555 10.2686 117.895 10.2686C119.235 10.2686 120.368 10.5783 121.399 11.1977C122.43 11.8172 123.151 12.5399 123.769 13.5723C124.285 14.6048 124.594 15.7405 124.594 16.9794C124.594 18.3215 124.285 19.4572 123.769 20.3864C123.151 21.4188 122.43 22.2448 121.399 22.761C120.368 23.2772 119.132 23.6902 117.895 23.6902ZM119.544 20.2832C120.059 19.9734 120.471 19.5605 120.781 19.0442C121.09 18.528 121.296 17.8053 121.296 17.0826C121.296 16.3599 121.09 15.6372 120.781 15.121C120.471 14.5015 120.059 14.0886 119.544 13.8821C119.029 13.5723 118.41 13.4691 117.792 13.4691C117.174 13.4691 116.658 13.5723 116.04 13.8821C115.525 14.1918 115.112 14.6048 114.803 15.121C114.494 15.6372 114.288 16.3599 114.288 17.0826C114.288 17.8053 114.494 18.4248 114.803 19.0442C115.112 19.6637 115.525 20.0767 116.04 20.3864C116.555 20.6961 117.174 20.7994 117.792 20.7994C118.513 20.6961 119.029 20.5929 119.544 20.2832Z"
                fill="#0B101A"
              />
              <path
                d="M126.758 10.6818H129.85V12.2305H130.056C130.365 11.7142 130.881 11.198 131.602 10.8883C132.324 10.5786 133.045 10.3721 133.87 10.3721C135.003 10.3721 136.034 10.6818 136.961 11.198C137.889 11.7142 138.61 12.5402 139.126 13.5726C139.641 14.6051 139.95 15.7407 139.95 17.0829C139.95 18.4251 139.641 19.5607 139.126 20.5932C138.61 21.6256 137.889 22.4516 136.961 22.9678C136.034 23.484 135.003 23.7937 133.87 23.7937C133.045 23.7937 132.221 23.5872 131.602 23.2775C130.984 22.9678 130.469 22.4516 130.056 21.9353H129.85L130.056 23.6905V28.6462H126.758V10.6818ZM134.9 20.2834C135.415 19.9737 135.828 19.5607 136.137 18.9413C136.446 18.3218 136.549 17.7024 136.549 16.9797C136.549 16.2569 136.446 15.6375 136.137 15.018C135.828 14.3986 135.415 13.9856 134.9 13.6759C134.385 13.3661 133.87 13.2629 133.251 13.2629C132.633 13.2629 132.118 13.3661 131.602 13.6759C131.087 13.9856 130.675 14.3986 130.365 15.018C130.056 15.6375 129.85 16.2569 129.85 16.9797C129.85 17.7024 130.056 18.3218 130.365 18.9413C130.675 19.5607 131.087 19.9737 131.602 20.2834C132.118 20.5932 132.633 20.6964 133.251 20.6964C133.87 20.6964 134.385 20.5932 134.9 20.2834Z"
                fill="#0B101A"
              />
              <path
                d="M28.7841 0.55177L4.46213 9.63719C3.0193 10.1534 2.91624 12.115 4.25601 12.8377L12.5008 16.9675L14.3558 15.1091C14.3558 15.1091 14.8711 14.5929 14.8711 13.4572C14.8711 12.3215 14.7681 10.1534 16.7262 8.39827C18.6843 6.64313 21.8791 6.64313 24.2495 8.60476C26.2076 10.8761 26.2076 14.0767 24.4556 16.1415C22.7036 18.2064 20.5394 18.1031 19.4057 17.9999C18.169 17.9999 17.7568 18.5161 17.7568 18.5161L16.0048 20.0648L20.8486 28.9437C21.57 30.2859 23.5281 30.0794 24.0434 28.634L31.7728 3.33934C32.2881 1.5842 30.5361 -0.0676903 28.7841 0.55177Z"
                fill="#E5101D"
              />
              <path
                d="M15.5939 19.5484L14.2542 18.4128L13.0175 17.1738C13.0175 17.1738 12.296 16.3479 11.6777 17.4836C11.2655 18.2063 11.2655 19.0322 11.5746 19.7549C11.5746 19.7549 12.0899 20.9938 13.4297 21.3036C14.0481 21.5101 14.8725 21.4068 15.4909 20.8906C16.5215 20.2711 15.5939 19.5484 15.5939 19.5484Z"
                fill="#E5101D"
              />
              <path
                d="M0.754306 33.4859C0.342069 33.7956 -0.276289 33.2794 0.135948 32.8664L9.20516 22.9551C9.72046 22.3356 10.648 22.4389 11.2663 22.9551C11.7816 23.5745 11.6786 24.4005 11.0602 24.9167L0.754306 33.4859Z"
                fill="#E5101D"
              />
              <path
                d="M0.753562 24.8147C0.341325 25.1245 -0.173973 24.6082 0.135204 24.1953L4.87593 18.6201C5.39123 18.0007 6.31876 18.1039 6.93712 18.6201C7.45241 19.2396 7.34935 20.0655 6.731 20.5817L0.753562 24.8147Z"
                fill="#E5101D"
              />
              <path
                d="M8.89516 33.0735C8.48292 33.3832 7.96763 32.867 8.27681 32.454L13.0175 26.8789C13.5328 26.2594 14.4604 26.3627 15.0787 26.8789C15.594 27.4984 15.491 28.3243 14.8726 28.8405L8.89516 33.0735Z"
                fill="#E5101D"
              />
            </svg>
            | {page == 'chinh-sach-va-quy-dinh-chung' ? 'Chính sách và quy định chung' : 'Chính sách bảo mật thông tin'}
          </div>
          <Button appearance="primary" size="sm" style={{borderRadius: '4px'}} onClick={() => navigate(`/login`)}>
            Đăng nhập vào evoshop
          </Button>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginLeft: '-30px',
          width: 'calc(100% + 60px)',
          height: '100%',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '24px 124px',
            width: 'calc(100% + 60px)',
            height: '100%',
          }}
        >
          {page == 'chinh-sach-bao-mat-thong-tin' && (
            <div className="container news_static pb-5">
              <h1 className="text-uppercase py-5 jnt-color text-center">
                Chính sách bảo mật thông tin
              </h1>
              <div className="text-left">
                <p>
                  Bảo vệ thông tin cá nhân của Người dùng evoshop là trách nhiệm
                  rất quan trọng đối với chúng tôi. evoshop biết rằng sự riêng
                  tư và bảo mật thông tin cá nhân rất quan trọng đối với người
                  dùng, vì vậy evoshop cam kết nỗ lực tối đa bảo vệ sự riêng tư
                  của Người dùng evoshop. Chính sách bảo mật này công bố cách
                  thức mà Công ty TNHH Evo Việt Nam (Sau đây gọi tắt là
                  “evoshop” hoặc “Chúng tôi”) thu thập, lưu trữ và xử lý thông
                  tin hoặc dữ liệu cá nhân (“Thông tin cá nhân”) khi Người dùng
                  evoshop sử dụng dịch vụ của evoshop. Xin vui lòng đọc chính
                  sách bảo mật trước khi sử dụng website evoshop, các tính năng,
                  phần mềm của evoshop hoặc gửi bất kỳ thông tin cá nhân nào.
                </p>
                <p>
                  Người dùng evoshop đồng ý sử dụng dịch vụ, tính năng, phần mềm
                  của Công ty TNHH Evo Việt Nam có nghĩa là Người dùng evoshop
                  hoàn toàn đồng ý với các nội dung trong Chính sách bảo mật
                  này. Công ty TNHH Evo Việt Nam có thể sửa đổi nội dung của
                  chính sách bằng cách đăng một bản sửa đổi lên hệ thống website
                  của Công ty TNHH Evo Việt Nam, phiên bản sửa đổi có hiệu lực
                  kể từ thời điểm đăng tải. Nếu Người dùng evoshop tiếp tục sử
                  dụng Dịch vụ có nghĩa là Người dùng evoshop chấp nhận và chắc
                  chắn đồng ý tuân theo Điều khoản sử dụng mới nhất được cập
                  nhật.
                </p>
                <p>
                  Chính sách của chúng tôi là giữ kín thông tin cá nhân nhận
                  được từ trang web hoàn toàn bí mật và chỉ dùng cho mục đích
                  nội bộ. Chúng tôi sẽ không chia sẻ thông tin cá nhân của Người
                  dùng evoshop với bất kỳ bên nào khác. Hãy yên tâm rằng chúng
                  tôi tôn trọng sự riêng tư của Người dùng evoshop và xử lý dữ
                  liệu cá nhân của Người dùng với sự cẩn trọng tối đa.
                </p>
                <h2>1. MỤC ĐÍCH VÀ PHẠM VI THU THẬP</h2>

                <p>
                  Công ty TNHH Evo Việt Nam yêu cầu Người dùng evoshop cung cấp
                  các thông tin cơ bản bao gồm: địa chỉ thư điện tử (email), số
                  điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ/ khu
                  vực khi Người dùng evoshop đăng ký sử dụng dịch vụ, tính năng,
                  phần mềm của Công ty TNHH Evo Việt Nam và một số thông tin
                  không bắt buộc khác khi Người dùng evoshop muốn tương tác với
                  một số nội dung trên website evoshop. Công ty TNHH Evo Việt
                  Nam sử dụng các thông tin này nhằm liên hệ xác nhận với Người
                  dùng và đảm bảo quyền lợi cho Người dùng evoshop khi cần
                  thiết.
                </p>

                <p>
                  Việc Người dùng evoshop truy cập, đăng ký, sử dụng dịch vụ,
                  tính năng, phần mềm của Công ty TNHH Evo Việt Nam có nghĩa
                  rằng Người dùng evoshop đồng ý và chấp nhận ràng buộc bởi các
                  quy định trong chính sách bảo mật của chúng tôi. Người dùng
                  evoshop sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt
                  động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư
                  điện tử và/hoặc số điện thoại của mình. Công ty TNHH Evo Việt
                  Nam không chịu trách nhiệm về các thất thoát dữ liệu, bí mật
                  thông tin của Người dùng evoshop do Người dùng evoshop vô tình
                  hoặc cố ý gây ra.
                </p>

                <p>
                  Ngoài ra, Người dùng evoshop có trách nhiệm thông báo kịp thời
                  cho Công ty TNHH Evo Việt Nam về những hành vi sử dụng trái
                  phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật
                  khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
                </p>

                <p>
                  Toàn bộ thông tin người dùng cung cấp trên hệ thống evoshop sẽ
                  được lưu giữ trên hệ thống của evoshop tại văn phòng của Công
                  ty TNHH Evo Việt Nam. Khi cần Người sử dụng evoshop có thể
                  hỏi về hoạt động thu thập, xử lý thông tin liên quan đến cá
                  nhân mình về bảo mật thông tin tại địa chỉ:
                </p>

                <p>
                  <strong>CÔNG TY TNHH evoshop VIỆT NAM</strong>
                </p>

                <ul>
                  <li>
                    <strong>Địa chỉ trụ sở</strong>: Lầu 3A, số 199 Điện Biên
                    Phủ, Phường 15, Quận Bình Thạnh, Thành Phố&nbsp;Hồ Chí Minh,
                    Việt Nam
                  </li>
                  <li>
                    <strong>Số điện thoại tư vấn và hỗ trợ</strong>: 1900 1511
                  </li>
                </ul>

                <h2>2. DỊCH VỤ, ỨNG DỤNG LIÊN KẾT VỚI evoshop</h2>

                <p>
                  Để đảm bảo quyền lợi và trải nghiệm tốt nhất cho Người dùng
                  evoshop, Công ty TNHH Evo Việt Nam áp dụng một số điều khoản
                  riêng khi Người dùng evoshop sử dụng các dịch vụ, ứng dụng,
                  tính năng, phần mềm do Công ty TNHH Evo Việt Nam cung cấp
                  hoặc có liên kết với evoshop. Đối với tài khoản Facebook của
                  Người dùng evoshop khi liên kết với dịch vụ, tính năng, phần
                  mềm evoshop, Công ty TNHH Evo Việt Nam sẽ yêu cầu quyền truy
                  cập các thông tin sau:
                </p>

                <ul>
                  <li>
                    Quyền truy cập vào địa chỉ email của Trang Facebook (Fan
                    Page) sử dụng để tích hợp với hệ thống evoshop;
                  </li>
                  <li>
                    Quyền truy cập vào tập hợp các mục công khai trên Trang
                    Facebook đã tích hợp với hệ thống evoshop;
                  </li>
                  <li>
                    Cho phép truy cập vào tập hợp các mục công khai trên Tài
                    khoản cá nhân của người dùng có tương tác với Trang Facebook
                    tích hợp với hệ thống evoshop;.
                  </li>
                  <li>
                    Cho phép truy cập hộp thư trên Trang Facebook tích hợp với
                    hệ thống evoshop.
                  </li>
                  <li>
                    Cho phép gửi và nhận tin nhắn, bình luận trên Trang Facebook
                    tích hợp với hệ thống evoshop.
                  </li>
                </ul>

                <h2>3. MỤC ĐÍCH VÀ PHẠM VI SỬ DỤNG THÔNG TIN</h2>

                <p>
                  Thuật ngữ “Thông tin cá nhân” trong Chính Sách này nghĩa là
                  thông tin nhận diện hoặc có khả năng nhận diện danh tính cá
                  nhân của Người dùng evoshop. Những loại thông tin cá nhân mà
                  Công ty TNHH Evo Việt Nam xử lý (có thể khác nhau theo phạm
                  vi quyền hạn dựa trên luật pháp hiện hành) bao gồm:
                </p>

                <ul>
                  <li>
                    Họ tên, Số CMND hoặc hộ chiếu, Ngày sinh, Giới tính, Chi
                    tiết liên hệ tại nhà riêng và nơi làm việc, Địa chỉ giao
                    hàng, Địa chỉ lấy hàng, Địa chỉ email, Số điện thoại cố
                    định, Số điện thoại di động.
                  </li>
                  <li>
                    Số lần truy cập trên website, phần mềm của evoshop và các
                    đối tác của evoshop, bao gồm số trang Người dùng xem, số
                    liên kết và những thông tin khác liên quan đến việc kết nối
                    đến website evoshop. Ngoài ra, Công ty TNHH Evo Việt Nam sẽ
                    thu thập các thông tin từ trình duyệt web mà người dùng đã
                    sử dụng mỗi khi truy cập vào website evoshop, bao gồm nhưng
                    không giới hạn: địa chỉ IP, ngôn ngữ sử dụng, thời gian...
                  </li>
                  <li>
                    Thông tin Người dùng evoshop cung cấp về sở thích, lựa chọn,
                    đánh giá, hoặc các thông tin Người dùng evoshop đồng ý cung
                    cấp trong khi tham gia vào các cuộc khảo sát hay chương
                    trình khuyến mãi.
                  </li>
                </ul>

                <p>evoshop sử dụng thông tin Người dùng evoshop cung cấp để:</p>

                <ul>
                  <li>Cung cấp các dịch vụ đến Người dùng evoshop.</li>
                  <li>
                    Gửi các thông báo về các hoạt động trao đổi thông tin giữa
                    Người dùng evoshop và đơn vị Hỗ trợ kỹ&nbsp;thuật của công
                    ty TNHH&nbsp;Evo Việt Nam.
                  </li>
                  <li>
                    Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của
                    Người dùng evoshop hoặc các hoạt động giả mạo Người dùng
                    evoshop.
                  </li>
                  <li>
                    Liên lạc và giải quyết với Người dùng evoshop trong những
                    trường hợp đặc biệt.
                  </li>
                  <li>
                    evoshop có trách nhiệm hợp tác cung cấp thông tin cá nhân
                    Người dùng evoshop khi có yêu cầu từ cơ quan nhà nước có
                    thẩm quyền.
                  </li>
                  <li>
                    Chia sẻ thông tin cần thiết cho bên đối tác nếu nhận được sự
                    đồng ý của Người dùng evoshop.
                  </li>
                  <li>
                    Quản lý cơ sở dữ liệu về người dùng evoshop và khách hàng
                    của người dùng evoshop
                  </li>
                  <li>Kịp thời xử lý các tình huống phát sinh (nếu có)</li>
                </ul>

                <p>
                  Chúng tôi luôn thông báo cho người dùng evoshop biết về mục
                  đích cụ thể nếu cần thu thập những thông tin cá nhân của người
                  dùng evoshop trên trang web này, và mọi thông tin đều phải
                  được người dùng evoshop tự nguyện cung cấp.
                </p>

                <h2>4. THỜI GIAN LƯU TRỮ THÔNG TIN</h2>

                <p>
                  Công ty TNHH&nbsp;Evo Việt Nam sẽ lưu trữ các thông tin cá
                  nhân do người dùng evoshop cung cấp trên các hệ thống nội bộ
                  trong quá trình cung cấp dịch vụ cho người dùng evoshop hoặc
                  cho đến khi hoàn thành mục đích thu thập hoặc khi người dùng
                  evoshop có yêu cầu xóa/ hủy các thông tin cá nhân đã cung cấp
                  trên website evoshop tới số điện thoại liên hệ hoặc thư điện
                  tử hỗ trợ của evoshop.
                </p>

                <p>
                  Toàn bộ dữ liệu của người dùng evoshop vẫn sẽ được lưu trữ
                  trên hệ thống evoshop trong thời hạn 06 tháng kể từ khi chấm
                  dứt hợp đồng cung ứng phần mềm hoặc kể từ khi người dùng
                  evoshop ngưng sử dụng phần mềm trên ứng dụng di động của
                  evoshop. Hết 6 tháng, dữ liệu của người dùng evoshop sẽ không
                  còn được lưu trữ trên hệ thống của evoshop.
                </p>

                <p>
                  Trong mọi trường hợp thông tin cá nhân người dùng evoshop sẽ
                  được bảo mật hoàn toàn trên máy chủ của công ty TNHH&nbsp;Evo
                  Việt Nam. người dùng evoshop có quyền cập nhật, sửa đổi và xóa
                  thông tin của các Dữ liệu cá nhân này. Tuy nhiên, trong một số
                  trường hợp, evoshop vẫn có thể khôi phục những thông tin đó từ
                  cơ sở dữ liệu của công ty TNHH&nbsp;Evo Việt Nam để giải
                  quyết các tranh chấp, thi hành điều khoản sử dụng, hay vì các
                  yêu cầu kỹ thuật, pháp lý liên quan đến sự an toàn và những
                  hoạt động của công ty TNHH&nbsp;evoshop Việt Nam.
                </p>

                <h2>
                  5. ĐỊA CHỈ CỦA ĐƠN VỊ THU THẬP, QUẢN LÝ THÔNG TIN VÀ HỖ TRỢ
                  NGƯỜI DÙNG CÔNG TY TNHH evoshop VIỆT NAM
                </h2>

                <p>
                  Công ty TNHH Evo lưu giữ và xử lý thông tin cá nhân của người
                  dùng evoshop trên máy chủ. Công ty TNHH&nbsp;Evo Việt Nam bảo
                  vệ nó bằng các biện pháp bảo vệ vật lý, điện tử bao gồm: tường
                  lửa, mã hóa dữ liệu và thủ tục áp dụng theo quy định của luật
                  bảo mật thông tin. Công ty TNHH&nbsp;Evo Việt Nam thực thi
                  kiểm soát truy cập vật lý vào các thông tin và công ty
                  TNHH&nbsp;Evo Việt Nam chỉ cho phép truy cập thông tin cá
                  nhân đối với những nhân viên cần nó để hoàn thành trách nhiệm
                  công việc của họ trong hệ thống evoshop.
                </p>

                <p>
                  <strong>CÔNG TY&nbsp;TNHH evoshop VIỆT NAM</strong>
                </p>

                <ul>
                  <li>
                    <strong>Trụ sở chính</strong>: Lầu 3A, số 199 Điện Biên Phủ,
                    Phường 15, Quận Bình Thạnh, Thành Phố&nbsp;Hồ Chí Minh, Việt
                    Nam
                  </li>
                  <li>
                    <strong>Số điện thoại liên hệ hỗ trợ</strong>: 1900 1511
                  </li>
                  <li>
                    <strong>Địa chỉ thư điện tử</strong>: support@Evo.vn
                  </li>
                </ul>

                <h2>
                  6. PHƯƠNG TIỆN VÀ CÔNG CỤ ĐỂ người dùng evoshop TIẾP CẬN VÀ
                  CHỈNH SỬA DỮ LIỆU CỦA MÌNH
                </h2>

                <p>
                  người dùng evoshop có quyền tự kiểm tra, cập nhật, điều chỉnh
                  thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản
                  và chỉnh sửa thông tin cá nhân hoặc yêu cầu công ty
                  TNHH&nbsp;Evo Việt Nam hỗ trợ thực hiện theo thông tin tại
                  mục 3 với công ty TNHH&nbsp;Evo Việt Nam. Tuy nhiên, bất kỳ
                  sửa đổi, bổ sung hay hủy bỏ thông tin cá nhân nào đều phải
                  tuân thủ đầy đủ các quy định về thông tin đăng ký tài khoản
                  trên website evoshop để đảm bảo công ty TNHH&nbsp;Evo Việt
                  Nam cung cấp dịch vụ kịp thời với chất lượng tốt nhất.
                </p>

                <p>
                  người dùng evoshop có quyền gửi khiếu nại về việc lộ thông tin
                  cá nhân cho bên thứ ba đến Ban quản trị của công ty
                  TNHH&nbsp;Evo Việt Nam. Khi tiếp nhận những phản hồi này,
                  công ty TNHH&nbsp;Evo Việt Nam phải có trách nhiệm xác nhận
                  lại thông tin, trả lời lý do và hướng dẫn người dùng evoshop
                  khôi phục và bảo mật lại thông tin.
                </p>

                <h2>7. CAM KẾT BẢO MẬT THÔNG TIN CÁ NHÂN người dùng evoshop</h2>

                <p>
                  Thông tin của người dùng trên hệ thống evoshop được công ty
                  TNHH&nbsp;Evo Việt Nam cam kết bảo mật tuyệt đối theo chính
                  sách bảo vệ thông tin cá nhân của công ty TNHH&nbsp;Evo Việt
                  Nam. Việc thu thập và sử dụng thông tin của mỗi người dùng
                  evoshop chỉ được thực hiện khi có sự đồng ý của người dùng
                  evoshop đó, trừ những trường hợp pháp luật có quy định khác.
                  Công ty TNHH&nbsp;Evo Việt Nam cam kết:
                </p>

                <ul>
                  <li>
                    Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho
                    bên thứ ba nào về thông tin cá nhân của người dùng evoshop
                    khi không có sự cho phép hoặc đồng ý từ người dùng evoshop,
                    trừ những trường hợp pháp luật có quy định khác.
                  </li>
                  <li>
                    Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của
                    người dùng evoshop bao gồm thông tin hóa đơn, chứng từ kế
                    toán số hóa tại khu vực trung tâm an toàn dữ liệu của công
                    ty TNHH&nbsp;Evo Việt Nam.
                  </li>
                </ul>

                <p>
                  Chúng tôi cam kết sẽ bảo mật các Thông tin cá nhân của người
                  dùng evoshop, sẽ nỗ lực hết sức và sử dụng các biện pháp thích
                  hợp để các thông tin mà người dùng evoshop cung cấp cho chúng
                  tôi trong quá trình sử dụng website này được bảo mật và bảo vệ
                  khỏi sự truy cập trái phép. Tuy nhiên, công ty TNHH&nbsp;Evo
                  Việt Nam không đảm bảo ngăn chặn được tất cả các truy cập trái
                  phép. Trong trường hợp truy cập trái phép nằm ngoài khả năng
                  kiểm soát, công ty TNHH&nbsp;Evo Việt Nam sẽ không chịu trách
                  nhiệm dưới bất kỳ hình thức nào đối với bất kỳ khiếu nại,
                  tranh chấp hoặc thiệt hại nào phát sinh từ hoặc liên quan đến
                  truy cập trái phép đó.
                </p>

                <h2>
                  8. CƠ CHẾ TIẾP NHẬN VÀ GIẢI QUYẾT KHIẾU NẠI CỦA NGƯỜI DÙNG
                  LIÊN QUAN ĐẾN THÔNG TIN CÁ NHÂN BỊ SỬ DỤNG SAI MỤC ĐÍCH HOẶC
                  NGOÀI PHẠM VI ĐÃ ĐƯỢC QUY ĐỊNH TẠI CHÍNH SÁCH BẢO MẬT NÀY
                </h2>

                <p>
                  Ngoài phạm vi, mục đích thu thập và sử dụng thông tin cá nhân
                  được quy định tại Chính sách bảo mật thông tin này và theo quy
                  định của pháp luật, mọi hình thức thu thập và sử dụng thông
                  tin cá nhân của Người dùng evoshop với mục đích khác mà chưa
                  được sự đồng ý của Người dùng đều là hành vi vi phạm và bị xử
                  phạt theo quy định. Công ty TNHH&nbsp;Evo Việt Nam sẽ tiếp
                  nhận và giải quyết các khiếu nại của người dùng evoshop liên
                  quan đến việc sử dụng sai mục đích và phạm vi thông tin cá
                  nhân của Người dùng theo quy trình sau:
                </p>

                <p>
                  <strong>Bước 1:</strong> Người dùng khiếu nại về vụ việc liên
                  quan đến thông tin cá nhân của mình với công ty TNHH&nbsp;Evo
                  Việt Nam bằng cách liên hệ với các thông tin hỗ trợ đã được
                  đăng tải công khai trên website evoshop hoặc liên hệ vào số
                  điện thoại hỗ trợ 028.7300.5688 (sau đây gọi tắt là “Người
                  khiếu nại”).
                </p>

                <p>
                  <strong>Bước 2:</strong> Công ty TNHH Evo Việt Nam&nbsp;sẽ
                  chuyển cho phòng ban chịu trách nhiệm giải quyết.
                </p>

                <p>
                  <strong>Bước 3:</strong> Trong thời hạn 10 (mười) ngày làm
                  việc kể từ ngày nhận được khiếu nại của Người khiếu nại, Công
                  ty TNHH Evo Việt Nam&nbsp;sẽ phản hồi cho Người khiếu nại về
                  kết quả giải quyết khiếu nại.
                </p>
              </div>
            </div>
          )}
          {page == 'chinh-sach-va-quy-dinh-chung' && (
            <div className="container news_static pb-5">
              <h1 className="text-uppercase py-5 jnt-color text-center">
                Chính sách và quy định chung
              </h1>
              <div className="text-left">
                <h2>1. THÔNG TIN DOANH NGHIỆP CUNG CẤP DỊCH VỤ</h2>

                <p>
                  <strong>
                    a) Thông tin về doanh nghiệp và địa chỉ doanh nghiệp
                  </strong>
                </p>

                <ul>
                  <li>
                    <strong>Tên doanh nghiệp</strong>: CÔNG TY TNHH evoshop VIỆT
                    NAM
                  </li>
                  <li>
                    <strong>Địa chỉ trụ sở</strong>: Lầu 3A, Số 199 Điện Biên
                    Phủ, Phường 15, Quận Bình Thạnh, Thành Phố&nbsp;Hồ Chí Minh,
                    Việt Nam
                  </li>
                </ul>

                <p>
                  <strong>
                    b) Số điện thoại, địa chỉ thư điện tử liên hệ hỗ trợ
                  </strong>
                </p>

                <ul>
                  <li>
                    <strong>Số điện thoại liên hệ hỗ trợ</strong>: 1900 1511
                  </li>
                  <li>
                    <strong>Địa chỉ thư điện tử hỗ trợ</strong>:{' '}
                    <a href="mailto:support@Evo.vn">support@Evo.vn</a>
                  </li>
                </ul>

                <h2>
                  2. CÁC ĐỊNH NGHĨA TẠI CHÍNH SÁCH SỬ DỤNG VÀ QUY ĐỊNH CHUNG
                </h2>

                <p>
                  “<strong>Dịch vụ</strong>” – Công ty TNHH Evo Việt
                  Nam&nbsp;cung cấp dịch vụ Phần mềm quản lý bán hàng evoshop
                  hoạt động dưới tên miền evoshop.vn
                </p>

                <p>
                  “<strong>Website</strong>” – Trang thông tin điện tử của Công
                  ty TNHH Evo Việt Nam được người dùng sử dụng khi truy cập địa
                  chỉ <a href="https://evoshop.vn">https://evoshop.vn</a>
                </p>

                <p>
                  “<strong>Nội dung</strong>” – Tất cả bài viết, hình ảnh,
                  video, biểu tượng được đăng tải trên website evoshop{' '}
                  <a href="https://evoshop.vn">https://evoshop.vn</a>
                </p>

                <p>
                  “<strong>Chủ tài khoản</strong>” – Cá nhân đăng ký tài khoản,
                  đăng ký sử dụng ban đầu; hoặc cá nhân giữ, quản lý tài khoản
                  quản trị; hoặc cá nhân được cấp quyền truy cập, sử dụng tài
                  khoản cửa hàng bằng tài khoản quản trị.
                </p>

                <p>
                  “<strong>Cửa hàng</strong>” – Tài khoản cửa hàng/ bán hàng
                  trực tuyến trên website của Công ty TNHH Evo Việt Nam do
                  người dùng evoshop hoặc/và Chủ tài khoản đặt theo tên cửa hàng
                  mình hiện sở hữu
                </p>

                <p>
                  “<strong>Tài khoản quản trị</strong>” – Tài khoản được tạo ra
                  đầu tiên khi chủ tài khoản đăng ký cửa hàng trên website
                  evoshop <a href="https://evoshop.vn">https://evoshop.vn</a>
                </p>

                <p>
                  “<strong>người dùng evoshop</strong>” (sau đây gọi tắt là
                  Người dùng) – Là Người đăng ký, tạo tài khoản, sở hữu, sử dụng
                  tài khoản, chức năng, dịch vụ, phần mềm của Công ty TNHH Evo
                  Việt Nam trên website evoshop và được evoshop chấp nhận sự
                  đăng ký đó như: Chủ tài khoản hoặc các nhân viên của cửa hàng
                  được chủ tài khoản cấp quyền truy cập vào tài khoản bán hàng
                  cửa hàng; Những người truy cập, tìm hiểu thông tin trên
                  Website evoshop{' '}
                  <a href="https://evoshop.vn">https://evoshop.vn</a>
                </p>

                <p>
                  “<strong>evoshop</strong>” – Công Ty Trách Nhiệm Hữu Hạn Evo
                  Việt Nam&nbsp;(sau đây gọi tắt là công ty evoshop).
                </p>

                <p>
                  “<strong>Bên thứ ba</strong>” – Khách hàng, đối tác, nhà cung
                  cấp của cửa hàng/ của người dùng evoshop hoặc của Công ty TNHH
                  Evo Việt Nam.
                </p>

                <p>
                  “<strong>Thư điện tử</strong>” – (email hay e-mail: viết tắt
                  từ chữ electronic mail) là hệ thống trao đổi tin nhắn, chuyển
                  nhận thư từ giúp liên hệ hỗ trợ qua các thiết bị điện tử giữa
                  người dùng evoshop và Công ty TNHH Evo Việt Nam.
                </p>

                <p>
                  “<strong>Dữ liệu</strong>” – Dữ liệu dưới dạng điện tử được
                  lưu trữ trên tài khoản bán hàng/ cửa hàng được giới hạn truy
                  cập bằng tài khoản do chủ tài khoản thiết lập và cấp quyền
                  truy cập.
                </p>

                <p>
                  “<strong>Khu vực chung</strong>” – Trang chủ evoshop.vn, màn
                  hình đăng nhập, footer các trang, khu vực logo các trang trên
                  website của Công ty TNHH Evo Việt Nam.
                </p>

                <p>
                  “<strong>Khu vực riêng</strong>” – Trang màn hình bán hàng của
                  người dùng evoshop, phần nội dung trong mỗi tính năng trên các
                  trang quản lý bán hàng/cửa hàng sau khi Người dùng đã đăng
                  nhập vào tài khoản.
                </p>

                <p>
                  “<strong>Tính năng</strong>” – Tất cả các tính năng hiện có và
                  đang được cung cấp trên phần mềm của Công ty TNHH Evo Việt
                  Nam.
                </p>

                <p>
                  người dùng evoshop có thể xem điều khoản dịch vụ mới nhất bất
                  kỳ lúc nào tại đây.
                </p>

                <h2>3. PHẠM VI ÁP DỤNG CHÍNH SÁCH</h2>

                <p>
                  Chính sách sử dụng này được áp dụng cho Dịch vụ phần mềm quản
                  lý bán hàng của công ty TNHH Evo Việt Nam, phiên bản chính
                  thức hoạt động trên máy chủ của công ty TNHH Evo Việt Nam
                  dưới tên miền chính thức{' '}
                  <a href="https://evoshop.vn">evoshop.vn</a>. Công ty TNHH Evo
                  Việt Nam&nbsp;duy trì trang thông tin điện tử{' '}
                  <a href="https://evoshop.vn">https://evoshop.vn</a> và các tên
                  miền phụ như một dịch vụ cung cấp cho người dùng evoshop nhưng
                  không giới hạn là các cá nhân, tổ chức sử dụng.
                </p>

                <p>
                  Khi sử dụng website evoshop và bất kỳ dịch vụ nào tại evoshop
                  đồng nghĩa với việc người dùng evoshop đã chấp nhận và đồng ý
                  tuân thủ các điều khoản, chính sách, thỏa thuận sử dụng dịch
                  vụ đã được công bố trên Website evoshop. Ngoài ra khi sử dụng
                  các Dịch vụ cụ thể của evoshop, người dùng evoshop phải tuân
                  theo các điều khoản và điều kiện riêng áp dụng cho Dịch vụ đó
                  theo từng thời điểm. evoshop có thể thay đổi, điều chỉnh Điều
                  khoản sử dụng này và công khai trên hệ thống ngay khi được
                  thông qua.
                </p>

                <p>
                  người dùng evoshop có thể xem những thông tin mới cập nhật vào
                  bất cứ lúc nào tại website evoshop. Nếu Người dùng evoshop
                  tiếp tục sử dụng Dịch vụ có nghĩa là người dùng evoshop chấp
                  nhận và đồng ý tuân theo Điều khoản sử dụng mới được cập nhật.
                  Bất cứ sự vi phạm nào của người dùng evoshop đối với các điều
                  khoản và điều kiện này đều có thể dẫn đến việc đình chỉ hoặc
                  kết thúc tài khoản, Dịch vụ hoặc những hoạt động được phép
                  khác theo Điều khoản sử dụng Dịch vụ của evoshop.
                </p>

                <h2>4. TÀI KHOẢN NGƯỜI SỬ DỤNG</h2>

                <ul>
                  <li>
                    Người dùng có trách nhiệm cung cấp đầy đủ họ tên, địa chỉ
                    hiện tại, địa chỉ thư điện tử chính xác và những thông tin
                    cần thiết liên quan để được hưởng đầy đủ chính sách dành cho
                    người dùng evoshop.
                  </li>
                  <li>
                    người dùng evoshop cần biết rằng evoshop sẽ sử dụng thư điện
                    tử như một phương pháp giao tiếp chính giữa hai bên.
                  </li>
                  <li>
                    người dùng evoshop có nghĩa vụ phải bảo mật mật khẩu và
                    thông tin đăng ký tài khoản cửa hàng của chính mình. Công ty
                    TNHH Evo Việt Nam không cam kết chịu bất kỳ&nbsp;thiệt hại
                    nào cho Người dùng nếu như việc đó đến từ việc Người dùng
                    không bảo mật mật khẩu cá nhân.
                  </li>
                  <li>
                    người dùng evoshop phải chịu toàn bộ trách nhiệm về dữ liệu,
                    hình ảnh, báo cáo và các liên kết website mà Người dùng đưa
                    lên tài khoản cửa hàng evoshop của Người dùng.
                  </li>
                  <li>
                    người dùng evoshop không được đưa bất kỳ virus hay đoạn mã
                    nào ảnh hưởng đến người khác.
                  </li>
                  <li>
                    Không sử dụng các tính năng và dịch vụ tại evoshop cho bất
                    kỳ điều gì vi phạm pháp luật hay phát tán các mã độc, virus.
                    Nếu có bất kỳ điều gì cần liên lạc, chúng tôi sẽ gửi thư
                    điện tử đến cho người dùng evoshop.
                  </li>
                  <li>
                    Chú ý là nếu có bất kỳ vi phạm nào về điều khoản sử dụng xảy
                    ra đồng nghĩa với việc chúng tôi sẽ hủy toàn bộ dịch vụ đang
                    cung cấp cho Người dùng ngay lập tức, bao gồm tất cả các
                    dịch vụ mà người dùng evoshop đang sử dụng của công ty TNHH
                    Evo Việt Nam.
                  </li>
                </ul>

                <h2>5. KÍCH HOẠT TÀI KHOẢN</h2>

                <p>
                  Người đăng ký sử dụng dịch vụ tại evoshop sẽ được xem là người
                  sở hữu tài khoản và chịu tác động của toàn bộ điều khoản sử
                  dụng dịch vụ. Người nào trực tiếp đăng ký sử dụng dịch vụ của
                  evoshop sẽ chịu trách nhiệm cho tài khoản đó và cũng đồng
                  nghĩa với việc đồng ý toàn bộ điều khoản về dịch vụ của
                  evoshop. Nếu người đăng ký sử dụng dịch vụ của evoshop là nhân
                  viên của cửa hàng có quyền đăng ký sử dụng dịch vụ, thì người
                  nhân viên đó chính là người sở hữu tài khoản.
                </p>

                <p>
                  Người dùng phải chịu trách nhiệm về tính chính xác của thông
                  tin đăng ký. Công ty TNHH Evo Việt Nam không chịu trách nhiệm
                  về bất cứ quyền lợi nào của bên đăng ký trong trường hợp thông
                  tin đăng ký không chính xác. evoshop có quyền từ chối phục vụ,
                  xóa Nội dung, Dữ liệu của Người dùng mà không phải bồi hoàn
                  trong những trường hợp thông tin đăng ký không chính xác vì
                  bất kỳ lý do gì. Công ty TNHH Evo Việt Nam khuyến nghị người
                  đăng ký sử dụng hộp thư điện tử chính thức của doanh nghiệp/tổ
                  chức đăng ký, tốt nhất là sử dụng hộp thư với tên miền chính
                  thức của doanh nghiệp/tổ chức. Chúng tôi tôn trọng và bảo vệ
                  các thông tin của người đăng ký/ sử dụng evoshop.
                </p>

                <h2>6. SỬ DỤNG THỬ/ DÙNG THỬ MIỄN PHÍ</h2>

                <p>
                  Công ty TNHH Evo Việt Nam không chịu trách nhiệm về bất cứ
                  quyền lợi nào của Người dùng liên quan tới việc dùng sử dụng
                  thử/dùng thử miễn phí. Khi Người dùng đăng ký sử dụng thử dịch
                  vụ, phần mềm của evoshop và được sự đồng ý của evoshop, công
                  ty TNHH Evo Việt Nam sẽ cung cấp miễn phí dịch vụ cho tới
                  khi:
                </p>

                <ul>
                  <li>Hết thời gian dùng thử.</li>
                  <li>
                    Khách hàng chính thức chuyển sang sử dụng dịch vụ, tính
                    năng, phần mềm có tính phí của evoshop.
                  </li>
                </ul>

                <p>
                  - Khi hết thời hạn dùng thử mà Người dùng không thực hiện
                  thanh toán và chuyển sang hình thức sử dụng có tính phí, dữ
                  liệu dùng thử của Người dùng có thể bị xóa khỏi hệ thống vì
                  bất kỳ lý do gì.
                </p>

                <p>
                  - Khi Người dùng đăng ký sử dụng phiên bản có tính phí và được
                  kích hoạt, phiên bản tính phí được duy trì cho tới khi:
                </p>

                <ul>
                  <li>
                    Hết thời gian đăng ký sử dụng theo hợp đồng thanh toán.
                  </li>
                  <li>
                    Người dùng không có bất kỳ hành động gì sử dụng dịch vụ
                    trong thời gian 30 ngày. Trong trường hợp này công ty TNHH
                    Evo Việt Nam có thể xóa dữ liệu khỏi hệ thống.
                  </li>
                  <li>
                    Người dùng đã thanh toán tiền dịch vụ và nâng cấp lên các
                    phiên bản tính phí bổ sung, phí cao hơn. Trong trường hợp
                    này, dữ liệu của Người dùng tiếp tục được giữ và chuyển lên
                    để sử dụng dịch vụ dưới hình thức thuê bao ở phiên bản có
                    phí thay đổi cao hơn.
                  </li>
                </ul>

                <h2>7. SỬ DỤNG HỢP PHÁP</h2>

                <p>
                  Công ty TNHH Evo Việt Nam cung cấp phần mềm quản lý bán hàng
                  với các tính năng hỗ trợ quản lý bán hàng/ cửa hàng cho người
                  dùng evoshop. Vì vậy, công ty TNHH Evo Việt Nam sẽ không can
                  thiệp và không chịu trách nhiệm đối với bất kỳ&nbsp;nội dung
                  hoạt động bán hàng nào của người dùng evoshop như:
                </p>

                <ul>
                  <li>Khách hàng của người dùng evoshop</li>
                  <li>
                    Hàng hóa, Sản phẩm người dùng evoshop hiện đang kinh doanh
                  </li>
                  <li>
                    Chất lượng hàng hóa mà người dùng evoshop hiện đang kinh
                    doanh
                  </li>
                  <li>
                    Các khiếu kiện nào từ người dùng evoshop hoặc Bên thứ ba
                    phản ánh về nội dung hoạt động bán hàng của người dùng
                    evoshop.
                  </li>
                </ul>

                <p>người dùng evoshop phải nhận thức và phải chấp nhận rằng:</p>

                <ul>
                  <li>
                    người dùng evoshop có trách nhiệm sử dụng Dịch vụ của
                    evoshop vào công việc kinh doanh hàng hóa, dịch vụ trong
                    khuôn khổ cho phép của pháp luật hiện hành và thuần phong mỹ
                    tục của Việt Nam.
                  </li>
                  <li>
                    người dùng evoshop không được sử dụng dịch vụ của evoshop để
                    thực hiện các hành động có thể gây ảnh hưởng đến quyền và
                    lợi ích hợp pháp của của evoshop, cộng đồng hay quyền lợi
                    của bất kỳ&nbsp;cơ quan, tổ chức, cá nhân nào (Tuyên truyền
                    nội dung đồi trụy, chống phá nhà nước, phát tán thư rác và/
                    hoặc gửi các thông tin không mong muốn đến những tổ chức và
                    cá nhân khác trong hệ thống dưới mọi hình thức, kinh doanh
                    hàng hóa thuộc danh mục hàng hóa cấm kinh doanh....)
                  </li>
                </ul>

                <p>
                  Khi có căn cứ hoặc có dấu hiệu nghi ngờ người dùng evoshop có
                  dấu hiệu vi phạm pháp luật, có báo cáo, khiếu nại từ Bên thứ
                  ba gửi về công ty TNHH Evo Việt Nam phản ánh tiêu cực về hoạt
                  động kinh doanh của Người dùng evoshop hoặc bất kỳ&nbsp;hoạt
                  động nào của người dùng evoshop khi sử dụng website evoshop mà
                  evoshop nhận thấy có khả năng gây ảnh hưởng đến sự an toàn của
                  công ty TNHH Evo Việt Nam, quyền, lợi ích hợp pháp của cộng
                  đồng, cơ quan, tổ chức, cá nhân khác. Công ty TNHH Evo Việt
                  Nam có toàn quyền tạm ngưng cung cấp hoặc ngăn chặn quyền tiếp
                  tục truy cập vào các dịch vụ, tính năng, phần mềm của người
                  dùng evoshop vào hệ thống dịch vụ của evoshop.
                </p>

                <p>
                  Trong trường hợp đó, để Người dùng tiếp tục sử dụng, evoshop
                  có quyền yêu cầu người dùng evoshop cung cấp thông tin để xác
                  minh và/hoặc thực hiện cam kết để có thể tiếp tục sử dụng dịch
                  vụ. Trường hợp nhận thấy sự việc có tính chất nghiêm trọng,
                  evoshop có toàn quyền nhờ đến sự can thiệp của các cơ quan nhà
                  nước có thẩm quyền, các đơn vị có chức năng chuyên môn để đảm
                  bảo quyền và lợi ích hợp pháp cho công ty TNHH Evo Việt Nam
                  cũng như cộng đồng.
                </p>

                <h2>8. QUYỀN SỞ HỮU TRÍ TUỆ</h2>

                <p>
                  website evoshop{' '}
                  <a href="https://evoshop.vn">https://evoshop.vn</a> thuộc bản
                  quyền của Công ty TNHH Evo Việt Nam.
                </p>

                <p>
                  Tất cả nội dung tại website evoshop{' '}
                  <a href="https://evoshop.vn">https://evoshop.vn</a> đều thuộc
                  sở hữu của công ty TNHH Evo Việt Nam. evoshop cho phép Người
                  dùng xem, tải về và in Nội dung với điều kiện:
                </p>

                <ol style={{listStyleType: 'lower-roman'}}>
                  <li>
                    Sử dụng cho mục đích cá nhân, không cho mục đích thương mại
                  </li>
                  <li>Không chỉnh sửa Nội dung</li>
                  <li>Trích dẫn nguồn từ Website theo đúng qui định.</li>
                </ol>

                <p>
                  Người dùng không được phép sao chép, điều chỉnh hoặc sử dụng
                  lại nội dung Website mà không có sự cho phép trước bằng văn
                  bản của công ty TNHH Evo Việt Nam. Để yêu cầu sử dụng nội
                  dung, Người dùng có thể liên hệ theo địa chỉ: support@Evo.vn.
                  Nếu được chấp thuận, Người dùng phải bảo đảm việc sử dụng nội
                  dung Website không vi phạm quyền, lợi ích của các cá nhân/tổ
                  chức khác và phải ghi rõ nguồn từ website evoshop{' '}
                  <a href="https://evoshop.vn">https://evoshop.vn</a>.
                </p>

                <p>
                  Do đó, tất cả nội dung tại website evoshop, tại Ứng dụng
                  evoshop đều thuộc sở hữu của evoshop. evoshop cho phép Người
                  dùng evoshop xem, tải về và in những nội dung sau:
                </p>

                <ul>
                  <li>
                    Nội dung đã được công ty TNHH Evo Việt Nam công khai trên
                    website evoshop
                  </li>
                  <li>
                    Nội dung các thông tin thuộc sở hữu của chính người dùng
                    evoshop
                  </li>
                </ul>

                <h2>9. QUYỀN LỢI CỦA evoshop</h2>

                <ul>
                  <li>
                    Công ty TNHH Evo Việt Nam có quyền sửa đổi hoặc chấm dứt
                    cung cấp Dịch vụ, Tính năng, Phần mềm của evoshop vì bất kỳ
                    lý do nào, mà không cần thông báo trước.
                  </li>
                  <li>
                    Chúng tôi có quyền từ chối cung cấp dịch vụ cho bất kỳ cá
                    nhân nào với bất kỳ lý do nào.
                  </li>
                  <li>
                    Chúng tôi có thể xóa nội dung hoặc hủy bỏ bất kỳ tài khoản
                    nào có chứa tính chất bất hợp pháp, xúc phạm, bôi nhọ, đe
                    dọa, khiêu dâm hoặc cố tình xâm phạm sở hữu trí tuệ.
                  </li>
                  <li>
                    Chúng tôi có thể xóa bất kỳ tài khoản nào cố ý xâm phạm, xúc
                    phạm dù bằng lời nói hay chữ viết đến khách hàng của
                    evoshop, nhân viên của evoshop, công ty TNHH Evo Việt Nam.
                  </li>
                  <li>
                    Công ty TNHH Evo Việt Nam không xem trước hay duyệt bất kỳ
                    nội dung thông tin nào trên tài khoản bán hàng của người
                    dùng, họ phải chịu trách nhiệm về nội dung của mình.
                  </li>
                  <li>
                    Chúng tôi có quyền cung cấp dịch vụ cho đối thủ của người
                    dùng evoshop hoặc không cam kết sẽ độc quyền cho bất kỳ đối
                    tác nào cho từng phân khúc nào.
                  </li>
                  <li>
                    Trong trường hợp tranh chấp đến quyền sở hữu tài khoản,
                    chúng tôi có toàn quyền để yêu cầu các giấy tờ dùng để chứng
                    thực quyền sở hữu tài khoản của người dùng evoshop. Tài liệu
                    có thể bao gồm, và không giới hạn ở, những giấy tờ sao chép
                    về giấy phép kinh doanh của người dùng evoshop, thẻ chứng
                    minh nhân dân, v.v…
                  </li>
                  <li>
                    Công ty TNHH Evo Việt Nam có quyền quyết định về quyền sở
                    hữu hợp pháp của tài khoản và có thể chuyển quyền này đến
                    người sở hữu hợp lệ. Nếu chúng tôi không thể xác định được
                    quyền sở hữu chính xác, evoshop sẽ đóng băng tài khoản này
                    cho đến khi xác định được kết luận giữa tranh chấp các bên.
                  </li>
                </ul>

                <h2>10. GIỚI HẠN VỀ TRÁCH NHIỆM</h2>

                <p>
                  Người dùng phải hiểu rõ và đồng ý rằng công ty TNHH Evo Việt
                  Nam sẽ không chịu trách nhiệm cho bất kỳ thiệt hại nào, dù là
                  trực tiếp, gián tiếp hay ngẫu nhiên, đặc biệt các thiệt hại về
                  lợi nhuận, uy tín, quyền sử dụng, dữ liệu hoặc các thiệt hại
                  vô hình khác khi sử dụng dịch vụ của evoshop. Trong mọi trường
                  hợp, công ty TNHH Evo Việt Nam hoặc nhà cung cấp dịch vụ khác
                  hợp tác với chúng tôi sẽ không phải chịu trách nhiệm về thiệt
                  hại về lợi nhuận hoặc những thiệt hại khác do hậu quả phát
                  sinh từ việc kết nối đến trang web của chúng tôi, dịch vụ của
                  chúng tôi hoặc thỏa thuận này. người dùng evoshop cũng hiểu
                  rằng những cá nhân liên quan trực tiếp đến chúng tôi như công
                  ty TNHH Evo Việt Nam, đối tác của evoshop, nhân viên evoshop…
                  cũng không phải chịu trách nhiệm về bất cứ thiệt hại nào.
                </p>

                <p>
                  Nếu người dùng evoshop sử dụng bất kỳ dịch vụ nào của đối tác
                  thứ ba, người dùng evoshop phải chịu theo những cam kết bên
                  họ. Dịch vụ và sản phẩm của chúng tôi là điều cơ bản nhất
                  chúng tôi cung cấp cho Người dùng evoshop và không phải chịu
                  bất kỳ&nbsp;điều khoản bảo hành theo luật định nào. evoshop
                  không bảo đảm rằng các kết quả thu về từ việc sử dụng Dịch vụ
                  của evoshop là chính xác hoàn toàn và đáng tin cậy. evoshop
                  không bảo đảm chất lượng của bất kỳ sản phẩm, dịch vụ, thông
                  tin hay bất kỳ sản phẩm nào Người dùng mua hay sở hữu thông
                  qua dịch vụ của evoshop sẽ đạt được điều Người dùng mong đợi.
                  Nếu có bất kỳ lỗi nào phát sinh, chúng tôi sẽ khắc phục trong
                  điều kiện cho phép. Chúng tôi không chịu trách nhiệm nếu người
                  dùng evoshop phạm pháp, vi phạm điều khoản này hoặc đi ngược
                  lại với quyền lợi của bên đối tác thứ ba, đặc biệt ghi chú để
                  khi bị kiện.
                </p>

                <h2>11. BẢO MẬT THÔNG TIN</h2>

                <p>
                  Người dùng phải có trách nhiệm lưu giữ thông tin truy cập vào
                  Cửa hàng để tránh trường hợp tài khoản, thông tin, dữ liệu bị
                  đánh cắp và/ hoặc bị lạm dụng với mục đích không an toàn cho
                  cả người dùng evoshop và công ty TNHH Evo Việt Nam. evoshop
                  không chịu trách nhiệm đối với sự xâm nhập trái phép của bên
                  thứ ba vào Cửa hàng của người dùng do sự bất cẩn để lộ thông
                  tin từ người dùng. Công ty TNHH Evo Việt Nam khuyến cáo người
                  dùng đổi mật khẩu sau khi cung cấp mật khẩu cho các bên liên
                  quan nhằm mục đích hỗ trợ sử dụng. Ngoài ra, evoshop cam kết
                  giữ kín mọi thông tin của người dùng khi sử dụng các Dịch vụ
                  trên Website của evoshop và không tiết lộ cho bên thứ ba. Công
                  ty TNHH Evo Việt Nam chỉ thay đổi thông tin của người dùng
                  trên website evoshop khi có sự đồng ý hoặc yêu cầu của người
                  dùng evoshop.
                </p>

                <h2>12. XỬ LÝ SỰ CỐ</h2>

                <p>
                  Người dùng có trách nhiệm thông báo ngay cho công ty TNHH Evo
                  Việt Nam khi phát hiện sự cố, tích cực phối hợp với công ty
                  TNHH Evo Việt Nam để khắc phục sự cố sớm nhất. Trong trường
                  hợp sự cố liên quan đến Bên thứ ba, người dùng có trách nhiệm
                  phối hợp với các bên liên quan để giải quyết.
                </p>

                <p>
                  Người dùng cần hiểu và chấp nhận rằng, trong mọi trường hợp,
                  công ty TNHH Evo Việt Nam luôn cố gắng hỗ trợ và khắc phục sự
                  cố tối đa. Tuy nhiên công ty TNHH Evo Việt Nam sẽ không chịu
                  trách nhiệm trước những thiệt hại phát sinh do sự chậm trễ
                  không thông báo hoặc che giấu thông tin sự cố của người dùng
                  evoshop.
                </p>

                <h2>13. GIỚI HẠN TRÁCH NHIỆM</h2>

                <p>
                  Như một điều kiện khi sử dụng Website và Dịch vụ của evoshop,
                  Người dùng đồng ý rằng công ty TNHH evoshop Việt Nam, nhân
                  viên evoshop, các tổ chức thành viên, cổ đông, đại lý, nhà
                  cung cấp của evoshop sẽ không chịu trách nhiệm với Bên thứ ba
                  về các thiệt hại về lợi nhuận, cơ hội kinh doanh hoặc thiệt
                  hại, chi phí phát sinh trực tiếp hay gián tiếp vì kết nối với
                  website evoshop hay sử dụng các Dịch vụ của evoshop.
                </p>

                <p>
                  Công ty TNHH Evo Việt Nam sẽ không chịu bất kỳ trách nhiệm
                  nào hoặc trách nhiệm liên đới đối với những hậu quả của việc
                  truy cập trái phép đến máy chủ hoặc website evoshop; trang
                  thiết bị và dữ liệu của Người dùng evoshop hoặc dữ liệu cá
                  nhân của người dùng evoshop vì tai nạn, phương tiện bất hợp
                  pháp, thiết bị của Bên thứ ba và các nguyên nhân khác nằm
                  ngoài sự kiểm soát của evoshop.
                </p>

                <p>
                  evoshop sẽ không chịu bất kỳ trách nhiệm nào hoặc trách nhiệm
                  liên đới đối với chất lượng sản phẩm, dịch vụ, thông tin của
                  các website của Bên thứ ba có liên kết với website evoshop.
                  Ngoài ra, người dùng evoshop cũng hiểu rằng, evoshop không có
                  trách nhiệm và thẩm quyền xác nhận, chứng nhận thông tin và
                  chất lượng dịch vụ, sản phẩm hay bồi thường các thiệt hại liên
                  quan đến việc người dùng evoshop sử dụng dịch vụ, sản phẩm
                  được quảng cáo trên website của Bên thứ ba. evoshop khuyến
                  nghị người dùng evoshop tìm hiểu đối tác kỹ càng trước khi xúc
                  tiến hợp tác để tránh các thiệt hại không mong muốn. evoshop
                  không bảo đảm cũng như không chịu trách nhiệm về kết quả kinh
                  doanh của người dùng evoshop sau khi sử dụng dịch vụ.
                </p>

                <p>
                  Sau khi công ty TNHH Evo Việt Nam bàn giao các thông số quản
                  trị dịch vụ cho người dùng, evoshop không chịu trách nhiệm và
                  không bảo đảm về tính chính xác về những thông tin của người
                  dùng evoshop trên phần mềm, tài khoản bán hàng của người dùng
                  evoshop. Đồng thời, evoshop không chịu trách nhiệm pháp lý và
                  bồi thường cho người dùng evoshop và bên thứ ba đối với các
                  thiệt hại trực tiếp, gián tiếp, vô ý, vô hình, các thiệt hại
                  về lợi nhuận, doanh thu, uy tín phát sinh từ việc sử dụng sản
                  phẩm, dịch vụ của evoshop sau khi evoshop đã bàn giao cho
                  Người dùng.
                </p>

                <h2>14. ĐẢM BẢO CUNG CẤP DỊCH VỤ</h2>

                <p>
                  website evoshop và các Dịch vụ, Tính năng, Phần mềm đi kèm của
                  evoshop được cung cấp trên cơ sở “có khả năng thực hiện”. Công
                  ty TNHH Evo Việt Nam không bảo đảm rằng Website hoặc Dịch vụ
                  sẽ luôn sẵn sàng, có thể sử dụng ngay, không bị gián đoạn,
                  đúng thời gian, không có lỗi bởi các sự cố (Hacker, mất mạng
                  Internet trên diện rộng…). Tuy nhiên, công ty TNHH Evo Việt
                  Nam và các nhân viên của công ty TNHH Evo Việt Nam cam kết cố
                  gắng trong mọi điều kiện và khả năng có thể để đảm bảo Website
                  và Dịch vụ luôn được sẵn sàng để sử dụng.
                </p>

                <p>
                  người dùng evoshop cần lưu ý rằng website evoshop, Phần mềm và
                  Dịch vụ hoạt động dựa trên những dịch vụ đường truyền Internet
                  và có thể bị mất điện hoặc gián đoạn, bị bên ngoài tấn công và
                  xảy ra chậm trễ. Trong những trường hợp như vậy, đối với những
                  điều khoản này, công ty TNHH Evo Việt Nam cam kết nỗ lực khắc
                  phục sự cố gián đoạn và đưa ra phương án điều chỉnh, sửa chữa,
                  thay thế và hỗ trợ trong khả năng có thể để phục hồi hệ thống
                  sớm nhất.
                </p>

                <h2>15. TÀI LIỆU HƯỚNG DẪN SỬ DỤNG</h2>

                <p>
                  người dùng evoshop có thể truy cập và tra cứu hướng dẫn tại
                  trang Hướng dẫn sử dụng của website evoshop hoặc tại các Video
                  hướng dẫn sử dụng từng thao tác. Công ty TNHH Evo Việt Nam có
                  thể sẽ không cung cấp cho người dùng evoshop bất kỳ hướng dẫn
                  sử dụng nào dưới dạng văn bản in ấn. Chúng tôi gửi kèm tài
                  liệu hướng dẫn sử dụng với email xác nhận tài khoản ngay sau
                  khi người dùng evoshop đăng ký thành công tài khoản bán hàng/
                  cửa hàng.
                </p>

                <h2>16. SỬ DỤNG KHU VỰC CHUNG</h2>

                <p>
                  người dùng evoshop hiểu và chấp nhận rằng Người dùng có quyền
                  quản lý, khai thác và sử dụng Khu vực chung trên website
                  evoshop theo quyết định và xem xét duy nhất của công ty TNHH
                  Evo Việt Nam, mọi yêu cầu của người dùng evoshop về sử dụng
                  Khu vực chung trên website evoshop cho mục đích riêng của
                  người dùng evoshop có thể được tính phí ngoài phí dịch vụ qui
                  định trong Hợp đồng.
                </p>

                <h2>17. SỬ DỤNG KHU VỰC RIÊNG</h2>

                <p>
                  người dùng evoshop có toàn quyền sử dụng Khu vực riêng được
                  bảo vệ bằng mật khẩu cho các hoạt động của mình. Công ty TNHH
                  Evo Việt Nam không can thiệp và không chịu trách nhiệm về mọi
                  thao tác của người dùng evoshop tác động lên dữ liệu và thông
                  tin trên Khu vực riêng. Mọi yêu cầu phát sinh trong việc sử
                  dụng Khu vực riêng không nằm trong cam kết ban đầu có thể được
                  tính phí ngoài phí dịch vụ qui định trong Hợp đồng.
                </p>

                <h2>18. TRUY CẬP KHU VỰC RIÊNG</h2>

                <p>
                  người dùng evoshop hiểu và chấp nhận rằng công ty TNHH Evo
                  Việt Nam có quyền truy cập khu vực riêng của người dùng
                  evoshop khi có các điều kiện sau:
                </p>

                <ul>
                  <li>
                    Được người dùng evoshop đồng ý nhằm mục đích hỗ trợ sử dụng,
                    xử lý sự cố
                  </li>
                  <li>
                    người dùng evoshop yêu cầu evoshop truy cập nhằm mục đích hỗ
                    trợ sử dụng, xử lý sự cố
                  </li>
                  <li>
                    Khi có yêu cầu của cơ quan nhà nước, Tòa án… theo quy định
                    của pháp luật
                  </li>
                  <li>
                    Trong tình huống khẩn cấp, nhằm ngăn chặn xâm nhập trái phép
                    hoặc tấn công phá hoại từ bên ngoài.
                  </li>
                </ul>

                <p>
                  người dùng evoshop hiểu và chấp nhận rằng người dùng evoshop
                  không có quyền yêu cầu truy cập khu vực riêng của công ty TNHH
                  Evo Việt Nam, khu vực riêng của người dùng evoshop khác, khu
                  vực quản trị Dịch vụ, Hệ thống và Quản trị website của
                  evoshop.
                </p>

                <h2>19. THÔNG TIN LIÊN LẠC</h2>

                <p>
                  Công ty TNHH Evo Việt Nam khuyến khích người dùng evoshop
                  liên hệ với Trung tâm Hỗ trợ khách hàng evoshop qua tổng đài
                  028 7300 5688 từ 8 giờ 30 sáng đến 17 giờ các ngày trong tuần
                  khi có nhu cầu hỗ trợ.
                </p>

                <p>
                  người dùng evoshop có thể dùng các phương tiện khác ở mục Liên
                  hệ trên website evoshop để gửi các yêu cầu cụ thể trong trường
                  hợp các kênh liên hệ qua tổng đài hoặc điện thoại không khả
                  dụng.
                </p>

                <p>
                  Thông tin Tài khoản quản trị sau khi đăng ký thành công Cửa
                  hàng bán hàng, các thông báo tự động từ hệ thống, xác nhận đổi
                  mật khẩu, quên mật khẩu được gửi đến người dùng evoshop từ hộp
                  thư điện tử support@Evo.vn. Mọi thông báo tự động từ các
                  nguồn khác đều không đáng tin cậy, trong trường hợp Người dùng
                  evoshop nhận được thư điện tử không đến từ nguồn trên, công ty
                  TNHH Evo Việt Nam khuyến nghị Người dùng evoshop liên hệ ngay
                  với Trung tâm hỗ trợ khách hàng để được hỗ trợ.
                </p>

                <p>
                  evoshop khuyến cáo người dùng evoshop chỉ gửi thông tin Dữ
                  liệu cửa hàng nhằm mục đích hỗ trợ, triển khai vào email
                  support@Evo.vn. evoshop không đảm bảo Dữ liệu cửa hàng của
                  người dùng evoshop được bảo mật nếu Người dùng evoshop gửi vào
                  địa chỉ thư điện tử khác địa chỉ thư điện tử nêu trong Điều
                  khoản sử dụng này hoặc gửi vào thư điện tử cá nhân của Nhân
                  viên, CTV, Đại lý của evoshop.
                </p>

                <h2>20. THƯƠNG HIỆU</h2>

                <p>
                  Thương hiệu evoshop, Logo evoshop… đã được đăng ký độc quyền
                  nhãn hiệu của công ty TNHH Evo Việt Nam tại Việt Nam. Công ty
                  TNHH Evo Việt Nam có quyền hợp pháp bổ sung, điều chỉnh danh
                  mục các thương hiệu, nhãn hiệu này tùy từng thời điểm. người
                  dùng evoshop không được đăng ký dù là cố ý hay vô ý bất kỳ
                  nhãn hiệu hoặc logo nào tương tự có thể gây hiểu lầm hoặc
                  trùng lặp với những nhãn hiệu và logo đã được đăng ký độc
                  quyền. người dùng evoshop phải tuân thủ tất cả tiêu chuẩn đề
                  ra của thương hiệu evoshop, logo evoshop và phải sử dụng theo
                  đúng quy định của evoshop.
                </p>

                <h2>21. ĐIỀU KHOẢN CHUNG</h2>

                <p>
                  Trường hợp có bất kỳ điều khoản nào của Điều khoản sử dụng này
                  hết hiệu lực hoặc không thể thi hành vì bất cứ lý do gì sẽ chỉ
                  ảnh hưởng đến điều khoản đã xác định hết hiệu lực đó và không
                  ảnh hưởng đến hiệu lực của các điều khoản còn lại. Nếu có sự
                  khác biệt giữa Điều khoản sử dụng này và các Thỏa thuận sử
                  dụng Dịch vụ thì quy định nào mới nhất sẽ có hiệu lực.
                </p>

                <p>
                  người dùng evoshop tự đảm bảo rằng thiết bị ở trong tình trạng
                  kết nối mạng khi cần truy cập dữ liệu kinh doanh mới nhất.
                </p>

                <h2>22. DỊCH VỤ LIÊN KẾT CỦA BÊN THỨ BA</h2>

                <p>
                  Dịch vụ liên kết là các dịch vụ gia tăng, có tính phí hoặc
                  không có tính phí dịch vụ bởi công ty TNHH Evo Việt Nam và
                  Bên thứ ba, được công ty TNHH Evo Việt Nam và Bên thứ ba hợp
                  tác để cung cấp cho người dùng của phần mềm evoshop. website
                  evoshop đã/đang và sẽ không ngừng mở rộng tính ưu việt của ứng
                  dụng, không loại trừ việc liên kết với các đơn vị cung cấp
                  dịch vụ của Bên thứ ba (các sàn thương mại điện tử, đơn vị vận
                  chuyển…)
                </p>

                <p>
                  người dùng evoshop hiểu và chấp nhận rằng việc người dùng
                  evoshop sử dụng Dịch vụ liên kết của Bên thứ ba nằm ngoài
                  những thỏa thuận giữa người dùng evoshop và công ty TNHH Evo
                  Việt Nam được quy định trong hợp đồng cung cấp Dịch vụ phần
                  mềm quản lý bán hàng evoshop; và người dùng evoshop sẽ tự chịu
                  mọi trách nhiệm liên quan đến việc sử dụng Dịch vụ liên kết do
                  các Bên thứ ba cung cấp.
                </p>

                <p>
                  Khi sử dụng Dịch vụ liên kết với Bên thứ ba, người dùng
                  evoshop cần hiểu và đồng ý các điều khoản sử dụng của Dịch vụ
                  liên kết và đồng ý chia sẻ các thông tin và dữ liệu cần thiết
                  để sử dụng Dịch vụ liên kết. Công ty TNHH Evo Việt Nam chỉ
                  chia sẻ các thông tin và dữ liệu đã được người dùng evoshop
                  đồng ý chia sẻ và cần thiết để Bên thứ ba có thể cung cấp Dịch
                  vụ liên kết. người dùng evoshop có thể tham khảo thêm trong
                  điều khoản sử dụng của Dịch vụ liên kết với Bên thứ ba về các
                  thông tin và dữ liệu được chia sẻ khi sử dụng Dịch vụ liên
                  kết.
                </p>

                <h2>23. TẠM NGỪNG, CHẤM DỨT CUNG CẤP DỊCH VỤ</h2>

                <p>
                  Công ty TNHH Evo Việt Nam có quyền tạm ngừng hoặc chấm dứt
                  hoàn toàn việc cung cấp dịch vụ mà không hoàn lại bất kỳ một
                  chi phí nào cho người dùng evoshop trong các trường hợp sau:
                </p>

                <ul>
                  <li>
                    người dùng evoshop sử dụng phần mềm trên website evoshop vào
                    bất kỳ mục đích/hình thức nào vi phạm pháp luật Việt Nam,
                    đặc biệt về vấn đề bản quyền phần mềm, nội dung…
                  </li>
                  <li>
                    người dùng evoshop gửi, tạo liên kết hoặc trung chuyển cho
                    các dữ liệu mang tính chất bất hợp pháp, đe dọa, lừa dối,
                    thù hằn, xuyên tạc, nói xấu, tục tĩu, khiêu dâm, xúc phạm…
                    hay các hình thức bị pháp luật Việt Nam ngăn cấm khác dưới
                    bất kỳ cách thức nào.
                  </li>
                  <li>
                    người dùng evoshop lưu trữ, truyền bá các dữ liệu nào mà cấu
                    thành hoặc khuyến khích các hình thức phạm tội bị pháp luật
                    Việt Nam ngăn cấm khác dưới bất kỳ cách thức nào.
                  </li>
                  <li>
                    người dùng evoshop lưu trữ, truyền bá các dữ liệu mang tính
                    vi phạm luật sở&nbsp;hữu trí tuệ (sáng chế, nhãn hiệu, quyền
                    thiết kế, bản quyền hay bất kỳ quyền…) hoặc xâm phạm các
                    quyền lợi của bất kỳ cá nhân nào.
                  </li>
                  <li>
                    người dùng evoshop sử dụng website để phá hoại một website
                    khác.
                  </li>
                  <li>
                    người dùng evoshop sử dụng các chương trình, hệ thống có khả
                    năng làm tắc nghẽn hoặc đình trệ hệ thống evoshop, như gây
                    cạn kiệt tài nguyên hệ thống, làm quá tải bộ vi xử lý và bộ
                    nhớ.
                  </li>
                  <li>
                    người dùng evoshop sử dụng website hoặc tài khoản của mình
                    để xâm nhập trái phép vào website khác hoặc gây ảnh hưởng
                    đến người dùng evoshop khác của{' '}
                    <a href="https://evoshop.vn">https://evoshop.vn</a>.
                  </li>
                  <li>
                    người dùng evoshop bị tấn công bởi bên thứ ba, làm ảnh hưởng
                    nghiêm trọng đến hệ thống của evoshop. Trường hợp bị tấn
                    công evoshop sẽ tạm ngừng website của người dùng evoshop
                    trong hệ thống, khoanh vùng xử lý và sẽ đưa vào hoạt động
                    bình thường sau khi khắc phục sự cố.
                  </li>
                  <li>
                    người dùng evoshop có những vi phạm khác mà các cơ quan nhà
                    nước có thẩm quyền yêu cầu đóng website.
                  </li>
                  <li>
                    người dùng evoshop không thanh toán các chi phí đúng hạn.
                  </li>
                  <li>
                    người dùng evoshop có hành vi làm ảnh hưởng đến uy tín và
                    thương hiệu của evoshop trên các phương tiện thông tin đại
                    chúng.
                  </li>
                  <li>
                    Trường hợp nêu tại Mục 7 của bản Điều khoản sử dụng này về
                    Sử dụng Hợp pháp.
                  </li>
                  <li>Trường hợp khác mà Pháp luật có quy định.</li>
                </ul>

                <h2>24. GIẢI QUYẾT CÁC THẮC MẮC, KHIẾU NẠI, TRANH CHẤP</h2>

                <p>
                  A) Phương thức tiếp nhận thông tin thắc mắc, khiếu nại, tranh
                  chấp
                </p>

                <p>
                  Mọi trường hợp đóng góp ý kiến, thắc mắc, khiếu nại nào liên
                  quan đến các tính năng phần mềm, nội dung website evoshop,
                  người dùng vui lòng gửi về Công ty TNHH Evo Việt Nam theo các
                  phương thức sau:
                </p>

                <ul>
                  <li>
                    <strong>Gửi thư điện tử tới địa chỉ</strong>:
                    support@Evo.vn
                  </li>
                  <li>
                    <strong>Tổng đài tư vấn và hỗ trợ</strong>: 1900 1511
                  </li>
                  <li>
                    <strong>Hoặc liên hệ trực tiếp</strong>: CÔNG TY TNHH
                    evoshop VIỆT NAM&nbsp;(Địa chỉ trụ sở: Lầu 3A, số 199 Điện
                    Biên Phủ, Phường 15, Quận Bình Thạnh, Thành Phố&nbsp;Hồ Chí
                    Minh, Việt Nam)
                  </li>
                </ul>

                <p>
                  Tùy thuộc vào tính chất phức tạp của nội dung khiếu nại, công
                  ty TNHH Evo Việt Nam sẽ có thời hạn xử lý tương ứng. Kết quả
                  giải quyết khiếu nại sẽ được thông báo trực tiếp, cụ thể tới
                  người dùng evoshop. Trường hợp cần thiết, công ty TNHH Evo
                  Việt Nam có thể mời người khiếu nại tới trụ sở làm việc trực
                  tiếp. Công ty TNHH Evo Việt Nam sẽ nỗ lực để luôn giải quyết
                  các khiếu nại của người dùng evoshop trong thời gian sớm nhất
                  và trên tinh thần thương lượng, hòa giải, tôn trọng, hai bên
                  cùng có lợi.
                </p>

                <p>
                  B) Trong quá trình sử dụng nếu xảy ra tranh chấp giữa người
                  dùng evoshop và công ty TNHH Evo Việt Nam, hai bên sẽ tiến
                  hành đàm phán hòa giải với tinh thần hữu nghị. Trong trường
                  hợp không giải quyết được bằng hòa giải sẽ đưa ra Toà án kinh
                  tế Thành phố Hồ Chí Minh giải quyết.
                </p>

                <p>
                  Mọi thắc mắc liên quan đến các nội dung trên, xin vui lòng
                  liên hệ:
                </p>

                <p>
                  <strong>Công ty TNHH Evo Việt Nam</strong>
                </p>

                <ul>
                  <li>
                    <strong>Địa chỉ</strong>: Lầu 3A, số 199 Điện Biên Phủ,
                    Phường 15, Quận Bình Thạnh, Thành Phố&nbsp;Hồ Chí Minh, Việt
                    Nam
                  </li>
                  <li>
                    <strong>Tổng đài tư vấn và hỗ trợ</strong>: 1900 1511
                  </li>
                  <li>
                    <strong>Địa chỉ thư điện tử</strong>:{' '}
                    <a href="mailto:support@Evo.vn">support@Evo.vn</a>
                  </li>
                </ul>

                <h2>25. HỦY DỊCH VỤ</h2>

                <p>
                  người dùng evoshop có thể hủy tài khoản của mình bất kỳ lúc
                  nào bằng việc gửi thư điện tử đến công ty TNHH Evo Việt Nam
                  tại địa chỉ support@Evo.vn và sau đó chúng tôi sẽ gửi đến
                  người dùng evoshop các hướng dẫn chi tiết liên quan đến yêu
                  cầu hủy dịch vụ.
                </p>

                <ul>
                  <li>
                    Một khi lệnh hủy được xác nhận, tất cả nội dung trên tài
                    khoản bán hàng của Người dùng sẽ bị xóa ngay lập tức.
                  </li>
                  <li>
                    Nếu Người dùng hủy Dịch vụ vào khoảng giữa của chu kỳ thanh
                    toán của, người dùng evoshop sẽ nhận được thông tin thông
                    báo thanh toán đầy đủ khoản phí chênh lệch qua hòm thư điện
                    tử.
                  </li>
                  <li>Những chi phí dư hiện tại chúng tôi không hoàn trả.</li>
                  <li>
                    Công ty TNHH Evo Việt Nam có quyền thay đổi hoặc hủy bỏ
                    Dịch vụ của evoshop dù bất kỳ lý do gì mà không cần phải
                    thông báo.
                  </li>
                  <li>
                    Mọi vấn đề về ăn gian đồng nghĩa với việc tài khoản của
                    người dùng evoshop sẽ bị xóa.
                  </li>
                </ul>

                <h2>26. SỬA ĐỔI DỊCH VỤ VÀ GIÁ CẢ</h2>

                <ul>
                  <li>
                    Chi phí cho việc sử dụng dịch vụ, tính năng, phần mềm của
                    công ty TNHH Evo Việt Nam nếu có thay đổi sẽ được thông báo
                    trước 30 ngày.
                  </li>
                  <li>
                    Công ty TNHH Evo Việt Nam có toàn quyền để thay đổi hoặc
                    ngừng cung cấp dịch vụ.
                  </li>
                  <li>
                    Công ty TNHH Evo Việt Nam không chịu trách nhiệm về người
                    dùng evoshop hoặc bất kỳ đối tác thứ ba nào khi họ thay đổi
                    về giá cả hay ngưng dịch vụ của chính họ.
                  </li>
                </ul>

                <h2>27. TÙY CHỌN CÔNG CỤ</h2>

                <p>
                  Công ty TNHH Evo Việt Nam có thể cung cấp cho Người dùng
                  quyền sử dụng các công cụ của đối tác thứ ba khác mà evoshop
                  đã kết nối với họ. người dùng evoshop phải hiểu và đồng ý rằng
                  công ty TNHH Evo Việt Nam cung cấp quyền sử dụng những công
                  ty này mà không phải bảo đảm bất kỳ điều gì, hay phải đại diện
                  cho đối tác đó. Công ty TNHH Evo Việt Nam không chịu bất kỳ
                  trách nhiệm nào liên quan đến đối tác thứ ba. Bất kỳ hành động
                  nào của người dùng evoshop đến công cụ của đối tác thứ ba sẽ
                  do người dùng evoshop chịu hoàn toàn trách nhiệm. Chúng tôi
                  khuyên các người dùng evoshop rằng hãy tìm hiểu thật kỹ trước
                  khi chính thức sử dụng để nắm chắc hơn khi sử dụng dịch vụ của
                  đối tác thứ ba.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Styled>
  )
}
const Styled = styled.div`
  h2,
  p,
  ul {
    margin-bottom: 24px;
  }
  h1 {
    text-align: center;
    margin-bottom: 36px;
  }
  ul {
    padding-left: 24px;
    list-style-type: disc !important;
  }
  ol {
    padding-left: 40px;
    margin-bottom: 24px;
  }
  .news_static {
    height: 100vh;
    overflow: auto;
  }

  .text-left{
    text-align: justify;
  }

  .policy-page {
    &__header {
      width: 100%;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      background: #ffffff;
      &-left {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #666666;
      }
    }
  }
`
