import React, { useEffect, useRef, useState, useContext } from 'react';
import Peer from 'peerjs';
import createSignalRConnection from '../../../Services/signalRService';
import * as signalR from '@microsoft/signalr';
import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';
import { MeetingContext } from '~/Context/MeetingContext';
const cx = classNames.bind(styles);

const VideoCall = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeers, setRemotePeers] = useState([]); // Danh sách người đã kết nối
    const [callParticipants, setCallParticipants] = useState([]); // Danh sách người trong cuộc gọi

    const [meetings, setMeetings] = useState([]); // Danh sách các cuộc họp
    const peerRef = useRef(null);
    const signalRRef = useRef(null);
    const localStreamRef = useRef(null);
    const videoRefs = useRef([]);
    const videoContainerRef = useRef(null); // useRef để quản lý container video
    //them vao
    const { nav } = useContext(MeetingContext);
    const [soLuongUser, setSoLuongUser] = useState(3);
    const [meetingId, setMeetingId] = useState(''); // ID cuộc họp
    const classes = cx({
        hainguoi: soLuongUser == 2,
        motnguoi: soLuongUser == 1,
        trenhainguoi: soLuongUser > 2
    });

    //kiểm tra băng thông
    const checkXirsysBandwidth = async () => {
        try {
            const response = await fetch('https://global.xirsys.net/stat', {
                method: 'GET',
                headers: {
                    Authorization:
                        'Basic ' +
                        btoa('Dungak47:b8163796-e0a5-11ef-9dd3-0242ac130002'),
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok)
                throw new Error(
                    '❌ Không thể lấy thông tin băng thông từ Xirsys'
                );

            const data = await response.json();
            console.log('✅ Dữ liệu băng thông Xirsys:', data);
            return data; // Trả về thông tin băng thông
        } catch (error) {
            console.error('⚠️ Lỗi khi kiểm tra băng thông:', error);
            return null; // Trả về null nếu thất bại
        }
    };

    //lấy danh sách iceserver từ api
    const getIceServersFromXirsys = async () => {
        try {
            const response = await fetch(
                'https://global.xirsys.net/_turn/MyFirstApp',
                {
                    method: 'PUT', // API yêu cầu phương thức PUT
                    headers: {
                        Authorization:
                            'Basic ' +
                            btoa(
                                'Dungak47:b8163796-e0a5-11ef-9dd3-0242ac130002'
                            ),
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok)
                throw new Error('❌ Lỗi khi lấy ICE servers từ Xirsys');

            const data = await response.json();
            console.log('✅ ICE Servers nhận từ Xirsys:', data.v.iceServers);
            checkXirsysBandwidth().then(data => {
                if (data) {
                    console.log(
                        `📊 Tổng băng thông đã sử dụng: ${data.v.bytesUsed} bytes`
                    );
                    console.log(
                        `📉 Băng thông còn lại: ${data.v.bytesRemaining} bytes`
                    );
                } else {
                    console.log('⚠️ Không thể lấy dữ liệu băng thông.');
                }
            });
            return data.v.iceServers; // Trả về danh sách ICE servers
        } catch (error) {
            console.error('⚠️ Không thể lấy ICE servers:', error);
            return []; // Trả về mảng rỗng nếu thất bại
        }
    };

    // Tạo cuộc họp mới
    const createMeeting = () => {
        if (meetingId.trim() === '') {
            console.warn('⚠️ Vui lòng nhập ID cuộc họp.');
            return;
        }

        signalRRef.current
            .invoke('CreateMeeting', meetingId)
            .then(() => console.log(`📅 Đã tạo cuộc họp ${meetingId}`))
            .catch(err => console.error('⚠️ Không thể tạo cuộc họp:', err));
    };

    // Tham gia cuộc họp với ID cụ thể
    const joinMeeting = () => {
        if (meetingId.trim() === '') {
            console.warn('⚠️ Vui lòng nhập ID cuộc họp.');
            return;
        }

        signalRRef.current
            .invoke('JoinMeeting', meetingId)
            .then(() => console.log(`✅ Đã tham gia cuộc họp ${meetingId}`))
            .catch(err =>
                console.error('⚠️ Không thể tham gia cuộc họp:', err)
            );
    };

    // Rời cuộc họp hiện tại (Sửa lỗi)
    const leaveMeeting = () => {
        if (meetingId.trim() === '') {
            console.warn('⚠️ Vui lòng nhập ID cuộc họp để rời.');
            return;
        }

        signalRRef.current
            .invoke('LeaveMeeting', meetingId)
            .then(() => {
                console.log(`🚪 Đã rời khỏi cuộc họp ${meetingId}`);

                // Ngắt kết nối PeerJS khi rời cuộc gọi
                if (peerRef.current) {
                    peerRef.current = null;
                }

                // Xóa video của người dùng
                removeVideo(peerId);

                // Cập nhật danh sách người gọi
                setCallParticipants(prev => prev.filter(pid => pid !== peerId));

                // Tắt mic & camera
                if (localStreamRef.current) {
                    localStreamRef.current
                        .getTracks()
                        .forEach(track => track.stop());
                    localStreamRef.current = null;
                }
            })
            .catch(err => console.error('⚠️ Không thể rời cuộc họp:', err));
    };

    // Gọi đến một Peer trong phòng họp
    const makeCall = (peer, targetPeerId) => {
        if (
            !peer ||
            !localStreamRef.current ||
            videoRefs.current.some(video => video.id === targetPeerId)
        )
            return;

        console.log(`📞 Gọi đến: ${targetPeerId}`);

        const call = peer.call(targetPeerId, localStreamRef.current);
        call.on('stream', remoteStream => {
            addVideo(targetPeerId, remoteStream);
        });
    };

    // Thêm video vào giao diện
    const addVideo = (peerId, stream, isLocal = false) => {
        if (videoRefs.current.some(video => video.id === peerId)) return;

        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.muted = isLocal;
        video.style.width = '200px';
        video.style.margin = '5px';
        video.id = peerId;

        if (videoContainerRef.current) {
            videoContainerRef.current.appendChild(video);
        }
        videoRefs.current.push(video);
    };
    // Xóa video khỏi giao diện khi rời cuộc họp
    const removeVideo = peerId => {
        const videoIndex = videoRefs.current.findIndex(
            video => video.id === peerId
        );

        if (videoIndex !== -1) {
            const video = videoRefs.current[videoIndex];

            video.pause();
            video.srcObject = null;
            video.remove();

            videoRefs.current.splice(videoIndex, 1);
        }
    };

    return (
        <div className={cx('container')}>
            <h2>Group Video Call</h2>
            <p>
                Your Peer ID: <strong>{peerId}</strong>
            </p>

            {/* Ô nhập ID để tạo/join cuộc họp */}
            <div>
                <input
                    type='text'
                    placeholder='Nhập ID cuộc họp'
                    value={meetingId}
                    onChange={e => setMeetingId(e.target.value)}
                />
                <button onClick={createMeeting}>Tạo cuộc họp</button>
                <button onClick={joinMeeting}>Tham gia cuộc họp</button>
                <button onClick={leaveMeeting}>Rời cuộc họp</button>
            </div>

            {/* Danh sách cuộc họp */}
            <div>
                <h3>Danh sách cuộc họp:</h3>
                <ul>
                    {meetings.map((meet, index) => (
                        <li key={index}>{meet}</li>
                    ))}
                </ul>
            </div>

            {/* Danh sách người đang trong cuộc họp */}
            <div>
                <h3>Thành viên trong cuộc họp:</h3>
                <ul>
                    {callParticipants.map((pid, index) => (
                        <li key={index}>{pid}</li>
                    ))}
                </ul>
            </div>

            <div className={cx('wrapper', { close: !nav.TabPanel })}>
                <div
                    id='videoContainer'
                    ref={videoContainerRef}
                    className={cx(
                        'listVideo',
                        { maxVideo: !nav.TabPanel },
                        { miniVideo: nav.TabPanel }
                    )}
                >
                    <iframe
                        className={cx('vuser', classes)}
                        width={'100%'}
                        height={'100%'}
                        src='https://www.youtube.com/embed/7FWQWaLsSuE?si=9BgV2f1jfy6j0MGS'
                        title='YouTube video player'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerpolicy='strict-origin-when-cross-origin'
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoCall;
