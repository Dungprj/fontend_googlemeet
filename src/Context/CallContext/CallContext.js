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

const CallProvider = ({ children }) => {
    const [peerId, setPeerId] = useState('');
    const [remotePeers, setRemotePeers] = useState([]);
    const [callParticipants, setCallParticipants] = useState([]);
    const [meetingId, setMeetingId] = useState('');
    const [meetings, setMeetings] = useState([]);

    const peerRef = useRef(null);
    const signalRRef = useRef(null);
    const localStreamRef = useRef(null);
    const videoRefs = useRef([]);
    const videoContainerRef = useRef(null);
    const [soLuongUser] = useState(5); // Sửa: Thêm state hoặc logic cập nhật

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

    // Hàm thêm video với cleanup
    const addVideo = useCallback(
        (peerId, stream, isLocal = false) => {
            if (!videoContainerRef.current || document.getElementById(peerId))
                return;

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
            videoRefs.current[peerId] = video;
            videoContainerRef.current.appendChild(video);

            // Trả về hàm dọn dẹp
            return () => {
                if (video.parentNode) {
                    video.parentNode.removeChild(video);
                }
                delete videoRefs.current[peerId];
                stream.getTracks().forEach(track => track.stop());
            };
        },
        [videoContainerRef]
    );

    useEffect(() => {
        // Hàm xử lý bất đồng bộ để khởi tạo Peer
        const initializePeer = async connectionId => {
            setPeerId(connectionId);

            // Gọi API lấy danh sách ICE Servers từ Xirsys
            const iceServers = await getIceServersFromXirsys();
            // Cấu hình ICE Servers từ Xirsys
            const peerConfig = {
                config: {
                    iceServers: iceServers
                }
            };
            // Kiểm tra nếu peerRef.current chưa được khởi tạo
            if (!peerRef.current) {
                const peer = new Peer(connectionId, peerConfig); // Khởi tạo Peer instance
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

                    peer.on('call', call => {
                        // Đảm bảo có Local Stream trước khi answer
                        if (localStreamRef.current) {
                            call.answer(localStreamRef.current);
                        } else {
                            // Nếu chưa có stream, thử lấy lại
                            getMediaStream().then(stream => {
                                if (stream) {
                                    localStreamRef.current = stream;
                                    call.answer(stream);
                                    addVideo(peerId, stream, true); // Hiển thị local video
                                } else {
                                    call.close(); // Đóng cuộc gọi nếu không có stream
                                }
                            });
                        }

                        // Xử lý khi nhận được remote stream
                        call.on('stream', remoteStream => {
                            if (!remoteStream) {
                                console.error(
                                    '❌ Remote stream không tồn tại!'
                                );
                                return;
                            }
                            addVideo(call.peer, remoteStream); // Thêm video của đối phương
                        });

                        // Xử lý lỗi
                        call.on('error', err =>
                            console.error('Lỗi cuộc gọi:', err)
                        );
                    });
                });
            }
        };

        const handleUpdateUserList = userList => setRemotePeers(userList);
        const handleUpdateMeetingList = meetingList => setMeetings(meetingList);
        const handleUpdateMeetingParticipants = (meetingId, participants) => {
            setCallParticipants(participants);
            participants.forEach(participantId => {
                if (
                    participantId !== peerId &&
                    !videoRefs.current[participantId] && // Chưa có video
                    peerRef.current &&
                    localStreamRef.current
                ) {
                    makeCall(peerRef.current, participantId);
                }
            });
        };

        signalRRef.current = createSignalRConnection(
            initializePeer,
            handleUpdateUserList,
            handleUpdateMeetingList,
            handleUpdateMeetingParticipants
        );

        // Cleanup function khi component unmount
        return () => {
            // Chỉ gọi destroy nếu peerRef.current là instance hợp lệ của Peer
            if (
                peerRef.current &&
                typeof peerRef.current.destroy === 'function'
            ) {
                peerRef.current.destroy(); // Gọi destroy đúng cách
                peerRef.current = null; // Reset peerRef
            }
            if (signalRRef.current) {
                signalRRef.current.stop(); // Dừng SignalR khi unmount
                signalRRef.current = null; // Reset signalRRef
            }
            // Dừng tất cả các tracks trong local stream
            if (localStreamRef.current) {
                localStreamRef.current
                    .getTracks()
                    .forEach(track => track.stop());
                localStreamRef.current = null; // Reset stream
            }
        };
    }, []); // Sử dụng mảng rỗng để chỉ chạy khi component mount/unmount

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

    const createMeeting = () => {
        if (!meetingId.trim()) return;
        signalRRef.current
            .invoke('CreateMeeting', meetingId)
            .then(res => {
                alert('Tạo cuộc họp thành công', res.message);
            })
            .catch(err => console.error('Không thể tạo cuộc họp:', err));
    };

    const joinMeeting = async () => {
        if (!meetingId.trim()) return;
        try {
            // Lấy Local Stream và gán vào ref
            const stream = await getMediaStream();
            if (!stream) {
                alert('Không thể truy cập camera/micro!');
                return;
            }
            localStreamRef.current = stream;
            // Hiển thị video của bản thân
            addVideo(peerId, stream, true);
            // Tham gia phòng họp
            await signalRRef.current.invoke('JoinMeeting', meetingId);
        } catch (err) {
            console.error('Không thể tham gia cuộc họp:', err);
        }
    };

    const leaveMeeting = () => {
        if (!meetingId.trim()) return;
        signalRRef.current.invoke('LeaveMeeting', meetingId).then(() => {
            // Dừng tất cả stream
            if (localStreamRef.current) {
                localStreamRef.current
                    .getTracks()
                    .forEach(track => track.stop());
                localStreamRef.current = null;
            }
            // Đóng tất cả kết nối Peer
            Object.values(peerRef.current.connections).forEach(connections => {
                connections.forEach(connection => connection.close());
            });
            // Xóa tất cả video element
            videoContainerRef.current.innerHTML = '';
            videoRefs.current = {};
        });
    };

    // Gọi đến một Peer trong phòng họp
    const makeCall = (peer, targetPeerId) => {
        if (
            !peer ||
            !localStreamRef.current ||
            videoRefs.current[targetPeerId] // Đã tồn tại kết nối
        ) {
            return;
        }

        console.log(`📞 Đang gọi đến: ${targetPeerId}`);
        const call = peer.call(targetPeerId, localStreamRef.current);

        // Xử lý khi nhận được remote stream
        call.on('stream', remoteStream => {
            if (!remoteStream) {
                console.error(`❌ Không nhận stream từ ${targetPeerId}`);
                return;
            }
            addVideo(targetPeerId, remoteStream);
        });

        // Xử lý khi cuộc gọi bị đóng
        call.on('close', () => {
            console.log(`🔴 Cuộc gọi với ${targetPeerId} đã đóng`);
            if (videoRefs.current[targetPeerId]) {
                videoRefs.current[targetPeerId].remove(); // Xóa video element
                delete videoRefs.current[targetPeerId];
            }
        });

        // Xử lý lỗi
        call.on('error', err => console.error('Lỗi cuộc gọi:', err));
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
};

export { CallContext, CallProvider };
