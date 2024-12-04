import classNames from 'classnames/bind';
import styles from './Upload.module.scss';

import Button from '~/components/Button';
import { UploadIcon } from '~/components/Icons';

import { Upload as UploadApi } from '~/Services/UserService';

import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);
function Upload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const handleFileChange = e => {
        setFile(e.target.files[0]); // Lưu trữ file đã chọn
    };

    // Hàm xử lý khi người dùng kéo và thả file vào div
    const handleDrop = e => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt
        const droppedFile = e.dataTransfer.files[0]; // Lấy file đầu tiên từ đối tượng dataTransfer
        if (droppedFile) {
            setFile(droppedFile); // Lưu trữ file đã kéo thả
        }
    };

    // Hàm xử lý khi kéo file vào vùng drop
    const handleDragOver = e => {
        console.log('vao day');
        e.preventDefault(); // Ngăn chặn hành động mặc định (để cho phép thả file)
    };

    useEffect(() => {
        console.log(file);
        if (file) {
            console.log('dang dieu huong den ', config.routes.uploaddetail);
            navigate(config.routes.uploaddetail, {
                state: {
                    file: file
                }
            });
        }
    }, [file]);

    return (
        <div className={cx('wrap-container')}>
            <label
                className={cx('wrap-background')}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                htmlFor='import-file-btn'
            >
                <div className={cx('wrap')}>
                    <input
                        className={cx('inp-file')}
                        id='import-file-btn'
                        type='file'
                        hidden
                        onChange={handleFileChange}
                    />

                    <div>
                        <div className={cx('wrap-upload')}>
                            <div className={cx('wrap-label')}>
                                <label htmlFor='import-file-btn'>
                                    <i
                                        className={cx(
                                            'ico-upload',
                                            'fa-solid fa-cloud-arrow-up'
                                        )}
                                    ></i>
                                </label>
                                <div>Select video to upload</div>
                                <p>Or drag and drop it here</p>
                            </div>
                        </div>

                        <div className={cx('wrap-btn-select-video')}>
                            <Button primary>
                                <label htmlFor='import-file-btn'>
                                    Select video
                                </label>
                            </Button>
                        </div>
                    </div>
                </div>
            </label>

            <div className={cx('wrap-required-upload')}>
                <div className={cx('item-required-upload')}>
                    <i
                        className={cx(
                            'icon-required-upload',
                            'fa-solid fa-video'
                        )}
                    ></i>
                    <div>
                        <h3>Size and length</h3>
                        <p>Maximum size: 10 GB, video length: 60 minutes</p>
                    </div>
                </div>

                <div className={cx('item-required-upload')}>
                    <i
                        className={cx(
                            'icon-required-upload',
                            'fa-regular fa-file'
                        )}
                    ></i>

                    <div>
                        <h3>File formats</h3>
                        <p>
                            Recommended format: ".mp4". We also support other
                            major formats such as ".mov", ".mkv", and ".avi".
                        </p>
                    </div>
                </div>

                <div className={cx('item-required-upload')}>
                    <i
                        className={cx(
                            'icon-required-upload',
                            'fa-solid fa-image'
                        )}
                    ></i>

                    <div>
                        <h3>Video resolutions</h3>
                        <p>
                            Minimum resolution: 720p. We also support 2K and 4K.
                        </p>
                    </div>
                </div>

                <div className={cx('item-required-upload')}>
                    <i
                        className={cx(
                            'icon-required-upload',
                            'fa-solid fa-crop-simple'
                        )}
                    ></i>

                    <div>
                        <h3>Aspect ratios</h3>
                        <p>
                            Recommended ratios: 16:9 for landscape, 9:16 for
                            vertical.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
