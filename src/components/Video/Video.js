import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { UserContext } from '~/Context/UserContext';

import images from '~/assets/images';

import { forwardRef } from 'react';

const cx = classNames.bind(styles);
const Video = (props, ref) => {
    const videoRef = useRef(null);

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
        [props.className]: props.className
    });

    const handleUrlIFrame = src => {
        let srcSplit = src.split('id=');

        return srcSplit[1];
    };

    return (
        <div className={cx('video-container')}>
            {/* Dùng cho phiên bản lưu video ở máy chủ */}

            {typeof props.src === 'string' &&
            props.src.includes('https://drive.google.com') ? (
                <iframe
                    className={classes}
                    ref={videoRef}
                    src={`https://drive.google.com/file/d/${handleUrlIFrame(
                        props.src
                    )}/preview`}
                    width='100%'
                    height='100%'

                    // allow='autoplay'
                ></iframe>
            ) : (
                <video
                    className={classes}
                    ref={videoRef}
                    src={`${props.src}`}
                    loop
                    controls={props.controls}
                    // poster={props.poster ? props.poster : images.noImage}
                />
            )}
        </div>
    );
};

export default forwardRef(Video);
