import classNames from 'classnames/bind';
import styles from './NavCall.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import React, { useContext, useState } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
import Tab from '~/enums';

import {
    faMicrophone,
    faVideo,
    faPhoneSlash,
    faCircleInfo,
    faMessage
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function NavCall() {
    // Truy xuất dữ liệu từ MeetingContext
    const { nav, toggleTab, toggleTabPanel } = useContext(MeetingContext);
    const [time, setTime] = useState('16:09 | imf-iqgz-zpj');

    console.log(time);
    const handleTabDetail = () => {
        toggleTab(Tab.Detail);
    };
    const handleTabMessage = () => {
        toggleTab(Tab.Message);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('nav-left')}>
                    <div className={cx('nav-left_detail')}>
                        <span className={cx('detail')}>{time}</span>
                    </div>
                </div>
                <div className={cx('nav-center')}>
                    <Button outlinever1 className={cx('btnMic')}>
                        <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
                    </Button>
                    <Button outlinever1 className={cx('btnCam')}>
                        <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                    </Button>
                    <Button outlinever1 className={cx('btnLeave')}>
                        <FontAwesomeIcon icon={faPhoneSlash}></FontAwesomeIcon>
                    </Button>
                </div>
                <div className={cx('nav-right')}>
                    <Button
                        outlinever1
                        className={cx('btnInfo')}
                        onClick={handleTabDetail}
                    >
                        <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
                    </Button>
                    <Button
                        outlinever1
                        className={cx('btnMessage')}
                        onClick={handleTabDetail}
                    >
                        <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NavCall;
