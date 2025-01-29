import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import classNames from 'classnames/bind';
import styles from './VideoCall.module.scss';

const cx = classNames.bind(styles);

const VideoCall = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeerId, setRemotePeerId] = useState('');
    const [peers, setPeers] = useState({});
    const [remoteVideos, setRemoteVideos] = useState({});
    const localVideoRef = useRef(null);
    const peerRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        const peer = new Peer();
        peerRef.current = peer;

        // Khi PeerJS sẵn sàng
        peer.on('open', async id => {
            console.log('My Peer ID:', id);
            setPeerId(id);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                localStreamRef.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Không thể truy cập camera/micro:', error);
            }
        });

        // Khi nhận cuộc gọi
        peer.on('call', async call => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                localStreamRef.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                call.answer(stream);

                call.on('stream', remoteStream => {
                    addRemoteVideo(call.peer, remoteStream);
                });

                call.on('close', () => {
                    removeRemoteVideo(call.peer);
                });
            } catch (error) {
                console.error('Lỗi khi nhận cuộc gọi:', error);
            }
        });

        // Cleanup khi component unmount
        return () => {
            if (peerRef.current) {
                peerRef.current.destroy();
            }
            if (localStreamRef.current) {
                localStreamRef.current
                    .getTracks()
                    .forEach(track => track.stop());
            }
        };
    }, []);

    const makeCall = async () => {
        if (!remotePeerId.trim()) {
            alert('Nhập Peer ID để gọi');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localStreamRef.current = stream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            const call = peerRef.current.call(remotePeerId, stream);
            call.on('stream', remoteStream => {
                addRemoteVideo(call.peer, remoteStream);
            });

            call.on('close', () => {
                removeRemoteVideo(call.peer);
            });

            setPeers(prev => ({ ...prev, [call.peer]: call }));
        } catch (error) {
            console.error('Không thể thực hiện cuộc gọi:', error);
        }
    };

    const addRemoteVideo = (peerId, stream) => {
        setRemoteVideos(prev => {
            if (prev[peerId]) return prev; // Nếu video đã tồn tại, không thêm nữa

            const newVideos = { ...prev, [peerId]: stream };
            return newVideos;
        });
    };

    const removeRemoteVideo = peerId => {
        setRemoteVideos(prev => {
            const newVideos = { ...prev };
            delete newVideos[peerId];
            return newVideos;
        });
    };

    return (
        <div className={cx('container')}>
            <h2>Group Video Call</h2>
            <p>
                Your Peer ID: <strong>{peerId || 'Loading...'}</strong>
            </p>

            <div className={cx('videoContainer')}>
                <h3>Your Video</h3>
                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className={cx('video')}
                    style={{
                        width: '300px',
                        border: '2px solid black',
                        borderRadius: '8px'
                    }}
                ></video>
            </div>
            <h3>Remote Videos</h3>
            <div className={cx('videoContainer')} id='videoContainer'>
                {Object.entries(remoteVideos).map(([peerId, stream]) => (
                    <video
                        key={peerId}
                        autoPlay
                        className={cx('video')}
                        style={{
                            width: '300px',
                            border: '2px solid black',
                            borderRadius: '8px',
                            marginTop: '10px'
                        }}
                        ref={video => {
                            if (video) video.srcObject = stream;
                        }}
                    />
                ))}
            </div>

            <div className={cx('controls')}>
                <input
                    className={cx('peerIdInput')}
                    type='text'
                    placeholder='Nhập Peer ID cần gọi'
                    value={remotePeerId}
                    onChange={e => setRemotePeerId(e.target.value)}
                />
                <button className={cx('btnCall')} onClick={makeCall}>
                    Call
                </button>
            </div>
        </div>
    );
};

export default VideoCall;
