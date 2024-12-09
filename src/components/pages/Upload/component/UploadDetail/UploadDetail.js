import classNames from 'classnames/bind';
import styles from './UploadDetail.module.scss';
import { useLocation } from 'react-router-dom';

import Image from '~/components/Image';
import Button from '~/components/Button';

import Video from '~/components/Video';
import { useEffect, useRef, useState } from 'react';
import userEvent from '@testing-library/user-event';

import { toast } from 'react-toastify';
import { Upload as UploadApi } from '~/Services/UserService';

const cx = classNames.bind(styles);
function UploadDetail() {
    const location = useLocation();
    const { file } = location.state || {};
    const [videoSrc, setVideoSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const ref = useRef();
    const [thumbnail, setThumbnail] = useState(null); // Thumnail image

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const MAX_FILE_SIZE = parseInt(process.env.REACT_APP_MAX_FILE_SIZE, 10);

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a video file first!');

            return;
        }

        setIsUploading(true);

        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('file', file);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setUploadProgress(progress); // Cập nhật tiến trình với độ trễ
                }
            };

            const response = await UploadApi(formData, config); // Gọi API upload

            console.log('response upload tra ve ', response);

            if (response && response.statuscode) {
                toast.success('Upload thành công!');
            } else {
                toast.error('lỗi khi tải file');
            }
            // Xử lý kết quả sau khi upload thành công
            setIsUploading(false);
            setUploadProgress(100);
        } catch (err) {
            console.error('Error during upload:', err);
            toast.error('Upload failed. Please try again.');
            setIsUploading(false);
        }
    };

    const handleClickVideo = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            ref.current.pause();
        } else {
            ref.current.play();
        }
    };

    const handleSetTitle = e => {
        setTitle(e);
    };

    const handleSetDescription = e => {
        setDescription(e);
    };

    useEffect(() => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const reader = new FileReader();

        // const generateThumbnail = videoFile => {
        //     reader.onload = () => {
        //         video.src = reader.result;
        //         video.onloadeddata = () => {
        //             video.currentTime = 2;
        //         };

        //         video.onseeked = () => {
        //             canvas.width = video.videoWidth;
        //             canvas.height = video.videoHeight;
        //             context.drawImage(video, 0, 0, canvas.width, canvas.height);

        //             const dataUrl = canvas.toDataURL('image/jpeg');
        //             setThumbnail(dataUrl); // Lưu thumbnail vào state
        //         };
        //     };
        //     reader.readAsDataURL(videoFile);
        // };

        if (file) {
            // generateThumbnail(file);

            //kiểm tra xem có vượt quá kích thước cho phép ko
            // Kiểm tra kích thước file
            if (file.size > MAX_FILE_SIZE) {
                const size_mb = MAX_FILE_SIZE / 1024 / 1024;
                toast.error(`File size exceeds the ${size_mb}MB limit!`);
                return;
            }

            // Kiểm tra xem file có phải là video .mp4 không
            if (file.type === 'video/mp4') {
                // Tạo URL tạm thời cho video từ file
                const videoURL = URL.createObjectURL(file);

                setVideoSrc(videoURL);

                return () => {
                    URL.revokeObjectURL(videoURL); // Giải phóng URL tạm thời

                    // Cleanup: Hủy các tài nguyên khi component unmount hoặc khi file thay đổi

                    video.src = ''; // Hủy video source để giải phóng bộ nhớ
                    reader.abort(); // Dừng việc đọc file
                    canvas.width = 0; // Giải phóng canvas
                    canvas.height = 0;
                };
            } else {
            }
        } else {
            toast.error(`Please choosen File `);
        }
    }, [file]);

    return (
        <div className={cx('wrap-backgroud')}>
            {/* Hiển thị tiến trình upload */}
            {isUploading && (
                <div className={cx('wrap-progress-upload', 'container mt-3')}>
                    <div className={cx('progress-container')}>
                        <div className={cx('progress-text')}>
                            <i className={cx('fas fa-cloud-upload-alt')}></i>
                            {uploadProgress}% uploaded...
                        </div>
                    </div>
                    <div className={cx('progress mt-2')}>
                        <div
                            className={cx('progress-bar')}
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <div className={cx('wrap')}>
                <div className={cx('panel-left')}>
                    <div className={cx('wrap-tieude', 'item-left')}>
                        <label>Tiêu đề</label>
                        <input
                            onChange={e => {
                                handleSetTitle(e.target.value);
                            }}
                            className={cx('inp-tieude')}
                        ></input>
                    </div>
                    <div className={cx('wrap-mota', 'item-left')}>
                        <label>Mô tả</label>
                        <textarea
                            onChange={e => {
                                handleSetDescription(e.target.value);
                            }}
                            className={cx('inp-mota')}
                        ></textarea>
                    </div>

                    <div className={cx('wrap-anhbia', 'item-left')}>
                        <label>Ảnh bìa</label>
                        {thumbnail ? (
                            <Image src={thumbnail} width={150} />
                        ) : (
                            <input type='file'></input>
                        )}
                    </div>

                    <div className={cx('wrap-btn-upload')}>
                        <Button
                            onClick={handleUpload}
                            primary
                            className={cx('btn-panel-left')}
                        >
                            Đăng
                        </Button>
                        <Button gray className={cx('btn-panel-left')}>
                            Hủy bỏ
                        </Button>
                    </div>
                </div>

                <div className={cx('panel-right')}>
                    <div
                        className={cx('wrap-video-preview')}
                        onClick={handleClickVideo}
                    >
                        <Video
                            className={cx('video-preview')}
                            ref={ref}
                            src={videoSrc}
                            controls={true}
                            poster={thumbnail}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadDetail;
