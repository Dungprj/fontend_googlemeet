import React, { useEffect, useState, useRef } from 'react';
import Video from '~/components/Video'; // Import Video component
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { GetVideos } from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState();
    const [playingIndex, setPlayingIndex] = useState(null); // Trạng thái lưu index của video đang phát
    const playersRef = useRef([]); // Mảng refs để tham chiếu đến các video
    const videoRef = useRef();
    const handleGetVideo = async () => {
        let res = await GetVideos();
        console.log(res[0]);
        if (res) {
            setVideos(res[0]);
        } else {
            toast.error('Get videos fail');
        }
    };

    const handlePlayVideo = () => {
        videoRef.current.play();
    };
    const handlePauseVideo = () => {
        videoRef.current.pause();
    };

    useEffect(() => {
        console.log('refff', videoRef.current);
        handleGetVideo();
    }, []);

    // Hàm để điều khiển việc phát hoặc dừng video
    const handleVideoClick = index => {
        setPlayingIndex(index); // Cập nhật index của video đang phát

        // Dừng video khác nếu có
        if (playersRef.current[playingIndex]) {
            playersRef.current[playingIndex].pause();

            console.log('dung video ', playingIndex);
        }

        // Phát video hiện tại
        if (playersRef.current[index]) {
            playersRef.current[index].play();
            console.log(' chay video ', index);
        }
    };

    return (
        <div className={cx('home-container')}>
            {/* Hiển thị danh sách video */}
            <div className={cx('wrap-video')}>
                <div className={cx('video-list')}>
                    <div className={cx('video-item')}>
                        <Video
                            ref={videoRef}
                            src={`${process.env.REACT_APP_BASE_URL_AUTHEN}${videos?.filePath}`}
                            title={videos?.title}
                            description={videos?.description}
                        />
                    </div>

                    <div>
                        <button onClick={handlePlayVideo}>play</button>
                        <br />
                        <button onClick={handlePauseVideo}>pause</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
