import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CallContext } from '~/Context/CallContext/CallContext';
import { MeetingContext } from '~/Context/MeetingContext';

const cx = classNames.bind(styles);

function CallGroup() {
    const { nav } = useContext(MeetingContext);
    const [soLuongUser] = useState(3); // Sửa: Thêm state hoặc logic cập nhật

    const {
        meetingId,
        setMeetingId,
        createMeeting,
        joinMeeting,
        leaveMeeting,
        videoContainerRef,
        getMediaStream,
        localStreamRef
    } = useContext(CallContext);

    // Hàm thêm video với cleanup
    const addVideo = useCallback(
        (peerId, stream, isLocal = false) => {
            const videoContainer = videoContainerRef.current;
            if (!videoContainer || document.getElementById(peerId)) return;

            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.muted = isLocal;
            video.style.objectFit = 'cover';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.transform = 'scaleX(-1)';
            video.id = peerId;
            video.className = cx('vuser', {
                hainguoi: soLuongUser === 2,
                motnguoi: soLuongUser === 1,
                trenhainguoi: soLuongUser > 2
            });

            videoContainer.appendChild(video);

            // Trả về hàm dọn dẹp
            return () => {
                if (video.parentNode) {
                    video.parentNode.removeChild(video);
                }
                stream.getTracks().forEach(track => track.stop());
            };
        },
        [videoContainerRef]
    );

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
                const cleanup = addVideo('you', stream, true);
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
