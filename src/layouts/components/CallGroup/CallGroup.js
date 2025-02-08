import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { CallContext } from '~/Context/CallContext/CallContextfix';
import { MeetingContext } from '~/Context/MeetingContext';

const cx = classNames.bind(styles);

function CallGroup() {
    const { nav } = useContext(MeetingContext);

    const {
        peerId,
        meetingId,
        setMeetingId,
        createMeeting,
        joinMeeting,
        leaveMeeting,
        videoRefs,
        callParticipants,
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
        if (!localStreamRef.current) {
            handleGetMediaStream();
        }
    }, [callParticipants]);

    return (
        <div className={cx('wrapper', { close: !nav.TabPanel })}>
            <div
                ref={videoContainerRef}
                id='draggable'
                className={cx(
                    'listVideo',
                    'ui-widget-content',
                    { maxVideo: !nav.TabPanel },
                    { miniVideo: nav.TabPanel }
                )}
            >
                {
                    // <iframe
                    //     className={cx('vuser')}
                    //     width={'100%'}
                    //     height={'auto'}
                    //     src='https://www.youtube.com/embed/PRQq54KKtFY?si=DJy85dvO3o3Mhn4k'
                    //     title='YouTube video player'
                    //     frameborder='0'
                    //     allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    //     referrerpolicy='strict-origin-when-cross-origin'
                    //     allowfullscreen
                    // ></iframe>
                }
            </div>
        </div>
    );
}

export default CallGroup;
