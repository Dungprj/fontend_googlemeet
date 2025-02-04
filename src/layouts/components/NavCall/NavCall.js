import classNames from 'classnames/bind';
import styles from './NavCall.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import React, { useContext, useState } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
import Tab from '~/enums';

import {
    faMicrophone,
    faMicrophoneSlash,
    faVideo,
    faVideoSlash,
    faEllipsisVertical,
    faPhoneSlash,
    faCircleInfo,
    faMessage,
    faUserGroup
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function NavCall() {
    // Truy xuất dữ liệu từ MeetingContext
    const { nav, toggleTab, toggleTabPanel } = useContext(MeetingContext);
    const [time, setTime] = useState('16:09 | imf-iqgz-zpj');
    const [inCall, setInCall] = useState(true);
    const [isMic, setIsMic] = useState(false);
    const [isCam, setIsCam] = useState(false);

    console.log(time);
    const handleTabDetail = () => {
        toggleTab(Tab.Detail);
    };
    const handleTabMessage = () => {
        toggleTab(Tab.Message);
    };

    const handleTabEveryone = () => {
        toggleTab(Tab.ListUser);
    };

    const toggleMic = () => {
        setIsMic(!isMic);
    };
    const toggleCam = () => {
        setIsCam(!isCam);
    };

    const leaveCall = () => {
        setInCall(prev => {
            alert('Leave');
            return false;
        });
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
                    <Button
                        outlinever1
                        className={cx('btnMic')}
                        onClick={toggleMic}
                    >
                        {isMic ? (
                            <FontAwesomeIcon
                                icon={faMicrophone}
                            ></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon
                                icon={faMicrophoneSlash}
                            ></FontAwesomeIcon>
                        )}
                    </Button>
                    <Button
                        outlinever1
                        className={cx('btnCam')}
                        onClick={toggleCam}
                    >
                        {isCam ? (
                            <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon
                                icon={faVideoSlash}
                            ></FontAwesomeIcon>
                        )}
                    </Button>

                    <Button outlinever1 className={cx('btnSetting')}>
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                        ></FontAwesomeIcon>
                    </Button>
                    <Button
                        outlinever1
                        className={cx('btnLeave')}
                        onClick={leaveCall}
                    >
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
                    <Button outlinever1 className={cx('btnEveryone')}>
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            onClick={handleTabEveryone}
                        ></FontAwesomeIcon>
                    </Button>
                    <Button
                        outlinever1
                        className={cx('btnMessage')}
                        onClick={handleTabMessage}
                    >
                        <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NavCall;
