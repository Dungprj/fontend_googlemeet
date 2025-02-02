import classNames from 'classnames/bind';
import styles from './Intro.module.scss';
import Button from '~/components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const cx = classNames.bind(styles);
function Intro() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content-left')}>
                        <div className={cx('content-left_title')}>
                            <h1>
                                Tính năng gọi và họp video <br /> dành cho tất
                                cả mọi người
                            </h1>
                            <p>
                                Kết nối, cộng tác và ăn mừng ở mọi nơi với
                                <br />
                                Google Meet
                            </p>
                        </div>
                        <div className={cx('content-left_btn')}>
                            <Button primary>Cuộc họp mới</Button>
                            <input placeholder='Nhập một mã hoặc đường link' />
                            <Button outline>Tham gia</Button>
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('content-right_carousel')}>
                            <div
                                id='carouselExampleCaptions'
                                className='carousel slide'
                            >
                                <div className='carousel-indicators'>
                                    <button
                                        type='button'
                                        data-bs-target='#carouselExampleCaptions'
                                        data-bs-slide-to='0'
                                        className='active'
                                        aria-current='true'
                                        aria-label='Slide 1'
                                    ></button>
                                    <button
                                        type='button'
                                        data-bs-target='#carouselExampleCaptions'
                                        data-bs-slide-to='1'
                                        aria-label='Slide 2'
                                    ></button>
                                    <button
                                        type='button'
                                        data-bs-target='#carouselExampleCaptions'
                                        data-bs-slide-to='2'
                                        aria-label='Slide 3'
                                    ></button>
                                </div>
                                <div className='carousel-inner'>
                                    <div className='carousel-item'>
                                        <img
                                            src='https://www.gstatic.com/meet/premium_carousel_01_c90aec4dbb8bb21d1e18c468ad080c97.gif'
                                            className='d-block w-100'
                                            alt='Slide 1'
                                        />
                                    </div>
                                    <div className='carousel-item active'>
                                        <img
                                            src='https://www.gstatic.com/meet/premium_carousel_02_174e55774263506d1280ce6552233189.gif'
                                            className='d-block w-100'
                                            alt='Slide 2'
                                        />
                                    </div>
                                    <div className='carousel-item'>
                                        <img
                                            src='https://www.gstatic.com/meet/premium_carousel_03_4f42ed34b9d0637ce38be87ecd8d1ca0.gif'
                                            className='d-block w-100'
                                            alt='Slide 3'
                                        />
                                    </div>
                                </div>
                                <button
                                    className='carousel-control-prev'
                                    type='button'
                                    data-bs-target='#carouselExampleCaptions'
                                    data-bs-slide='prev'
                                    style={{ filter: 'invert(100%)' }}
                                >
                                    <span
                                        className='carousel-control-prev-icon'
                                        aria-hidden='true'
                                    ></span>
                                    <span className='visually-hidden'>
                                        Previous
                                    </span>
                                </button>
                                <button
                                    className={cx('carousel-control-next')}
                                    type='button'
                                    data-bs-target='#carouselExampleCaptions'
                                    data-bs-slide='next'
                                    style={{ filter: 'invert(100%)' }}
                                >
                                    <span
                                        className='carousel-control-next-icon'
                                        aria-hidden='true'
                                    ></span>
                                    <span className={cx('visually-hidden')}>
                                        Next
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <Button primary>Trải nghiệm ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Intro;
