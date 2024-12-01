import React, { useEffect } from 'react';

import config from '~/config';
// @function  UserContext
const UserContext = React.createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ email: '', auth: false });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
            setUser(user => ({
                email: email,
                token: token,
                auth: true
            }));
        }
    }, []);

    const loginContext = (email, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);

        setUser(user => ({
            email: email,
            token: token,
            auth: true
        }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');

        setUser(user => ({
            email: '',
            auth: false
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
