import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CallContext } from '~/Context/CallContext/CallContextfix';
import { MeetingContext } from '~/Context/MeetingContext';

const cx = classNames.bind(styles);

function CallGroup() {
    const { nav } = useContext(MeetingContext);
    const [soLuongUser] = useState(5); // Sửa: Thêm state hoặc logic cập nhật

    const {
        peerId,
        meetingId,
        setMeetingId,
        createMeeting,
        joinMeeting,
        leaveMeeting,
        videoContainerRef,
        getMediaStream,
        localStreamRef,
        addVideo
    } = useContext(CallContext);

    const handleGetMediaStream = async () => {
        try {
            const stream = await getMediaStream();
            localStreamRef.current = stream;
            addVideo(peerId, stream, true);
        } catch (error) {
            console.error('❌ Không thể truy cập camera/mic:', error);
        }
    };

    useEffect(() => {
        handleGetMediaStream();
    });

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
