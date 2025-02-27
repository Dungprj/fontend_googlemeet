import classNames from 'classnames/bind';
import styles from './Intro.module.scss';
import Button from '~/components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Menu from '~/components/Popper/Menu';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { CallContext } from '~/Context/CallContext/CallContextfix';
import {
    faLink,
    faPlus,
    faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
const cx = classNames.bind(styles);

function Intro() {
    const navigate = useNavigate();
    const {
        peerId,
        meetingId,
        setMeetingId,
        createMeeting,
        joinMeeting,
        leaveMeeting,
        videoContainerRef,
        getMediaStream,
        localStreamRef
    } = useContext(CallContext);

    const [inpMeetingId, setInpMeetingId] = useState();

    const handleTypingMeetingId = e => {
        setInpMeetingId(e);
        setMeetingId(e);
    };

    const handleCreateMeeting = async () => {
        if (inpMeetingId) {
            alert('tao phong ', inpMeetingId);
            await createMeeting(inpMeetingId);
        }
    };

    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>,
            title: 'Tạo một cuộc họp để sử dụng sau'
        },
        {
            icon: <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>,
            title: 'Bắt đầu một cuộc họp tức thì',
            to: config.routes.call
        },
        {
            icon: <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>,
            title: 'Create'
        }
    ];

    const handleJoinMeeting = async () => {
        await joinMeeting(meetingId);
        navigate(config.routes.call);
    };

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
                            <Menu items={MENU_ITEMS}>
                                <Button primary>Cuộc họp mới</Button>
                            </Menu>

                            <input
                                value={inpMeetingId}
                                className={cx('inpJoin')}
                                placeholder='Nhập một mã hoặc đường link'
                                onChange={e =>
                                    handleTypingMeetingId(e.target.value)
                                }
                            />
                            <Button outline onClick={handleJoinMeeting}>
                                Tham gia
                            </Button>
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
