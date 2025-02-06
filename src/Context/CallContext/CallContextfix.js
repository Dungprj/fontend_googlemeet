import React, {
    createContext,
    useState,
    useRef,
    useEffect,
    useCallback
} from 'react';
import Peer from 'peerjs';
import createSignalRConnection from '~/Services/signalRService';
import classNames from 'classnames/bind';
import styles from '~/layouts/components/CallGroup/CallGroup.module.scss';
const cx = classNames.bind(styles);
const CallContext = createContext({});

function CallFixProvider({ children }) {
    const [peerId, setPeerId] = useState('');
    const [remotePeers, setRemotePeers] = useState([]); // Danh sách người đã kết nối
    const [callParticipants, setCallParticipants] = useState([]); // Danh sách người trong cuộc gọi
    const [meetingId, setMeetingId] = useState(''); // ID cuộc họp đang tham gia
    const [meetings, setMeetings] = useState([]); // Danh sách các cuộc họp
    const peerRef = useRef(null); //ok
    const signalRRef = useRef(null); //ok
    const localStreamRef = useRef(null); //ok
    const videoRefs = useRef([]); //ok
    const videoContainerRef = useRef(null); // useRef để quản lý container video ok
    const [soLuongUser, setSoLuongUser] = useState(5);
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

    useEffect(() => {
        let peer = null;

        //khởi tạo PeerJS và lấy connectionId từ SignalR

        const handleReceiveConnectionId = async connectionId => {
            console.log(
                `🔗 Nhận SignalR ID, sử dụng làm Peer ID: ${connectionId}`
            );
            setPeerId(connectionId);

            // Gọi API lấy danh sách ICE Servers từ Xirsys
            const iceServers = await getIceServersFromXirsys();

            // Cấu hình ICE Servers từ Xirsys
            const peerConfig = {
                config: {
                    iceServers: iceServers
                }
            };

            // Khởi tạo PeerJS với ICE Server
            peer = new Peer(connectionId, peerConfig);
            peerRef.current = peer;

            peer.on('open', async id => {
                console.log(`✅ PeerJS đã khởi tạo với ID: ${id}`);

                // Kiểm tra xem có sử dụng STUN/TURN không
                peer.on('iceStateChanged', state => {
                    console.log(`🔄 Trạng thái ICE: ${state}`);
                });

                peer.on('iceConnectionStateChange', () => {
                    console.log(
                        `📡 Kết nối ICE hiện tại: ${peer.iceConnectionState}`
                    );
                });

                peer.on('iceCandidate', event => {
                    if (event.candidate) {
                        console.log(
                            `🟢 ICE Candidate nhận được:`,
                            event.candidate
                        );
                    } else {
                        console.log('🚀 ICE Candidate đã hoàn tất.');
                    }
                });
            });

            peer.on('call', call => {
                call.answer(localStreamRef.current);
                call.on('stream', remoteStream => {
                    addVideo(call.peer, remoteStream);
                });
            });

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                localStreamRef.current = stream;
                addVideo('you', stream, true);
            } catch (error) {
                console.error('❌ Không thể truy cập camera/mic:', error);
            }
        };

        //cập nhật danh sách người dùng đã kết nối

        const handleUpdateUserList = userList => {
            console.log(
                '📌 Danh sách toàn bộ thành viên đã kết nối:',
                userList
            );
            setRemotePeers(userList);
        };
        //cập nhật danh sách cuộc họp

        const handleUpdateMeetingList = meetingList => {
            console.log('📅 Danh sách cuộc họp:', meetingList);
            setMeetings(meetingList);
        };

        //cập nhật danh sách người tham gia cuộc họp

        const handleUpdateMeetingParticipants = (meetingId, participants) => {
            console.log(
                `📞 Danh sách người trong cuộc họp ${meetingId}:`,
                participants
            );
            setCallParticipants(participants);

            // Khi danh sách cập nhật, gọi video đến tất cả thành viên mới
            participants.forEach(participant => {
                if (
                    participant !== peerId &&
                    !videoRefs.current.some(video => video.id === participant)
                ) {
                    makeCall(peerRef.current, participant);
                }
            });
        };

        signalRRef.current = createSignalRConnection(
            handleReceiveConnectionId,
            handleUpdateUserList,
            handleUpdateMeetingList,
            handleUpdateMeetingParticipants
        );

        return () => {
            if (signalRRef.current) signalRRef.current.stop();
        };
    }, []);

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
    // Hàm lấy stream video và audio từ user
    const getMediaStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            return stream; // Trả về stream nếu thành công
        } catch (error) {
            console.error('Không thể truy cập camera/mic:', error);
            return null; // Trả về null nếu gặp lỗi
        }
    };

    // Thêm video vào giao diện
    const addVideo = (peerId, stream, isLocal = false) => {
        if (videoRefs.current.some(video => video.id === peerId)) return;

        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.muted = isLocal;
        video.style.objectFit = 'cover';
        video.style.width = '100%';
        video.style.height = '100%';
        video.playsInline = true; // Quan trọng cho iOS
        video.style.transform = 'scaleX(-1)';
        video.id = peerId;
        video.className = cx('vuser', {
            hainguoi: soLuongUser === 2,
            motnguoi: soLuongUser === 1,
            trenhainguoi: soLuongUser > 2
        });

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
        <CallContext.Provider
            value={{
                peerId,
                remotePeers,
                callParticipants,
                meetings,
                meetingId,
                setMeetingId,
                createMeeting,
                joinMeeting,
                leaveMeeting,
                localStreamRef,
                videoContainerRef,
                getMediaStream,
                addVideo
            }}
        >
            {children}
        </CallContext.Provider>
    );
}

export { CallContext, CallFixProvider };
