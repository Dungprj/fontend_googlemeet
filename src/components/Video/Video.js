import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { UserContext } from '~/Context/UserContext';

import { forwardRef } from 'react';

const cx = classNames.bind(styles);
const Video = (props, ref) => {
    const videoRef = useRef(null);
    const { user, PlayVideo, PlauseVideo } = React.useContext(UserContext);

    useImperativeHandle(ref, () => ({
        play() {
            return videoRef.current.play();
        },
        pause() {
            return videoRef.current.pause();
        },
        isPlay() {
            return !videoRef.current.paused;
        }
    }));

    return (
        <div className='video-container'>
            <div className={cx('video-wrap-player')}>
                <video
                    className={cx('videoItem')}
                    ref={videoRef}
                    src={props.src}
                    loop
                    controls={false}
                    width='100%'
                    height='100%'
                />
            </div>
        </div>
    );
};

export default forwardRef(Video);
