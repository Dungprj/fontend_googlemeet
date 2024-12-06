import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { UserContext } from '~/Context/UserContext';

import images from '~/assets/images';

import { forwardRef } from 'react';

const cx = classNames.bind(styles);
const Video = (props, ref) => {
    const videoRef = useRef(null);
    const { user, PlayVideo, PlauseVideo, className } =
        React.useContext(UserContext);

    useImperativeHandle(ref, () => ({
        play() {
            return videoRef.current?.play();
        },
        pause() {
            return videoRef.current?.pause();
        },
        isPlay() {
            return !videoRef.current?.paused;
        }
    }));

    const classes = cx('videoItem', {
        [className]: className
    });

    return (
        <div className={cx('video-container')}>
            {/* Dùng cho phiên bản lưu video ở máy chủ */}
            {/* <video
                className={classes}
                ref={videoRef}
                src={props.src}
                loop
                controls={props.controls}
                // poster={props.poster ? props.poster : images.noImage}
            /> */}

            {
                <iframe
                    className={classes}
                    ref={videoRef}
                    src={props.src}
                    width='100%'
                    height='100%'

                    // allow='autoplay'
                ></iframe>
            }
        </div>
    );
};

export default forwardRef(Video);
