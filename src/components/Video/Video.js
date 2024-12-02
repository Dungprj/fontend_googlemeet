import React, { useState, useRef, useImperativeHandle } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { UserContext } from '~/Context/UserContext';

import { forwardRef } from 'react';

const cx = classNames.bind(styles);
const Video = (props, ref) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Quản lý trạng thái Play/Pause
    const [isMuted, setIsMuted] = useState(false); // Quản lý trạng thái Mute/Unmute
    const videoRef = useRef(null);
    const { user, PlayVideo, PlauseVideo } = React.useContext(UserContext);

    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play();
        },
        pause() {
            videoRef.current.pause();
        }
    }));

    // Hàm thay đổi trạng thái Like
    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    // Hàm điều khiển Play/Pause video
    const togglePlayPause = e => {
        setIsPlaying(!isPlaying);
    };

    // Hàm điều khiển Mute/Unmute âm thanh
    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className='video-container'>
            {/* <div className='video-header'>
                <h3>{userName}</h3>
            </div> */}

            <div
                className={cx('video-wrap-player')}
                onClick={() => {
                    togglePlayPause();
                }}
            >
                <video
                    className={cx('videoItem')}
                    ref={videoRef}
                    src={props.src}
                    playing={isPlaying}
                    loop
                    muted={isMuted}
                    controls={true}
                    width='100%'
                    height='100%'
                />
            </div>

            <div className='video-actions'>
                {/* Like/Dislike */}
                <div className='like-container' onClick={toggleLike}>
                    <i className={`heart-icon ${isLiked ? 'liked' : ''}`}>
                        &#9829;
                    </i>
                    {/* <span>{isLiked ? likes + 1 : likes}</span> */}
                </div>

                {/* Comments */}
                {/* <div className='comments-container'>
                    <span>{comments.length} Comments</span>
                </div> */}
            </div>

            <div className='video-description'>
                <p>{props.description}</p>
            </div>

            {/* <div className='video-footer'>
                <button onClick={toggleMute}>
                    {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button onClick={handleScroll}>Scroll Video</button>
            </div> */}
        </div>
    );
};

export default forwardRef(Video);
