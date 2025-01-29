import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID =
    '95019652138-lnq0e1ehh3db53dvbh840klbhdcqdtlg.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA52TezcqWVSxZUTAFLZHfN2iZhZHX2e30';
const SCOPES = 'https://www.googleapis.com/auth/documents.readonly';
const DOCUMENT_ID = '1YQtBEaI5WOg1KzTPGjDLgELdWRx5E2l3ZKBwyyMvPFk';

const App = () => {
    const [content, setContent] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        async function start() {
            try {
                // Tải file token từ public folder
                const response = await fetch('/google_token.json');
                if (!response.ok) {
                    console.error('Không tìm thấy file google_token.json');
                    return;
                }

                const tokenData = await response.json();

                gapi.client
                    .init({
                        apiKey: API_KEY,
                        clientId: CLIENT_ID,
                        scope: SCOPES,
                        discoveryDocs: [
                            'https://docs.googleapis.com/$discovery/rest?version=v1'
                        ]
                    })
                    .then(() => {
                        // Thiết lập token
                        if (tokenData.accessToken) {
                            gapi.client.setToken({
                                access_token: tokenData.accessToken
                            });
                            setIsSignedIn(true);
                            console.log(
                                'Đã đăng nhập bằng token từ file google_token.json'
                            );
                        } else {
                            console.error(
                                'File google_token.json không chứa accessToken'
                            );
                        }
                    })
                    .catch(error => {
                        console.error(
                            'Error initializing Google API client:',
                            error
                        );
                    });
            } catch (error) {
                console.error('Error loading token file:', error);
            }
        }

        gapi.load('client:auth2', start);
    }, []);

    const handleLogin = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.signIn().then(() => {
            const user = authInstance.currentUser.get();
            const accessToken = user.getAuthResponse().access_token;

            console.log('Access Token:', accessToken);
            setIsSignedIn(true);
        });
    };

    const handleLogout = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.signOut();
        setContent('');
        setIsSignedIn(false);
    };

    const fetchGoogleDocContent = async () => {
        try {
            if (!gapi.client.docs) {
                console.error('Google Docs API client chưa được khởi tạo.');
                return;
            }

            const response = await gapi.client.docs.documents.get({
                documentId: DOCUMENT_ID
            });
            const contentArray = response.result.body.content;
            let text = '';

            contentArray.forEach(element => {
                if (element.paragraph) {
                    element.paragraph.elements.forEach(el => {
                        if (el.textRun) {
                            text += el.textRun.content;
                        }
                    });
                }
            });

            setContent(text);
        } catch (error) {
            console.error('Error fetching Google Doc content:', error);
        }
    };

    return (
        <div>
            <h1>Google Docs API Reader</h1>
            {!isSignedIn ? (
                <button onClick={handleLogin}>Đăng nhập</button>
            ) : (
                <div>
                    <button onClick={handleLogout}>Đăng xuất</button>
                    <button onClick={fetchGoogleDocContent}>
                        Đọc nội dung Google Docs
                    </button>
                </div>
            )}
            <pre>{content}</pre>
        </div>
    );
};

export default App;
