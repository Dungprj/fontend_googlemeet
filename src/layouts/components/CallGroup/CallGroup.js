import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';

import React, { useContext, useState, useEffect } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
import { CallContext } from '~/Context/CallContext/CallContext';

const cx = classNames.bind(styles);

function CallGroup() {
    const { nav } = useContext(MeetingContext);
    const [soLuongUser, setSoLuongUser] = useState(1);
    const {
        peerId,
        meetingId,
        setMeetingId,
        createMeeting,
        joinMeeting,
        leaveMeeting,
        videoContainerRef,
        localStreamRef
    } = useContext(CallContext);
    const classes = cx({
        hainguoi: soLuongUser == 2,
        motnguoi: soLuongUser == 1,
        trenhainguoi: soLuongUser > 2
    });

    // Hàm thêm video vào giao diện
    const addVideo = (peerId, stream, isLocal = false) => {
        const videoContainer = videoContainerRef.current;
        if (!videoContainer || document.getElementById(peerId)) return;

        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.muted = isLocal; // Tắt mic cho video của chính mình
        video.style.objectFit = 'cover';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.transform = 'scaleX(-1)';

        video.id = peerId;
        video.className = cx('vuser', classes);
        videoContainer.appendChild(video);
    };
    useEffect(() => {
        if (localStreamRef.current) {
            addVideo('you', localStreamRef.current, true);
        }
    }, [localStreamRef.current]);
    return (
        <div className={cx('wrapper', { close: !nav.TabPanel })}>
            <div
                ref={videoContainerRef}
                id='videoContainer'
                className={cx(
                    'listVideo',
                    { maxVideo: !nav.TabPanel },
                    { miniVideo: nav.TabPanel }
                )}
            ></div>
        </div>
    );
}

export default CallGroup;
