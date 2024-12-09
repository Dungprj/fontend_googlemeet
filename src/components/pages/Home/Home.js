import React, { useEffect, useState, useRef } from 'react';
import Video from '~/components/Video';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { GetVideos, testAuthor, Renewtoken } from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);
    const [playingIndex, setPlayingIndex] = useState(null);
    const playersRef = useRef([]);
    const [offset, setOffset] = useState(0);
    const touchStartRef = useRef(0);
    const [offsetMax, setOffsetMax] = useState(0);

    const refListVideo = useRef();
    const viewportHeight = window.innerHeight; // Chiều cao của viewport
    const MAX_FILE_SIZE = parseInt(process.env.REACT_APP_MAX_FILE_SIZE, 10);

    const ref_BTNUP = useRef();
    const ref_BTNDOWN = useRef();

    const OFFSET = viewportHeight;
    const handleGetVideo = async () => {
        let res = await GetVideos();

        if (res) {
            setVideos(res.data);

            const maxOFFSET = res.data.length * OFFSET - OFFSET;

            setOffsetMax(maxOFFSET);
        } else {
            toast.error('Get videos fail');
        }
    };

    const handlePlayVideo = index => {
        if (playingIndex === null) {
            playersRef.current[index]?.play();
            setPlayingIndex(index);
        } else {
            if (playingIndex === index) {
                playersRef.current[index]?.play();
                setPlayingIndex(index);
            } else {
                playersRef.current[index]?.play();
                playersRef.current[playingIndex]?.pause();
                setPlayingIndex(index);
            }
        }
    };

    const handlePauseVideo = index => {
        playersRef.current[index]?.pause();
    };

    const handleVideo = index => {
        const status = playersRef.current[index]?.isPlay();
        if (status) {
            handlePauseVideo(index);
        } else {
            handlePlayVideo(index);
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
        if (offset < 0) {
            setOffset(prev => prev + OFFSET);
        }
        return;
    };

    const scrollDown = () => {
        if (offset > -offsetMax) {
            setOffset(prev => prev - OFFSET);
        }
        return;
    };
    // Lắng nghe sự kiện bàn phím
    const handleKeyDown = e => {
        e.preventDefault();

        if (e.keyCode === 38) {
            e.preventDefault();
            ref_BTNUP.current.click();
        } else if (e.keyCode === 40) {
            e.preventDefault();

            ref_BTNDOWN.current.click();
        }
    };

    useEffect(() => {
        // Lắng nghe sự kiện bàn phím khi component mounted
        window.addEventListener('keydown', handleKeyDown);
        handleGetVideo();

        console.log('gia tri offsetmax la ', offsetMax);

        // Cleanup khi component unmount
        return () => {
            console.log('unmounting khi component');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className={cx('home-container')}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={e => {
                e.preventDefault();
            }}
        >
            <div className={cx('wrap-video')}>
                <div
                    ref={refListVideo}
                    className={cx('video-list')}
                    style={{
                        transform: `translateY(${offset}px)`,
                        transition: 'transform 0.3s ease'
                    }}
                >
                    {videos.map((item, index) => (
                        <div key={item.id} onClick={() => handleVideo(index)}>
                            <div className={cx('video-wrap-player')}>
                                <Video
                                    className={cx('videoItem')}
                                    ref={el => (playersRef.current[index] = el)}
                                    src={`${process.env.REACT_APP_BASE_URL_AUTHEN}${item.filePath}`}
                                    title={item?.title}
                                    description={item?.description}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nút lướt lên và xuống */}
            <div className={cx('scroll-buttons')}>
                <button
                    ref={ref_BTNUP}
                    className={cx('scroll-up')}
                    onClick={scrollUp}
                >
                    ↑
                </button>
                <button
                    ref={ref_BTNDOWN}
                    className={cx('scroll-down')}
                    onClick={scrollDown}
                >
                    ↓
                </button>
            </div>
        </div>
    );
}

export default Home;
