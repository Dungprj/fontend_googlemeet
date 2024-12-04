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
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const handleFileChange = e => {
        setFile(e.target.files[0]); // Lưu trữ file đã chọn
    };

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
                    setUploadProgress(progress); // Cập nhật tiến trình
                }
            };

            const response = await UploadApi(formData, config); // Gọi API upload
            console.log('Upload successful', response);

            // Xử lý kết quả sau khi upload thành công
            setIsUploading(false);
            setUploadProgress(100);
            alert('Video uploaded successfully!');
        } catch (err) {
            console.error('Error during upload:', err);
            toast.error('Upload failed. Please try again.');
            setIsUploading(false);
        }
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
            <div className={cx('wrap-background')}>
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
                            <Button primary>Select video</Button>
                        </div>
                    </div>
                </div>
            </div>

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
