import cls from 'clsx'
import css from './index.module.scss'

const Index = () => {
    return (
        <div className={cls(css.content)}>
            <div className={cls(css.logo)}>
                <img src={'/img/mobile/logo_upos.png'} alt={'logo'}/>
            </div>
            <p className={cls(css.title)}>NỀN TẢNG QUẢN LÝ BÁN HÀNG</p>
            <p className={cls(css.subtitle)}>Vui lòng truy cập ứng dụng để có trải nghiệm tốt nhất</p>
            <div className={cls(css.app_wapper)}>
                <div className={cls(css.app)}>
                    <a href={'https://apps.apple.com/vn/app/evoshop/id1670583952'} target='_blank'>
                        <img src={'/img/mobile/app_store.png'} alt={'app-store'}/>
                    </a>
                </div>
                <div className={cls(css.app)}>
                    <a href={'https://play.google.com/store/apps/details?id=evoshop.vn'} target='_blank'>
                        <img src={'/img/mobile/google_play.png'} alt={'google-play'}/>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Index;