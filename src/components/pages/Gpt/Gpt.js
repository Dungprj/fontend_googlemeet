import React, { useEffect, useState } from 'react';
import { getDataFile } from '~/Services/UserService'; // API trả về text từ file Word

function GPT() {
    const [textContent, setTextContent] = useState(''); // Nội dung text từ API
    const [error, setError] = useState(null); // Trạng thái lỗi (nếu có)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataFile(); // Gọi API để lấy nội dung text

                // Kiểm tra dữ liệu trả về
                if (!res || !res.data) {
                    throw new Error('API không trả về nội dung.');
                }

                setTextContent(res.data); // Cập nhật nội dung text vào state
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message); // Lưu lỗi vào state
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Danh sách tài khoản GPT</h1>
            {/* Hiển thị lỗi nếu có */}
            {error ? (
                <div style={{ color: 'red' }}>
                    <strong>Lỗi:</strong> {error}
                </div>
            ) : (
                <div
                    style={{
                        whiteSpace: 'pre-wrap', // Giữ khoảng trắng và xuống dòng
                        wordWrap: 'break-word', // Tự động ngắt dòng nếu văn bản quá dài
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginTop: '20px'
                    }}
                >
                    {textContent || 'Đang tải nội dung...'}
                </div>
            )}
        </div>
    );
}

export default GPT;
