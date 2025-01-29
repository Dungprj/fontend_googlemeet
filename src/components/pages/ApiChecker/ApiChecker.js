import React, { useState } from 'react';
import axios from 'axios';

const ApiChecker = () => {
    const [apiInfo, setApiInfo] = useState({
        apiPath: '',
        ident: '',
        secret: '',
        channel: ''
    });
    const [response, setResponse] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setApiInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const checkApi = async () => {
        const { apiPath, ident, secret, channel } = apiInfo;
        const url = `${apiPath}/_turn/${channel}`;
        const headers = {
            Authorization: `Basic ${btoa(`${ident}:${secret}`)}`
        };

        console.log('Requesting:', url);
        console.log('Headers:', headers);

        try {
            const res = await axios.get(url, { headers });
            console.log('Response:', res.data);
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching API:', error);
            setResponse({
                error: 'Failed to fetch API data',
                details: error.message
            });
        }
    };

    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold mb-4'>Simple API Checker</h1>
            <div className='mb-4'>
                <label className='block mb-2'>API Path:</label>
                <input
                    type='text'
                    name='apiPath'
                    value={apiInfo.apiPath}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-2'>Ident:</label>
                <input
                    type='text'
                    name='ident'
                    value={apiInfo.ident}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-2'>Secret:</label>
                <input
                    type='text'
                    name='secret'
                    value={apiInfo.secret}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-2'>Channel:</label>
                <input
                    type='text'
                    name='channel'
                    value={apiInfo.channel}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </div>
            <button
                onClick={checkApi}
                className='bg-blue-500 text-white py-2 px-4 rounded'
            >
                Check API
            </button>
            {response && (
                <div className='mt-4 p-4 border bg-gray-100'>
                    <h2 className='font-bold'>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiChecker;
