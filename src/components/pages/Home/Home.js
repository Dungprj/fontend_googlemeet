import React, { useEffect, useState, useRef } from 'react';
import Video from '~/components/Video'; // Import Video component
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { GetVideos } from '~/Services/UserService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);
    const [playingIndex, setPlayingIndex] = useState(null); // Trạng thái lưu index của video đang phát
    const playersRef = useRef([]); // Mảng refs để tham chiếu đến các video
    const [offset, setOffset] = useState(0); // Trạng thái dịch chuyển
    const touchStartRef = useRef(0); // Lưu vị trí touch start để xác định vuốt lên hay xuống

    const handleGetVideo = async () => {
        let res = await GetVideos();
        if (res) {
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

    // Hàm kiểm tra xem video có nằm trong viewport không
    const handleIntersect = (isIntersecting, videoElement) => {
        const index = videoElement.dataset.index;
        if (isIntersecting) {
            // Nếu video vào viewport, phát video
            if (playingIndex !== index) {
                handlePlayVideo(index);
            }
        } else {
            // Nếu video ra khỏi viewport, dừng video
            if (playingIndex === index) {
                handlePauseVideo(index);
            }
        }
    };

    // Hàm xử lý khi vuốt lên hoặc vuốt xuống
    const handleTouchStart = e => {
        touchStartRef.current = e.touches[0].clientY; // Lưu vị trí touch start
    };

    const handleTouchMove = e => {
        const touchEnd = e.touches[0].clientY; // Vị trí touch khi di chuyển
        const diff = touchStartRef.current - touchEnd; // Tính toán sự thay đổi giữa start và move

        if (Math.abs(diff) > 30) {
            // Chỉ thực hiện khi sự thay đổi đủ lớn (30px)
            if (diff > 0) {
                // Vuốt lên
                setOffset(prev => prev - 680); // Dịch chuyển lên 680px
            } else {
                // Vuốt xuống
                setOffset(prev => prev + 680); // Dịch chuyển xuống 680px
            }
            touchStartRef.current = touchEnd; // Cập nhật lại vị trí start sau mỗi lần di chuyển
        }
    };

    const handleTouchEnd = () => {
        // Xử lý khi kết thúc vuốt (có thể làm gì đó nếu cần)
    };

    useEffect(() => {
        // Lấy dữ liệu video từ API
        handleGetVideo();
    }, []);

    return (
        <div
            className={cx('home-container')}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Hiển thị danh sách video */}
            <div className={cx('wrap-video')}>
                <div
                    className={cx('video-list')}
                    style={{
                        transform: `translateY(${offset}px)`, // Dịch chuyển div
                        transition: 'transform 0.3s ease' // Hiệu ứng mượt mà
                    }}
                >
                    {videos.map((item, index) => (
                        <div key={item.id} onClick={() => handleVideo(index)}>
                            <Video
                                ref={el => (playersRef.current[index] = el)} // Gán ref vào mảng refs
                                src={`${process.env.REACT_APP_BASE_URL_AUTHEN}${item?.filePath}`}
                                title={item?.title}
                                description={item?.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
