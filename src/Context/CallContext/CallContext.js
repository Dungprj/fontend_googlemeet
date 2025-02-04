import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'peerjs';
import createSignalRConnection from '~/Services/signalRService';

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

    useEffect(() => {
        const handleReceiveConnectionId = async connectionId => {
            setPeerId(connectionId);
            const peer = new Peer(connectionId);
            peerRef.current = peer;

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                localStreamRef.current = stream;
            } catch (error) {
                console.error('Không thể truy cập camera/mic:', error);
            }
        };

        const handleUpdateUserList = userList => setRemotePeers(userList);
        const handleUpdateMeetingList = meetingList => setMeetings(meetingList);
        const handleUpdateMeetingParticipants = (meetingId, participants) => {
            setCallParticipants(participants);
        };

        signalRRef.current = createSignalRConnection(
            handleReceiveConnectionId,
            handleUpdateUserList,
            handleUpdateMeetingList,
            handleUpdateMeetingParticipants
        );

        return () => {
            if (peerRef.current) peerRef.current.destroy();
            if (signalRRef.current) signalRRef.current.stop();
        };
    }, []);

    const createMeeting = () => {
        if (!meetingId.trim()) return;
        signalRRef.current
            .invoke('CreateMeeting', meetingId)
            .catch(err => console.error('Không thể tạo cuộc họp:', err));
    };

    const joinMeeting = () => {
        if (!meetingId.trim()) return;
        signalRRef.current
            .invoke('JoinMeeting', meetingId)
            .catch(err => console.error('Không thể tham gia cuộc họp:', err));
    };

    const leaveMeeting = () => {
        if (!meetingId.trim()) return;
        signalRRef.current
            .invoke('LeaveMeeting', meetingId)
            .then(() => {
                setCallParticipants(prev => prev.filter(pid => pid !== peerId));
                if (localStreamRef.current) {
                    localStreamRef.current
                        .getTracks()
                        .forEach(track => track.stop());
                    localStreamRef.current = null;
                }
            })
            .catch(err => console.error('Không thể rời cuộc họp:', err));
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
                videoContainerRef
            }}
        >
            {children}
        </CallContext.Provider>
    );
};

export { CallContext, CallProvider };
