import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CallContext } from '~/Context/CallContext/CallContext';
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

    // Xử lý media stream với useCallback
    const handleGetMedia = useCallback(async () => {
        const stream = await getMediaStream();
        if (stream) {
            localStreamRef.current = stream;
            return stream;
        }
        return null;
    }, [getMediaStream, localStreamRef]);

    // Sửa useEffect đúng cách
    useEffect(() => {
        let cleanupVideo = () => {};

        const init = async () => {
            const stream = await handleGetMedia();
            if (stream) {
                const cleanup = addVideo(peerId, stream, true);
                if (cleanup) cleanupVideo = cleanup;
            }
        };

        init();

        // Cleanup khi unmount
        return () => {
            cleanupVideo();
            const videoContainer = videoContainerRef.current;
            if (videoContainer) {
                videoContainer.innerHTML = ''; // Xóa tất cả video
            }
        };
    }, [handleGetMedia, addVideo, videoContainerRef]);

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
