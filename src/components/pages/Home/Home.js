import React, { useEffect, useState, useRef } from 'react';
import Video from '~/components/Video';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { GetVideos } from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);
    const [playingIndex, setPlayingIndex] = useState(null);
    const playersRef = useRef([]);
    const [offset, setOffset] = useState(0);
    const touchStartRef = useRef(0);
    const [offsetMax, setOffsetMax] = useState(0);

    const OFFSET = 650;
    const handleGetVideo = async () => {
        let res = await GetVideos();
        if (res) {
            setOffsetMax(res.length * OFFSET - OFFSET);
            setVideos(res);
        } else {
            toast.error('Get videos fail');
        }
    };

    const handlePlayVideo = index => {
        if (playingIndex === null) {
            playersRef.current[index].play();
            setPlayingIndex(index);
        } else {
            if (playingIndex === index) {
                playersRef.current[index].play();
                setPlayingIndex(index);
            } else {
                playersRef.current[index].play();
                playersRef.current[playingIndex].pause();
                setPlayingIndex(index);
            }
        }
    };

    const handlePauseVideo = index => {
        playersRef.current[index].pause();
    };

    const handleVideo = index => {
        const status = playersRef.current[index].isPlay();
        if (status) {
            handlePauseVideo(index);
        } else {
            handlePlayVideo(index);
        }
    };

    const handleIntersect = (isIntersecting, videoElement) => {
        const index = videoElement.dataset.index;
        if (isIntersecting) {
            if (playingIndex !== index) {
                handlePlayVideo(index);
            }
        } else {
            if (playingIndex === index) {
                handlePauseVideo(index);
            }
        }
    };

    const handleTouchStart = e => {
        touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = e => {
        const touchEnd = e.touches[0].clientY;
        const diff = touchStartRef.current - touchEnd;

        if (Math.abs(diff) > 30) {
            if (diff > 0 && offset > -offsetMax) {
                setOffset(prev => prev - OFFSET);
            } else if (diff < 0 && offset < 0) {
                setOffset(prev => prev + OFFSET);
            }

            touchStartRef.current = touchEnd;
        }
    };

    const handleTouchEnd = () => {};

    const scrollUp = () => {
        if (offset < 0) setOffset(prev => prev + OFFSET);
    };

    const scrollDown = () => {
        if (offset > -offsetMax) setOffset(prev => prev - OFFSET);
    };

    useEffect(() => {
        handleGetVideo();
    }, []);

    return (
        <div
            className={cx('home-container')}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className={cx('wrap-video')}>
                <div
                    className={cx('video-list')}
                    style={{
                        transform: `translateY(${offset}px)`,
                        transition: 'transform 0.3s ease'
                    }}
                >
                    {videos.map((item, index) => (
                        <div key={item.id} onClick={() => handleVideo(index)}>
                            <Video
                                ref={el => (playersRef.current[index] = el)}
                                src={`${process.env.REACT_APP_BASE_URL_AUTHEN}${item?.filePath}`}
                                title={item?.title}
                                description={item?.description}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Nút lướt lên và xuống */}
            <div className={cx('scroll-buttons')}>
                <button className={cx('scroll-up')} onClick={scrollUp}>
                    ↑
                </button>
                <button className={cx('scroll-down')} onClick={scrollDown}>
                    ↓
                </button>
            </div>
        </div>
    );
}

export default Home;
